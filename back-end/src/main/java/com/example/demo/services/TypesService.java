package com.example.demo.services;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import java.lang.Iterable;

import com.example.demo.entities.Types;
import com.example.demo.repositories.TypesRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Service
public class TypesService{
	@Autowired
	private TypesRepository typesRepository;
  
  public Iterable<Types> listTypes(){
		Iterable<Types> types = typesRepository.findAll();
		return types;
	}
  
	public ResponseEntity<Types> saveType(Long category_id, String name){
		Types type = new Types(category_id, name);
		typesRepository.save(type);
		return ResponseEntity.status(HttpStatus.CREATED).body(type);
	}
	
  public ResponseEntity<Types> updateType(Long id, Long category_id, String name){
		Types type = typesRepository.findById(id).orElse(null);
    
    type.setCategory_id(category_id);
    type.setName(name);
    
		typesRepository.save(type);
		return ResponseEntity.status(HttpStatus.CREATED).body(type);
	}

	public void deleteType(Long id) {
    typesRepository.deleteById(id);
  }
	
}