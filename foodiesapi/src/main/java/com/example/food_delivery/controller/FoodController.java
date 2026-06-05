package com.example.food_delivery.controller;

import com.example.food_delivery.io.FoodRequest;
import com.example.food_delivery.io.FoodResponse;
import com.example.food_delivery.service.FoodService; // ✅ FIXED
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tools.jackson.databind.ObjectMapper;

import java.util.List;

@RestController
@RequestMapping("/api/foods")
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class FoodController {

    private final FoodService foodService;

//    // ✅ Upload only image
//    @PostMapping("/upload")
//    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
//
//        if (file.isEmpty()) {
//            return ResponseEntity.badRequest().body("File is empty");
//        }
//
//        String url = foodService.uploadFile(file);
//        return ResponseEntity.ok(url);
//    }

    // ✅ Add food with image + JSON
    @PostMapping
    public ResponseEntity<FoodResponse> addFood(
            @RequestPart("food") String foodString,
            @RequestPart("file") MultipartFile file) {

        try {
            ObjectMapper mapper = new ObjectMapper();

            FoodRequest request = mapper.readValue(foodString, FoodRequest.class);

            FoodResponse response = foodService.addFood(request, file);

            return new ResponseEntity<>(response, HttpStatus.CREATED);

        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    @GetMapping
    public List<FoodResponse> readFoods(){
        return foodService.readFoods();
    }

    @GetMapping("/{id}")
    public FoodResponse readFood(@PathVariable String id){
        return foodService.readFood(id);
    }


    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteFood(@PathVariable String id){
        foodService.deleteFood(id);

    }
}