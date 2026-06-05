package com.example.food_delivery.service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.example.food_delivery.entity.FoodEntity;
import com.example.food_delivery.repository.FoodRepository;
import com.example.food_delivery.io.FoodRequest;
import com.example.food_delivery.io.FoodResponse;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public  class FoodServiceImpl implements FoodService {

    private final Cloudinary cloudinary;
    private final FoodRepository foodRepository;

    @Override
    public String uploadFile(MultipartFile file) {

        try {
            // ✅ Get file extension
            String originalName = file.getOriginalFilename();
            String extension = originalName.substring(originalName.lastIndexOf(".") + 1);

            // ✅ Unique file name
            String publicId = "food_" + UUID.randomUUID();

            // ✅ Convert MultipartFile → File
            File tempFile = File.createTempFile("temp", "." + extension);
            file.transferTo(tempFile);

            // ✅ Upload to Cloudinary
            Map uploadResult = cloudinary.uploader().upload(
                    tempFile,
                    ObjectUtils.asMap(
                            "folder", "food_items",
                            "public_id", publicId
                    )
            );

            // ✅ Delete temp file
            tempFile.delete();

            // ✅ Return URL
            return uploadResult.get("secure_url").toString();

        } catch (Exception e) {
            e.printStackTrace();
            return "Upload Failed";
        }
    }

    @Override
    public FoodResponse addFood(FoodRequest request, MultipartFile file) {
        FoodEntity newFoodEntity=convertToEntity(request);
        String imageUrl=uploadFile(file);
        newFoodEntity.setImageUrl(imageUrl);
        newFoodEntity=foodRepository.save(newFoodEntity);
        return convertToResponse(newFoodEntity);
    }

    @Override
    public List<FoodResponse> readFoods() {
        List<FoodEntity> databaseEntries=foodRepository.findAll();
        return databaseEntries.stream().map(object->convertToResponse(object)).collect(Collectors.toList());

    }

    @Override
    public FoodResponse readFood(String id) {
        FoodEntity existingFood=foodRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("food not found for the id: "+id));
        return convertToResponse(existingFood);

    }
    @Override
    public String extractPublicId(String imageUrl) {

        // Example URL:
        // https://res.cloudinary.com/demo/image/upload/v12345/food_items/food_123.jpg

        String[] parts = imageUrl.split("/");

        // last part → food_123.jpg
        String fileName = parts[parts.length - 1];

        // remove extension → food_123
        String name = fileName.substring(0, fileName.lastIndexOf("."));

        // add folder → food_items/food_123
        return "food_items/" + name;
    }


        public boolean deleteFile(String publicId) {
        try {
            Map<String, Object> result = cloudinary.uploader().destroy(
                    publicId,
                    ObjectUtils.asMap("resource_type", "image")
            );

            String status = (String) result.get("result");

            return "ok".equals(status) || "not found".equals(status);

        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public void deleteFood(String id) {

        FoodResponse response = readFood(id);

        String imageUrl = response.getImageUrl();

        // ✅ Extract public_id properly
        String publicId = extractPublicId(imageUrl);

        // ✅ Delete from Cloudinary
        boolean isFileDelete = deleteFile(publicId);

        // ✅ Delete from DB only if image deleted
        if (isFileDelete) {
            foodRepository.deleteById(response.getId());
        } else {
            throw new RuntimeException("Image delete failed");
        }
    }

    private FoodEntity convertToEntity(FoodRequest request){
        return FoodEntity.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .category(request.getCategory())
                .build();
    }
    private FoodResponse convertToResponse(FoodEntity entity){
//        System.out.println("Image URL = " + entity.getImageUrl());
        return FoodResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .description(entity.getDescription())
                .price(entity.getPrice())
                .category(entity.getCategory())
                .imageUrl(entity.getImageUrl())
                .build();
    }
}