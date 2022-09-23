package com.perfectrum.backend.controller;


import com.perfectrum.backend.domain.entity.PerfumeEntity;
import com.perfectrum.backend.dto.review.ReviewViewDto;
import com.perfectrum.backend.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@RestController
public class PerfumeDetailController {

    private static final String success = "SUCCESS";
    private static final String fail = "FAIL";
    private static final String timeOut = "access-token timeout";
    private static HttpStatus status = HttpStatus.NOT_FOUND;

    private JwtService jwtService;
    private WishListService wishListService;
    private HaveListService haveListService;

    private PerfumeDetailService perfumeDetailService;

    @Autowired
    PerfumeDetailController(JwtService jwtService, WishListService wishListService,
                            HaveListService haveListService,PerfumeDetailService perfumeDetailService){
        this.jwtService = jwtService;
        this.wishListService = wishListService;
        this.haveListService = haveListService;
        this.perfumeDetailService = perfumeDetailService;
    }

    @GetMapping("/detail/{idx}")
    public ResponseEntity<?> getPerfumeDetail(HttpServletRequest request, @PathVariable("idx") Integer perfumeIdx){
        Map<String,Object> resultMap = new HashMap<>();
        String decodeId = checkToken(request, resultMap);
        if(decodeId != null){
            try{
                resultMap = perfumeDetailService.getPerfumeDetail(decodeId,perfumeIdx);
                resultMap.put("message",success);
            }catch(Exception e){
                resultMap.put("message",fail);
                status = HttpStatus.INTERNAL_SERVER_ERROR;
            }
        }

        return new ResponseEntity<>(resultMap,status);
    }

    @PostMapping("detail/{idx}/wish")
    public ResponseEntity<?> addWishList(HttpServletRequest request, @PathVariable("idx") Integer perfumeIdx){
        Map<String,Object> resultMap = new HashMap<>();
        String decodeId = checkToken(request, resultMap);
        Map<String,Object> data = new HashMap<>();
        if(decodeId != null){
            try{
                perfumeDetailService.addWishList(decodeId,perfumeIdx);
                data.put("message",success);
            }catch(Exception e){
                resultMap.put("message",fail);
                status = HttpStatus.INTERNAL_SERVER_ERROR;
            }
        }

        return new ResponseEntity<>(data,status);
    }


    @PostMapping("detail/{idx}/have")
    public ResponseEntity<?> addHaveList(HttpServletRequest request,@PathVariable Integer perfumeIdx){
        Map<String,Object> resultMap = new HashMap<>();
        String decodeId = checkToken(request, resultMap);
        if(decodeId != null){
            try{
                perfumeDetailService.addHaveList(decodeId,perfumeIdx);
                resultMap.put("message",success);
            }catch(Exception e){
                resultMap.put("message",fail);
                status = HttpStatus.INTERNAL_SERVER_ERROR;
            }
        }

        return new ResponseEntity<>(resultMap,status);
    }

    @PostMapping("detail/{idx}/review")
    public ResponseEntity<?> writeReview(HttpServletRequest request, @PathVariable("idx") Integer perfumeIdx, @RequestBody ReviewViewDto reviewViewDto){
        Map<String,Object> resultMap = new HashMap<>();
        String decodeId = checkToken(request,resultMap);
        if(decodeId != null){
            try{
                perfumeDetailService.registReview(decodeId,perfumeIdx,reviewViewDto);
            }catch(Exception e){
                resultMap.put("message", fail);
                status = HttpStatus.INTERNAL_SERVER_ERROR;
            }
        }

        return new ResponseEntity<>(resultMap,status);
    }

    @PostMapping("detail/{idx}/review/{review_idx}")
    public ResponseEntity<?> updateReview(HttpServletRequest request, @PathVariable("idx") Integer perfumeIdx,@PathVariable("review_idx") Integer reviewIdx, @RequestBody ReviewViewDto reviewViewDto){
        Map<String,Object> resultMap = new HashMap<>();
        String decodeId = checkToken(request,resultMap);
        if(decodeId != null){
            try{
                perfumeDetailService.updateReview(decodeId,perfumeIdx,reviewIdx,reviewViewDto);
            }catch(Exception e){
                resultMap.put("message", fail);
                status = HttpStatus.INTERNAL_SERVER_ERROR;
            }
        }

        return new ResponseEntity<>(resultMap,status);
    }
    public String checkToken(HttpServletRequest request, Map<String, Object> resultMap){
        String accessToken = request.getHeader("Authorization");
        String decodeId = jwtService.decodeToken(accessToken);
        if(!decodeId.equals("timeout")){
            return decodeId;
        }else{
            resultMap.put("message", timeOut);
            status = HttpStatus.UNAUTHORIZED;
            return null;
        }
    }
}
