package com.example.food_delivery.controller;


import com.example.food_delivery.io.AuthenticationRequest;
import com.example.food_delivery.io.AuthenticationResponse;
import com.example.food_delivery.io.UserRequest;
import com.example.food_delivery.io.UserResponse;
import com.example.food_delivery.service.UserService;
import com.example.food_delivery.util.JwtUtil;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@AllArgsConstructor
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;
    private final UserService userService;

    @PostMapping("/login")
    public AuthenticationResponse login(@RequestBody AuthenticationRequest request){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(),request.getPassword()));
        final UserDetails userDetails=userDetailsService.loadUserByUsername(request.getEmail());
        final String jwtToken=jwtUtil.generateToken(userDetails);
        return new  AuthenticationResponse(request.getEmail(),jwtToken);

    }

    @PostMapping("/register")
    public UserResponse register(@RequestBody UserRequest request) {
        return userService.registerUser(request);
    }
}
