package com.example.demo.entities;

import java.util.*;
import java.lang.*;
import java.time.LocalDate;

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
@Table(name = "laivrason_type")	

public class LaivrasonType {
  
 
  
	// product class attributes
	@Id 
	@SequenceGenerator(name="laivrason_type_seq", sequenceName="laivrason_type_seq", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="laivrason_type_seq")
	private Long id;
    
    @Column(name="name")
	private String name;
	
    @Column(name="price")
	private Float price;

	


    public LaivrasonType (String name , Float price ) {
        this.name = name;
        this.price = price;
    }

} 