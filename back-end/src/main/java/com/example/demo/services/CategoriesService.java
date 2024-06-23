package com.example.demo.services;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import java.lang.Iterable;

import com.example.demo.entities.Categories;
import com.example.demo.repositories.CategoriesRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Service
public class CategoriesService{
	@Autowired
	private CategoriesRepository categoriesRepository;
  
  public Iterable<Categories> listCategories(){
		Iterable<Categories> categories = categoriesRepository.findAll();
		return categories;
	}
  
	public ResponseEntity<Categories> saveCategory(String name, String image_url){
		Categories categories = new Categories(name, image_url);
		categoriesRepository.save(categories);
		return ResponseEntity.status(HttpStatus.CREATED).body(categories);
	}
	
  public ResponseEntity<Categories> updateCategory(Long id, String name, String image_url){
		Categories category = categoriesRepository.findById(id).orElse(null);
    category.setName(name);
    category.setImage_url(image_url);
    
		categoriesRepository.save(category);
		return ResponseEntity.status(HttpStatus.CREATED).body(category);
	}
	
	
	public void deleteCategory(Long id) {
    categoriesRepository.deleteById(id);
  }
	
}