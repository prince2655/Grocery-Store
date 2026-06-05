package com.example.food_delivery.service;

import com.example.food_delivery.io.FoodRequest;
import com.example.food_delivery.io.FoodResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface FoodService {

    String uploadFile(MultipartFile file);

    FoodResponse addFood(FoodRequest request, MultipartFile file);

    List<FoodResponse>readFoods();

    FoodResponse readFood(String id);

    String extractPublicId(String publicId);

    void deleteFood(String id);
}
