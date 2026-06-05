package com.example.food_delivery.service;

import com.example.food_delivery.entity.UserEntity;
import com.example.food_delivery.repository.UserRepository;
import com.example.food_delivery.io.UserRequest;
import com.example.food_delivery.io.UserResponse;
import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
@AllArgsConstructor

public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationFacade authenticationFacade;

    @Override
    public UserResponse registerUser(UserRequest request) {
        UserEntity newUser=convertToEntity(request);
        newUser=userRepository.save(newUser);
        return convertToResponse(newUser);
    }

    @Override
    public String findByUserId() {
        Authentication auth= authenticationFacade.getAuthentication();
//        System.out.println("AUTH = " + auth);
//        System.out.println("NAME = " + auth.getName());
        String loggedInUserEmail=auth.getName();
        UserEntity loggedInUser= userRepository.findByEmail(loggedInUserEmail)
                .orElseThrow(()->new UsernameNotFoundException("User not found"));
        return loggedInUser.getId();
    }


    private UserEntity convertToEntity(UserRequest request){
        return UserEntity.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();

    }

    private UserResponse convertToResponse(UserEntity registerUser){
        return UserResponse.builder()
                .id(registerUser.getId())
                .name(registerUser.getName())
                .email(registerUser.getEmail())
                .build();


    }
}
