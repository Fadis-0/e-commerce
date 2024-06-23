package com.example.demo.services;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import java.lang.Iterable;

import com.example.demo.entities.Warehouses;
import com.example.demo.repositories.WarehousesRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Service
public class WarehousesService{
	@Autowired 
	private WarehousesRepository warehousesRepository;
  
  public Iterable<Warehouses> listWarehouses(){
		Iterable<Warehouses> warehouses = warehousesRepository.findAll();
		return warehouses;
	}
  
	public ResponseEntity<Warehouses> saveWarehouses(String name,  String address, Integer phone_number,String email){
		Warehouses warehouses = new Warehouses( name, address, phone_number, email);
		warehousesRepository.save(warehouses);
		return ResponseEntity.status(HttpStatus.CREATED).body(warehouses);
	}

	
	
	public void deleteWarehouses(Long id) {
        warehousesRepository.deleteById(id);
  }
	
}
