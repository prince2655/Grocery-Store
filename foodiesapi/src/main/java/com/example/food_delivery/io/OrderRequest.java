package com.example.food_delivery.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class OrderRequest {

    private List<OrderItem> orderItems;
    private String userAddress;
    private Double amount;
    private String email;
    private String phone;
    private String orderStatus;
}
