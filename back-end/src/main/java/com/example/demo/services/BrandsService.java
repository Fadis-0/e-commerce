package com.example.demo.services;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import java.lang.Iterable;

import com.example.demo.entities.Brands;
import com.example.demo.repositories.BrandsRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Service
public class BrandsService{
	@Autowired
	private BrandsRepository brandsRepository;
  
  public Iterable<Brands> listBrands(){
		Iterable<Brands> brands = brandsRepository.findAll();
		return brands;
	}
  
	public ResponseEntity<Brands> saveBrand(String name){
		Brands brand = new Brands(name);
		brandsRepository.save(brand);
		return ResponseEntity.status(HttpStatus.CREATED).body(brand);
	}
	
  public ResponseEntity<Brands> updateBrand(Long id, String name){
		Brands brand = brandsRepository.findById(id).orElse(null);
    brand.setName(name);
    
		brandsRepository.save(brand);
		return ResponseEntity.status(HttpStatus.CREATED).body(brand);
	}

	public void deleteBrand(Long id) {
    brandsRepository.deleteById(id);
  }
	
}