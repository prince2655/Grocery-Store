package com.example.food_delivery.repository;

import com.example.food_delivery.entity.FoodEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface FoodRepository extends MongoRepository<FoodEntity, String> {

}
