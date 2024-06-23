package com.example.demo.repositories;

import com.example.demo.entities.Carrier;

import org.springframework.data.repository.CrudRepository;

public interface CarrierRepository extends CrudRepository<Carrier, Long> {
	
}