package com.example.demo.controllers;

import com.example.demo.entities.Types;
import com.example.demo.repositories.TypesRepository;
import com.example.demo.services.TypesService;

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
@RequestMapping("/types")
@CrossOrigin
public class TypesController {
	@Autowired
	private TypesRepository typesRepository;
	
	@Autowired
	private TypesService typesService;
  
  @GetMapping("/list")
  @ResponseBody
  public Iterable<Types> list() {
    return typesService.listTypes();
  }
	
	@PostMapping("/add")
  public void formSubmit(@RequestParam Long category_id, @RequestParam String name) {
    typesService.saveType(category_id, name);
  }
  
  @PutMapping("/update")
  public void formUpdate(@RequestParam Long id, @RequestParam Long category_id, @RequestParam String name) {
    typesService.updateType(id, category_id, name);
  }

  @DeleteMapping("/delete/{id}")
  public void deleteType(@PathVariable Long id) {
      typesService.deleteType(id);
  }
	
	

  
  

	
}