package com.example.demo.entities;

import com.example.demo.entities.Products;

import java.util.*;
import java.lang.*;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "variants")
public class Variants {
	// brands class attributes
	@Id
	@SequenceGenerator(name="variants_seq", sequenceName="variants_seq", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="variants_seq")
	private Long id;
	
	@Column(name="product_id")
	private Long product_id;
	
	@ManyToOne
	@JoinColumn(name = "product", referencedColumnName = "id")
	private Products product;
	
	@Column(name="quantity")
	private Integer quantity;
  
  @Column(name="sku")
	private String sku;
	
	@Column(name="status")
	private String status;
	
  @Column(name="color")
	private String color;
	
	@Column(name="size")
	private String size;
	
  @Column(name="material")
	private String material;
	
  public Variants(Products product, Long product_id, Integer quantity, String sku, String status, String color, String size, String material) {
        this.product = product;
        this.product_id = product_id;
        this.quantity = quantity;
        this.sku = sku;
        this.status = status;
        this.color = color;
        this.size = size;
        this.material = material;
  }
} 