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
@Table(name = "adresse")

public class Adresse {
  
 
  
	// product class attributes
	@Id 
	@SequenceGenerator(name="adresse_seq", sequenceName="adresse_seq", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="adresse_seq")
	private Long id;
   
    @ManyToOne
	@JoinColumn(name = "client_id", referencedColumnName = "id")
	private Client client;

    @Column(name="idclt")
	private Integer idclt;
	
    @Column(name="first_name")
	private String first_name;

	@Column(name="name")
	private String name;
	

	@Column(name="addressclt")
	private String addressclt;
	
    @Column(name="code_Postal")
	private Integer code_Postal;

	@Column(name="phone")
	private Integer phone;
	

  public Adresse(Client client , Integer idclt ,String first_name, String name, String addressclt, Integer code_Postal, Integer phone) {
        this.client = client;
        this.idclt = idclt;
        this.first_name = first_name;
        this.name = name;
        this.addressclt = addressclt;
        this.code_Postal = code_Postal;
        this.phone = phone;
    }

	


} 