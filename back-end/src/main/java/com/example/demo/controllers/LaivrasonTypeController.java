package com.example.demo.controllers;

import com.example.demo.entities.LaivrasonType;
import com.example.demo.repositories.LaivrasonTypeRepository;
import com.example.demo.services.LaivrasonTypeService;

import java.util.List;
import java.time.LocalDate;
import java.time.Month;

import java.lang.Iterable;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;


@RestController
@RequestMapping("/laivrasonType")
@CrossOrigin

public class LaivrasonTypeController {

    @Autowired
    private LaivrasonTypeService laivrasonTypeService;
    @Autowired
    private LaivrasonTypeRepository laivrasonTypeRepository;
    
    @GetMapping("/list")
	@ResponseBody
	public Iterable< LaivrasonType> list(){
		Iterable< LaivrasonType> laivrasonType = laivrasonTypeRepository.findAll();
		return laivrasonType;
	}
	@PostMapping("/add")
  public void formSubmit(@RequestBody LaivrasonType laivrasonType) {
    laivrasonTypeService.saveLaivrason(laivrasonType.getName(), laivrasonType.getPrice());
  }
  

  @DeleteMapping("/delete/{id}")
  public void deleteLaivrasonType(@PathVariable Long id) {
    laivrasonTypeService.deleteLaivrasonType(id);
  }
	
}
