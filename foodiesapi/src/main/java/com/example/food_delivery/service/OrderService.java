package com.example.food_delivery.service;

import com.example.food_delivery.io.OrderRequest;
import com.example.food_delivery.io.OrderResponse;
import com.razorpay.RazorpayException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public interface OrderService {

    OrderResponse createOrderWithPayment(OrderRequest request) throws RazorpayException;

   void verifyPayment(Map<String, String> paymentData,String status);

   List<OrderResponse> getUserOrders();

   void removeOrder(String orderId);

   List<OrderResponse>getOrderOfAllUsers();

   void updateOrderStatus(String orderId,String status);
}
