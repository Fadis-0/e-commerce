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
@Table(name = "laivrason")	

public class Laivrason {
  
 
  
	// product class attributes
	@Id 
	@SequenceGenerator(name="laivrason_seq", sequenceName="laivrason_seq", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="laivrason_seq")
	private Long id;
   
    @ManyToOne
	@JoinColumn(name = "adresse_id", referencedColumnName = "id")
	private Adresse adresse;
    
    @Column(name="idard")
	private Integer idard;

    @ManyToOne
	@JoinColumn(name = "orders_id", referencedColumnName = "id")
	private Orders orders;

    @Column(name="idord")
	private Integer idord;
	
    @Column(name="type")
	private Integer type;

	@Column(name="name")
	private String name;
	

  public Laivrason (Adresse adresse , Integer idard ,Orders orders, Integer idord, Integer type, String name) {
        this.adresse = adresse;
        this.idard = idard;
        this.orders = orders;
        this.idord = idord;
        this.type = type;
        this.name = name;
    }

	


} 
