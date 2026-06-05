package com.example.food_delivery.repository;

import com.example.food_delivery.entity.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface UserRepository extends MongoRepository<UserEntity,String > {

    Optional<UserEntity> findByEmail(String email);

}
