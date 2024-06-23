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
@Table(name = "tags")
public class Tags {
	// tags class attributes
	@Id
	@SequenceGenerator(name="tags_seq", sequenceName="tags_seq", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="tags_seq")
	private Long id;
	
	@Column(name="name")
	private String name;

	
  public Tags(String name) {
       this.name = name;
  }
} 