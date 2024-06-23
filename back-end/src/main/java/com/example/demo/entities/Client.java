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

import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;



@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "client")

public class Client {
  
 
  
	// product class attributes
	@Id 
	@SequenceGenerator(name="client_seq", sequenceName="client_seq", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="client_seq")
	private Long id;
	
	@Column(name="name")
	private String name;
	

	@Column(name="email")
	private String email;
	

	@Column(name="phone")
	private Integer phone;
	
    @Column(name = "password")
    private String password;

  
  public Client(String name, String email, Integer phone, String password) {
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.password = password;
    }

	


} 