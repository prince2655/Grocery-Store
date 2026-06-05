package com.example.food_delivery.service;

import com.example.food_delivery.entity.UserEntity;
import com.example.food_delivery.repository.UserRepository;
import lombok.AllArgsConstructor;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@AllArgsConstructor
public class AppUserDetailService implements UserDetailsService {

    private final UserRepository userRepository;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserEntity user=userRepository.findByEmail(email)
                .orElseThrow(()->new UsernameNotFoundException("User with email "+email+" not found"));
        return new User(user.getEmail(), user.getPassword(), Collections.emptyList());
    }
}
