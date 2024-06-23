package com.example.demo.controllers;

import com.example.demo.entities.Tags;
import com.example.demo.repositories.TagsRepository;
import com.example.demo.services.TagsService;

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
@RequestMapping("/tags")
@CrossOrigin
public class TagsController {
	@Autowired
	private TagsRepository tagsRepository;
	
	@Autowired
	private TagsService tagsService;
  
  @GetMapping("/list")
  @ResponseBody
  public Iterable<Tags> list() {
    return tagsService.listTags();
  }
	
	@PostMapping("/add")
  public void formSubmit(@RequestParam String name) {
    tagsService.saveTag(name);
  }
  
  @PutMapping("/update")
  public void formUpdate(@RequestParam Long id, @RequestParam String name) {
    tagsService.updateTag(id, name);
  }

  @DeleteMapping("/delete/{id}")
  public void deleteTag(@PathVariable Long id) {
      tagsService.deleteTag(id);
  }
	
	

  
  

	
}