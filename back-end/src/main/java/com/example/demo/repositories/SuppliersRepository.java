package com.example.demo.repositories;

import com.example.demo.entities.Suppliers;

import org.springframework.data.repository.CrudRepository;

public interface SuppliersRepository extends CrudRepository<Suppliers, Long> {
	
}