package com.example.demo.services;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import java.lang.Iterable;

import com.example.demo.entities.Suppliers;
import com.example.demo.repositories.SuppliersRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Service
public class SuppliersService{
	@Autowired
	private SuppliersRepository suppliersRepository;
  
  public Iterable<Suppliers> listSuppliers(){
		Iterable<Suppliers> suppliers = suppliersRepository.findAll();
		return suppliers;
	}
  
	public ResponseEntity<Suppliers> saveSuppliers(String name, String address, Integer phone_number,String email){
		Suppliers suppliers = new Suppliers( name, address, phone_number, email);
		suppliersRepository.save(suppliers);
		return ResponseEntity.status(HttpStatus.CREATED).body(suppliers);
	}

	
	
	public void deleteSuppliers(Long id) {
        suppliersRepository.deleteById(id);
  }
	
}
