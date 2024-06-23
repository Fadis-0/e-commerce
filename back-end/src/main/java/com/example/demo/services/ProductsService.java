package com.example.demo.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import com.example.demo.entities.Products;
import com.example.demo.repositories.ProductsRepository;

import com.example.demo.entities.Suppliers;
import com.example.demo.repositories.SuppliersRepository;

import com.example.demo.entities.Catalog;
import com.example.demo.repositories.CatalogRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Service
public class ProductsService {
  @Autowired
  private ProductsRepository productsRepository;
  
  @Autowired
	private SuppliersRepository suppliersRepository;
  
  @Autowired
	private CatalogRepository catalogRepository;

  public ResponseEntity<Products> saveProduct(String name, String brand, String category, Float price, Integer quantity, String description, String image_url, String image_url2, String tags, Float compare_price, String type, Float margin, String sku, String barcode, String status) {
    Integer stars =  0;
    Products product = new Products(name, brand, category,stars, price, quantity, description, image_url, image_url2, tags, compare_price, type, margin, sku, barcode, status);
    
    productsRepository.save(product);
    return ResponseEntity.status(HttpStatus.CREATED).body(product);
  }

  public ResponseEntity<Products> updateProduct(Long id, String name, String brand, String category, Float price, Integer quantity, String description, String image_url, String image_url2, String tags, Float compare_price, String type, Float margin, String sku, String barcode, String status) {
    Products product = productsRepository.findById(id).orElse(null);

    if (product != null) {
      product.setName(name);
      product.setBrand(brand);
      product.setCategory(category);
      product.setPrice(price);
      product.setQuantity(quantity);
      product.setDescription(description);
      product.setImage_url(image_url);
      product.setImage_url2(image_url2);
      product.setComparePrice(compare_price);
      product.setType(type);
      product.setMargin(margin);
      product.setSku(sku);
      product.setBarcode(barcode);
      product.setStatus(status);
      
      productsRepository.save(product);
    }

    return ResponseEntity.status(HttpStatus.CREATED).body(product);
  }

  public void deleteProduct(Long id) {
    productsRepository.deleteById(id);
  }
  
  public String updateProductActive(Long id, Boolean active) {

        Optional<Products> product = productsRepository.findById(id);


        if (product.isPresent()) {
            Products updatedProduct = product.get();
            updatedProduct.setActive(active);
            productsRepository.save(updatedProduct);
            return "product activity updated successfully";
        } else {
            return "product not found";
        }
    }
    
    public String updateSupplier(Long id, Long idsup, Long idcat) {

        Optional<Products> product = productsRepository.findById(id);


        if (product.isPresent()) {
            Products updatedProduct = product.get();
            
            Optional<Suppliers> optionalSupplier = suppliersRepository.findById((long)idsup);
		        Suppliers supplier = optionalSupplier.get();
            
            Optional<Catalog> optionalCatalog = catalogRepository.findById((long)idcat);
		        Catalog catalog = optionalCatalog.get();
   
            
            updatedProduct.setSupplier(supplier);
            updatedProduct.setCatalog(catalog);

            productsRepository.save(updatedProduct);
            return "product activity updated successfully";
        } else {
            return "product not found";
        }
    }
    public String updateProductStatus(Long id, Integer stars) {
      Optional<Products> products = productsRepository.findById(id);
      if (products.isPresent()) {
          Products updatedproducts = products.get();
          int oldStars = updatedproducts.getStars();
          int newStars = stars;
          int avgStars = (oldStars + newStars) / 2;
          updatedproducts.setStars(avgStars);
          productsRepository.save(updatedproducts);
          return "Product stars updated successfully";
      } else {
          return "Product not found";
      }
  }

}
