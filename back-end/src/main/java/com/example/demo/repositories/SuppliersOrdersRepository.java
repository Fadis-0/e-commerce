package com.example.demo.repositories;

import com.example.demo.entities.SuppliersOrders;

import org.springframework.data.repository.CrudRepository;

public interface SuppliersOrdersRepository extends CrudRepository<SuppliersOrders, Long> {
	
}