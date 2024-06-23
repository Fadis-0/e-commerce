package com.example.demo.controllers;

import com.example.demo.entities.Categories;
import com.example.demo.repositories.CategoriesRepository;
import com.example.demo.services.CategoriesService;

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
@RequestMapping("/categories")
@CrossOrigin
public class CategoriesController {
	@Autowired
	private CategoriesRepository categoriesRepository;
	
	@Autowired
	private CategoriesService categoriesService;
  
  @GetMapping("/list")
  @ResponseBody
  public Iterable<Categories> list() {
    return categoriesService.listCategories();
  }
	
	@PostMapping("/add")
  public void formSubmit(@RequestParam String name, @RequestParam String image_url) {
    categoriesService.saveCategory(name, image_url);
  }
  
  @PutMapping("/update")
  public void formUpdate(@RequestParam Long id, @RequestParam String name, @RequestParam String image_url) {
    categoriesService.updateCategory(id, name, image_url);
  }

  @DeleteMapping("/delete/{id}")
  public void deleteCategory(@PathVariable Long id) {
      categoriesService.deleteCategory(id);
  }
	
	

  
  

	
}