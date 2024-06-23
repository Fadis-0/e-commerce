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
@Table(name = "types")
public class Types {
	// brands class attributes
	@Id
	@SequenceGenerator(name="types_seq", sequenceName="types_seq", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="types_seq")
	private Long id;
	
	@Column(name="category_id")
	private Long category_id;
	
	@Column(name="name")
	private String name;

	
  public Types(Long category_id, String name) {
        this.category_id = category_id;
        this.name = name;
  }
} 