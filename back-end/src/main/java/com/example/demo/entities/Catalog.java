package com.example.demo.entities;

import java.util.HashSet;
import java.util.Set;
import java.util.*;
import java.lang.*;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
@Table(name = "catalog")

public class Catalog {
  
 
  
	// product class attributes
	@Id
	@SequenceGenerator(name="catalog_seq", sequenceName="catalog_seq", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="catalog_seq")
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "supplier", referencedColumnName = "id")
	private Suppliers supplier;
	
	@Column(name="name")
	private String name;
	

	@Column(name="description")
	private String description;
	
	@Column(name="price")
	private Float price;
	
	@Column(name="brand")
	private String brand;
	
	@Column(name="active")
	private Boolean active;
	
	
	@Column(name="image_url")
	private String image_url;
	
	@Column(name="image_url2")
	private String image_url2;
	

@Column(name="sku")
private String sku;

@Column(name="barcode")
private String barcode;


  
  
  public Catalog (String name, String brand, Float price, String description, String image_url, String image_url2, String sku, String barcode, Suppliers supplier) {
        this.name = name;
        this.brand = brand;
        this.price = price;
        this.description = description;
        this.image_url = image_url;
        this.image_url2 = image_url2;
        this.sku = sku;
        this.barcode = barcode;
        this.supplier = supplier;
    }
    
    


} 