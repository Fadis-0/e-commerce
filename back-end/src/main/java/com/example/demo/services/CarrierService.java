package com.example.demo.services;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import java.lang.Iterable;

import com.example.demo.entities.Carrier;
import com.example.demo.repositories.CarrierRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Service
public class CarrierService{
	@Autowired
	private CarrierRepository carrierRepository;
  
  public Iterable<Carrier> listCarrier(){
		Iterable<Carrier> carrier = carrierRepository.findAll();
		return carrier;
	}
  
	public ResponseEntity<Carrier> saveCarrier(String name,  String address, Integer phone_number,String email){
		Carrier carrier = new Carrier( name, address, phone_number, email);
		carrierRepository.save(carrier);
		return ResponseEntity.status(HttpStatus.CREATED).body(carrier);
	}

	
	
	public void deleteCarrier(Long id) {
        carrierRepository.deleteById(id);
  }
	
}