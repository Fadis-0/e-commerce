package com.example.demo.entities;

import com.example.demo.entities.Tags;

import java.util.HashSet;
import java.util.Set;
import java.util.*;
import java.lang.*;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Column;
import jakarta.persistence.Id;

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;



@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "products")

public class Products {
  
 
  
	// product class attributes
	@Id
	@SequenceGenerator(name="products_seq", sequenceName="products_seq", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="products_seq")
	private Long id;
	
	@Column(name="name")
	private String name;
	
	@ManyToOne
	@JoinColumn(name = "supplier", referencedColumnName = "id")
	private Suppliers supplier;
	
	@ManyToOne
	@JoinColumn(name = "catalog", referencedColumnName = "id")
	private Catalog catalog;

	@Column(name="description")
	private String description;
	

	@Column(name="category")
	private String category;
	
	
	@Column(name="price")
	private Float price;
  
  
	@Column(name="quantity")
	private Integer quantity;
	
	
	@Column(name="brand")
	private String brand;

	@Column(name="stars")
    private Integer stars;
	
	@Column(name="active")
	private Boolean active;
	
	
	@Column(name="image_url")
	private String image_url;
	
	@Column(name="image_url2")
	private String image_url2;
  
  @Column(name="tags")
  private String tags;
  
  @Column(name="compare_price")
private Float comparePrice;

@Column(name="type")
private String type;

@Column(name="margin")
private Float margin;

@Column(name="sku")
private String sku;

@Column(name="barcode")
private String barcode;

@Column(name="status")
private String status;

  
  
  public Products (String name, String brand, String category,Integer stars, Float price, Integer quantity, String description, String image_url, String image_url2, String tags, Float comparePrice, String type, Float margin, String sku, String barcode, String status) {
        this.name = name;
        this.brand = brand;
        this.category = category;
		this.stars = stars;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
        this.image_url = image_url;
        this.image_url2 = image_url2;
        this.tags = tags;
        this.comparePrice = comparePrice;
        this.type = type;
        this.margin = margin;
        this.sku = sku;
        this.barcode = barcode;
        this.status = status;
        this.active = false;
        this.supplier = null;
        this.catalog = null;
    }
    
    


} 