package com.perfectrum.backend.domain.repository;

import com.perfectrum.backend.domain.entity.WishListEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WishListRepository extends JpaRepository<WishListEntity,Integer> {
}