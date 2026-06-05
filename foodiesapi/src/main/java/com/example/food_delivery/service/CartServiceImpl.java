package com.example.food_delivery.service;

import com.example.food_delivery.entity.CartEntity;
import com.example.food_delivery.io.CartRequest;
import com.example.food_delivery.io.CartResponse;
import com.example.food_delivery.repository.CartRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService {

    private final CartRepository cartRepository;
    private final UserService userService;

    @Override
    public CartResponse addToCart(CartRequest request) {
        System.out.println("Service Hit");
        String loggedInUserId=userService.findByUserId();
        System.out.println("User ID = " + loggedInUserId);
        Optional<CartEntity> cartOptinal=cartRepository.findByUserId(loggedInUserId);
        System.out.println("Cart Found = " + cartOptinal.isPresent());
        CartEntity cart=cartOptinal.orElseGet(()->new CartEntity(loggedInUserId,new HashMap<>()));
        Map<String, Integer>cartItems=safeItems(cart.getItems());
        cartItems.put(request.getFoodId(),cartItems.getOrDefault(request.getFoodId(),0)+1);
        cart.setItems(cartItems);
        cart=cartRepository.save(cart);
        return convertToResponse(cart);

    }

    @Override
    public CartResponse getCart() {
        String loggedInUserId=userService.findByUserId();
        CartEntity entity=cartRepository.findByUserId(loggedInUserId)
                .orElseGet(()->new CartEntity(null,loggedInUserId,new HashMap<>()));
        entity.setItems(safeItems(entity.getItems()));
        return convertToResponse(entity);
    }

    @Override
    public void clearCart() {
        String loggedInUserId=userService.findByUserId();
        cartRepository.deleteByUserId(loggedInUserId);
    }

    @Override
    public CartResponse removeFromCart(CartRequest cartRequest) {
        String loggedInUserId=userService.findByUserId();
        CartEntity entity=cartRepository.findByUserId(loggedInUserId)
                .orElseThrow(()->new RuntimeException("cart is not found"));
        Map<String,Integer>cartItems=safeItems(entity.getItems());
        if(cartItems.containsKey(cartRequest.getFoodId())) {
            int currentQty = cartItems.get(cartRequest.getFoodId());
            if (currentQty > 0) {
                cartItems.put(cartRequest.getFoodId(), currentQty - 1);
            } else {
                cartItems.remove(cartRequest.getFoodId());
            }
            entity = cartRepository.save(entity);
        }
            return convertToResponse(entity);

    }

    private CartResponse convertToResponse(CartEntity cartEntity){
        return CartResponse.builder()
                .id(cartEntity.getId())
                .userId(cartEntity.getUserId())
                .items(safeItems(cartEntity.getItems()))
                .build();
    }

    private Map<String, Integer> safeItems(Map<String, Integer> items) {
        return items == null ? new HashMap<>() : items;
    }
}
