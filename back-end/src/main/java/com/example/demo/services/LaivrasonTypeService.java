package com.example.demo.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


import com.example.demo.entities.LaivrasonType;
import com.example.demo.repositories.LaivrasonTypeRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Service
public class LaivrasonTypeService{

    @Autowired
    private LaivrasonTypeRepository laivrasonTypeRepository;



	public Long saveLaivrason( String name , Float price ){

        LaivrasonType laivrasonType = new LaivrasonType(name ,price );
        laivrasonTypeRepository.save(laivrasonType);
    return laivrasonType.getId();
}
	public void deleteLaivrasonType(Long id) {
        laivrasonTypeRepository.deleteById(id);
  }
  
    

}