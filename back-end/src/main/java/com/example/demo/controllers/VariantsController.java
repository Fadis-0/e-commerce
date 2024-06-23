package com.example.demo.controllers;

import com.example.demo.entities.Variants;
import com.example.demo.repositories.VariantsRepository;
import com.example.demo.services.VariantsService;

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

import java.util.Optional;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/variants")
@CrossOrigin
public class VariantsController {
	@Autowired
	private VariantsRepository variantsRepository;
	
	@Autowired
	private VariantsService variantsService;
  
  @GetMapping("/list")
  @ResponseBody
  public Iterable<Variants> list() {
    return variantsService.listVariants();
  }

  @GetMapping("/list/{id}")
  @ResponseBody
  public  Variants getVariantsById(@PathVariable Long id){
      Optional<Variants> optionalVariants = variantsRepository.findById(id);
      if(optionalVariants.isPresent()){
          return optionalVariants.get();
      } else {
          // handle case when product with given id does not exist
          throw new NoSuchElementException("Product with id " + id + " not found");
      }
  }
  

	
	@PostMapping("/add")
  public void formSubmit(@RequestParam Long product_id, @RequestParam Integer quantity, @RequestParam String sku, @RequestParam String status, @RequestParam String color, @RequestParam String size, @RequestParam String material) {
    variantsService.saveVariant(product_id, quantity, sku, status, color, size, material);
  }
  
 
  
  @PutMapping("/update")
	public void updateStatus(@RequestParam Long id, @RequestParam String status) {
	  variantsService.updateStatus(id, status);
	}

  @DeleteMapping("/delete/{id}")
  public void deleteVariant(@PathVariable Long id) {
      variantsService.deleteVariant(id);
  }
	
	

  
  

	
}