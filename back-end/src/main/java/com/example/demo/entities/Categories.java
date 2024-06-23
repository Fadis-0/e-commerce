package com.example.demo.entities;

import java.util.*;
import java.lang.*;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Id;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "categories")
public class Categories {
	// category class attributes
	@Id
	@SequenceGenerator(name="categories_seq", sequenceName="categories_seq", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="categories_seq")
	private Long id;
	
	@Column(name="name")
	private String name;

	@Column(name="image_url")
	private String image_url;
	
  public Categories(String name, String image_url) {
        this.name = name;
        this.image_url = image_url;
  }
} 