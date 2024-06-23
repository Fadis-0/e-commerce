package com.example.demo.repositories;

import com.example.demo.entities.Products;

import org.springframework.data.repository.CrudRepository;

public interface ProductsRepository extends CrudRepository<Products, Long> {
	
}