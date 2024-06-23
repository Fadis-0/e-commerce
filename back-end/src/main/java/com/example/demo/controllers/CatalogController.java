package com.example.demo.controllers;

import com.example.demo.entities.Catalog;
import com.example.demo.repositories.CatalogRepository;
import com.example.demo.services.CatalogService;

import java.util.List;
import java.time.LocalDate;
import java.time.Month;

import java.lang.Iterable;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
import java.util.NoSuchElementException;
import java.util.Optional;


@RestController
@RequestMapping("/catalog")
@CrossOrigin
public class CatalogController {
	@Autowired
	private CatalogRepository catalogRepository;
	
	@Autowired
	private CatalogService catalogService;
	
	@GetMapping("/list")
	@ResponseBody
	public Iterable<Catalog> list(){
		Iterable<Catalog> catalog = catalogRepository.findAll();
		return catalog;
	}
  

	
	@PostMapping("/add")
	public ResponseEntity<Catalog> formSubmit(@RequestParam String name, @RequestParam String brand, @RequestParam Float price, @RequestParam String description, @RequestParam String image_url, @RequestParam String image_url2, @RequestParam String sku, @RequestParam String barcode, @RequestParam Long idsup) {
	    ResponseEntity<Catalog> responseEntity = catalogService.saveProduct(name, brand, price, description, image_url, image_url2, sku, barcode, idsup);
	    return responseEntity;
	}

	@PutMapping("/update")
	public void formUpdate(@RequestParam Long id, @RequestParam String name, @RequestParam String brand, @RequestParam Float price, @RequestParam String description, @RequestParam String image_url, @RequestParam String sku, @RequestParam String barcode) {
	  catalogService.updateProduct(id, name, brand, price, description, image_url, sku, barcode);
	}

	@DeleteMapping("/delete/{id}")
	public void deleteProduct(@PathVariable Long id) {
	  catalogService.deleteProduct(id);
	}
	
	@PutMapping("/active/{id}")

public ResponseEntity<String> updateProductActive(@RequestBody Catalog product) {

    String message = catalogService.updateProductActive(product.getId(), product.getActive());
    
    return ResponseEntity.ok(message);
}
	
} 
