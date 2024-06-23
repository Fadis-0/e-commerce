package com.example.demo.repositories;

import com.example.demo.entities.Categories;

import org.springframework.data.repository.CrudRepository;

public interface CategoriesRepository extends CrudRepository<Categories, Long> {
	
}