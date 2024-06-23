package com.example.demo.controllers;

import com.example.demo.entities.Orders;
import com.example.demo.repositories.OrderRepository;
import com.example.demo.services.OrderService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.time.LocalDate;
import java.time.Month;

import java.lang.Iterable;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;


@RestController
@RequestMapping("/orders")    
@CrossOrigin

public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private OrderRepository orderRepository;
    
    @GetMapping("/list")
	@ResponseBody
	public Iterable<Orders> list(){
		Iterable<Orders> order = orderRepository.findAll();
		return order;
	}

    @PostMapping("/add")
		public ResponseEntity<Map<String, Long>> formSubmit(@RequestBody Orders order) {
            Long orderId = orderService.saveOrder(order.getId2(), order.getTotalPrice(), order.getStatus());
	        Map<String, Long> response = new HashMap<>();
            response.put("id", orderId);
            return ResponseEntity.ok(response);
		}

@PutMapping("/status/{id}")
public ResponseEntity<String> updateOrderStatus(@RequestBody Orders order) {
    String message = orderService.updateOrderStatus(order.getId(), order.getStatus());
    return ResponseEntity.ok(message);
}

}
