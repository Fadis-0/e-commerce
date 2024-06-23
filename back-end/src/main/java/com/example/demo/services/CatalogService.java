package com.example.demo.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import com.example.demo.entities.Catalog;
import com.example.demo.repositories.CatalogRepository;

import com.example.demo.entities.Suppliers;
import com.example.demo.repositories.SuppliersRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Service
public class CatalogService {
  @Autowired
  private CatalogRepository catalogRepository;
  
  @Autowired
	private SuppliersRepository suppliersRepository;

  
  public ResponseEntity<Catalog> saveProduct(String name, String brand, Float price, String description, String image_url, String image_url2, String sku, String barcode, Long idsup) {
    Optional<Suppliers> optionalSupplier = suppliersRepository.findById((long)idsup);
		Suppliers supplier = optionalSupplier.get();
    
    Catalog product = new Catalog(name, brand, price, description, image_url, image_url2, sku, barcode, supplier);
    
    catalogRepository.save(product);
    return ResponseEntity.status(HttpStatus.CREATED).body(product);
  }

  public ResponseEntity<Catalog> updateProduct(Long id, String name, String brand, Float price, String description, String image_url, String sku, String barcode) {
    Catalog product = catalogRepository.findById(id).orElse(null);

    if (product != null) {
      product.setName(name);
      product.setBrand(brand);
      
      product.setPrice(price);
      
      product.setDescription(description);
      product.setImage_url(image_url);
      
      product.setSku(sku);
      product.setBarcode(barcode);
      
      
      catalogRepository.save(product);
    }

    return ResponseEntity.status(HttpStatus.CREATED).body(product);
  }

  public void deleteProduct(Long id) {
    catalogRepository.deleteById(id);
  }
  
  public String updateProductActive(Long id, Boolean active) {

        Optional<Catalog> product = catalogRepository.findById(id);


        if (product.isPresent()) {
            Catalog updatedProduct = product.get();
            updatedProduct.setActive(active);
            catalogRepository.save(updatedProduct);
            return "product activity updated successfully";
        } else {
            return "product not found";
        }
    }
}
