package com.perfectrum.backend.service.impl;

import com.perfectrum.backend.domain.entity.AccordClassEntity;
import com.perfectrum.backend.domain.entity.PerfumeEntity;
import com.perfectrum.backend.domain.entity.UserEntity;
import com.perfectrum.backend.domain.repository.*;
import com.perfectrum.backend.dto.Search.PerfumeSearchDto;
import com.perfectrum.backend.dto.perfume.PerfumeViewDto;
import com.perfectrum.backend.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class PerfumeSearchServiceImpl implements SearchService {

    private PerfumeRepository perfumeRepository;
    private UserRepository userRepository;
    private AccordClassRepository accordClassRepository;

    private HaveListRepository haveListRepository;
    private WishListRepository wishListRepository;

    @Autowired
    PerfumeSearchServiceImpl(PerfumeRepository perfumeRepository,UserRepository userRepository,AccordClassRepository accordClassRepository,
                             HaveListRepository haveListRepository,WishListRepository wishListRepository){
        this.perfumeRepository = perfumeRepository;
        this.userRepository = userRepository;
        this.accordClassRepository = accordClassRepository;
        this.haveListRepository = haveListRepository;
        this.wishListRepository = wishListRepository;
    }


    @Override
    public Map<String, Object> searchPerfume(String decodeId, PerfumeSearchDto perfumeSearchDto) {
        Optional<UserEntity> user = userRepository.findByUserId(decodeId);
        Map<String,Object> data = new HashMap<>();

        String gender = perfumeSearchDto.getGender();
        String durationList = perfumeSearchDto.getDuration();
        String accordClassList = perfumeSearchDto.getAccordClass();

        Integer lastIdx = perfumeSearchDto.getLastIdx();
        Integer pageSize = perfumeSearchDto.getPageSize();
        Pageable pageable = Pageable.ofSize(pageSize);

        List<Integer> longevity = new ArrayList<>();
        if(durationList != null){
            String str = perfumeSearchDto.getDuration().replaceAll("[^0-9]", "");
            char[] ch = str.toCharArray();
            for(int i=0;i<ch.length;i++){
                longevity.add(ch[i]-'0');
            }
        }

        List<AccordClassEntity> accordClass = new ArrayList<>();
        if(accordClassList != null){
            String str = perfumeSearchDto.getAccordClass().replaceAll("[^0-9]", "");
            char[] ch = str.toCharArray();
            for(int i=0;i<ch.length;i++){
                accordClass.add(accordClassRepository.findByIdx(ch[i]-'0'));
            }
        }

        if(lastIdx == null){
            lastIdx = perfumeRepository.findTop1ByOrderByIdxDesc().getIdx() + 1;
        }

        Slice<PerfumeEntity> searchList = perfumeRepository.findAllByGenderAndLongevityAndAccordClass(gender, longevity, accordClass, lastIdx, pageable);
        List<PerfumeViewDto> resultList = new ArrayList<>();
        if(!searchList.isEmpty()){
            boolean hasNext = searchList.hasNext();
            data.put("hasNext",hasNext);
            for(PerfumeEntity pe : searchList){
                PerfumeViewDto perfumeViewDto = PerfumeViewDto.builder()
                        .idx(pe.getIdx())
                        .brandName(pe.getBrandName())
                        .perfumeName(pe.getPerfumeName())
                        .concentration(pe.getConcentration())
                        .gender(pe.getGender())
                        .scent(pe.getScent())
                        .topNotes(pe.getTopNotes())
                        .middleNotes(pe.getMiddleNotes())
                        .baseNotes(pe.getBaseNotes())
                        .itemRating(pe.getItemRating())
                        .perfumeImg(pe.getPerfumeImg())
                        .description(pe.getDescription())
                        .seasons(pe.getSeasons())
                        .timezone(pe.getTimezone())
                        .longevity(pe.getLongevity())
                        .sillage(pe.getSillage())
                        .wishCount(Long.valueOf(Optional.ofNullable(haveListRepository.countByPerfumeIdx(pe.getIdx())).orElse(0L)).intValue())
                        .haveCount(Long.valueOf(Optional.ofNullable(wishListRepository.countByPerfumeIdx(pe.getIdx())).orElse(0L)).intValue())
                        .build();

                resultList.add(perfumeViewDto);
            }
            data.put("perfumeList",resultList);
        }
        return data;
    }
}