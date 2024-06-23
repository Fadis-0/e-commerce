package com.example.demo.repositories;

import com.example.demo.entities.Tags;

import org.springframework.data.repository.CrudRepository;

public interface TagsRepository extends CrudRepository<Tags, Long> {
	
}