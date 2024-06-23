package com.example.demo.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import com.example.demo.entities.Orders;
import com.example.demo.entities.Client;
import com.example.demo.repositories.OrderRepository;
import com.example.demo.repositories.ClientRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Service
public class OrderService{
	@Autowired
	private OrderRepository orderRepository;
    @Autowired
    private ClientRepository clientRepository;

	public Long saveOrder(Integer id2, Float totalPrice,  String status){
		Optional<Client> optionalClient = clientRepository.findById((long)id2);
		Client client = optionalClient.get();
		Orders order = new Orders(client, LocalDateTime.now(), totalPrice, status,id2);
		orderRepository.save(order);
		return order.getId();
	}
	public String updateOrderStatus(Long id, String status) {
        Optional<Orders> order = orderRepository.findById(id);

        if (order.isPresent()) {
            Orders updatedOrder = order.get();
            updatedOrder.setStatus(status);
            orderRepository.save(updatedOrder);
            return "Order status updated successfully";
        } else {
            return "Order not found";
        }
    }
	
}