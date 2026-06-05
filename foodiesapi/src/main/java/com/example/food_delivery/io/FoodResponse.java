package com.example.food_delivery.io;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FoodResponse {
    private String id;
    private String name;
    private String imageUrl;
    private String description;
    private double price;
    private String category;
}
