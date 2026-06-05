package com.example.food_delivery.repository;

import com.example.food_delivery.entity.CartEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CartRepository extends MongoRepository<CartEntity, String> {

    Optional<CartEntity> findByUserId(String userId);

    void deleteByUserId(String userId);

}
