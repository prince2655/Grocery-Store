package com.example.food_delivery.service;

import com.example.food_delivery.io.UserRequest;
import com.example.food_delivery.io.UserResponse;

public interface UserService {

    UserResponse registerUser(UserRequest request);

//    UserRequest req = new UserRequest("Alice", "alice@email.com");
//    UserResponse res = registerUser(req);

    String findByUserId();
}
