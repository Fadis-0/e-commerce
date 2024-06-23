package com.example.demo.repositories;

import com.example.demo.entities.OrderLine;

import org.springframework.data.repository.CrudRepository;

public interface OrderLineRepository extends CrudRepository<OrderLine, Long> {
	
}