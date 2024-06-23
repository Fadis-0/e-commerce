package com.example.demo.repositories;

import com.example.demo.entities.Variants;

import org.springframework.data.repository.CrudRepository;

public interface VariantsRepository extends CrudRepository<Variants, Long> {
	
}