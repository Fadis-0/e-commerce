package com.example.demo.controllers;

import com.example.demo.entities.Products;
import com.example.demo.repositories.ProductsRepository;
import com.example.demo.services.ProductsService;

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
@RequestMapping("/products")
@CrossOrigin
public class ProductsController {
	@Autowired
	private ProductsRepository productsRepository;
	
	@Autowired
	private ProductsService productsService;
	
	@GetMapping("/list")
	@ResponseBody
	public Iterable<Products> list(){
		Iterable<Products> products = productsRepository.findAll();
		return products;
	}
  
  @GetMapping("/list/{id}")
@ResponseBody
public Products getProductById(@PathVariable Long id){
    Optional<Products> optionalProduct = productsRepository.findById(id);
    if(optionalProduct.isPresent()){
        return optionalProduct.get();
    } else {
        // handle case when product with given id does not exist
        throw new NoSuchElementException("Product with id " + id + " not found");
    }
}

	
	@PostMapping("/add")
	public ResponseEntity<Products> formSubmit(@RequestParam String name, @RequestParam String brand, @RequestParam String category, @RequestParam Float price, @RequestParam Integer quantity, @RequestParam String description, @RequestParam String image_url, @RequestParam String image_url2, @RequestParam String tags, @RequestParam Float compare_price, @RequestParam String type, @RequestParam Float margin, @RequestParam String sku, @RequestParam String barcode, @RequestParam String status) {
	    ResponseEntity<Products> responseEntity = productsService.saveProduct(name, brand, category, price, quantity, description, image_url, image_url2, tags, compare_price,type, margin, sku, barcode, status);
	    return responseEntity;
	}

	@PutMapping("/update")
	public void formUpdate(@RequestParam Long id, @RequestParam String name, @RequestParam String brand, @RequestParam String category, @RequestParam Float price, @RequestParam Integer quantity, @RequestParam String description, @RequestParam String image_url, @RequestParam String image_url2, @RequestParam String tags, @RequestParam Float comparePrice, @RequestParam String type, @RequestParam Float margin, @RequestParam String sku, @RequestParam String barcode, @RequestParam String status) {
	  productsService.updateProduct(id, name, brand, category, price, quantity, description, image_url, image_url2, tags, comparePrice, type, margin, sku, barcode, status);
	}

	@DeleteMapping("/delete/{id}")
	public void deleteProduct(@PathVariable Long id) {
	  productsService.deleteProduct(id);
	}
	@PutMapping("/stars/{id}")
    public ResponseEntity<String> updateProductStatus(@RequestBody Products roducts) {
    String message = productsService.updateProductStatus(roducts.getId(), roducts.getStars());
    return ResponseEntity.ok(message);
}
@PutMapping("/active/{id}")

public ResponseEntity<String> updateProductActive(@RequestBody Products product) {

    String message = productsService.updateProductActive(product.getId(), product.getActive());
    
    return ResponseEntity.ok(message);
}
	
} 
