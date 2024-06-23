package com.example.demo.repositories;

import com.example.demo.entities.Catalog;

import org.springframework.data.repository.CrudRepository;

public interface CatalogRepository extends CrudRepository<Catalog, Long> {
	
}