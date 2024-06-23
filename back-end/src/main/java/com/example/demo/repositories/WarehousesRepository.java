package com.example.demo.repositories;

import com.example.demo.entities.Warehouses;

import org.springframework.data.repository.CrudRepository;

public interface WarehousesRepository extends CrudRepository<Warehouses, Long> {
	
}
