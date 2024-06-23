package com.example.demo.controllers;

import com.example.demo.entities.Brands;
import com.example.demo.repositories.BrandsRepository;
import com.example.demo.services.BrandsService;

import java.util.List;
import java.lang.Iterable;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
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


@RestController
@RequestMapping("/brands")
@CrossOrigin
public class BrandsController {
	@Autowired
	private BrandsRepository brandsRepository;
	
	@Autowired
	private BrandsService brandsService;
  
  @GetMapping("/list")
  @ResponseBody
  public Iterable<Brands> list() {
    return brandsService.listBrands();
  }
	
	@PostMapping("/add")
  public void formSubmit(@RequestParam String name) {
    brandsService.saveBrand(name);
  }
  
  @PutMapping("/update")
  public void formUpdate(@RequestParam Long id, @RequestParam String name) {
    brandsService.updateBrand(id, name);
  }

  @DeleteMapping("/delete/{id}")
  public void deleteBrand(@PathVariable Long id) {
      brandsService.deleteBrand(id);
  }
	
	

  
  

	
}