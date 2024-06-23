package com.example.demo.repositories;

import com.example.demo.entities.Brands;

import org.springframework.data.repository.CrudRepository;

public interface BrandsRepository extends CrudRepository<Brands, Long> {
	
}