package com.example.demo.services;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import java.lang.Iterable;

import com.example.demo.entities.Tags;
import com.example.demo.repositories.TagsRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Service
public class TagsService{
	@Autowired
	private TagsRepository tagsRepository;
  
  public Iterable<Tags> listTags(){
		Iterable<Tags> tags = tagsRepository.findAll();
		return tags;
	}
  
	public ResponseEntity<Tags> saveTag(String name){
		Tags tag = new Tags(name);
		tagsRepository.save(tag);
		return ResponseEntity.status(HttpStatus.CREATED).body(tag);
	}
	
  public ResponseEntity<Tags> updateTag(Long id, String name){
		Tags tag = tagsRepository.findById(id).orElse(null);
    tag.setName(name);
    
	  tagsRepository.save(tag);
		return ResponseEntity.status(HttpStatus.CREATED).body(tag);
	}

	public void deleteTag(Long id) {
    tagsRepository.deleteById(id);
  }
	
}