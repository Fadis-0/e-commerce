package com.example.demo.services;

import com.example.demo.entities.Products;
import com.example.demo.repositories.ProductsRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import java.lang.Iterable;

import com.example.demo.entities.Variants;
import com.example.demo.repositories.VariantsRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Service
public class VariantsService{
	@Autowired
	private VariantsRepository variantsRepository;
  
  @Autowired
  private ProductsRepository productsRepository;
  
  public Iterable<Variants> listVariants(){
		Iterable<Variants> variants = variantsRepository.findAll();
		return variants;
	}
  
	public ResponseEntity<Variants> saveVariant(Long product_id, Integer quantity, String sku, String status, String color, String size, String material){
		Optional<Products> optionalProducts = productsRepository.findById((long)product_id);
		Products product = optionalProducts.get();
		Variants variant = new Variants(product, product_id, quantity, sku, status, color, size, material);
		variantsRepository.save(variant);
		return ResponseEntity.status(HttpStatus.CREATED).body(variant);
	}
	
  public ResponseEntity<Variants> updateVariant(Long id, Long product_id, Integer quantity){
		Variants variant = variantsRepository.findById(id).orElse(null);
    variant.setQuantity(quantity);
    
		variantsRepository.save(variant);
		return ResponseEntity.status(HttpStatus.CREATED).body(variant);
	}
	
	public ResponseEntity<Variants> updateStatus(Long id, String status) {
    Variants variant = variantsRepository.findById(id).orElse(null);
    if (variant != null) {
      variant.setStatus(status);
      variantsRepository.save(variant);
    }
    return ResponseEntity.status(HttpStatus.CREATED).body(variant);
  }

	public void deleteVariant(Long id) {
    variantsRepository.deleteById(id);
  }
	
}