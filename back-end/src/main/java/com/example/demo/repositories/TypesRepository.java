package com.example.demo.repositories;

import com.example.demo.entities.Types;

import org.springframework.data.repository.CrudRepository;

public interface TypesRepository extends CrudRepository<Types, Long> {
	
}