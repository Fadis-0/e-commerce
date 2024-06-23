package com.example.demo.repositories;

import com.example.demo.entities.Orders;

import org.springframework.data.repository.CrudRepository;

public interface OrderRepository extends CrudRepository<Orders, Long> {
	
}