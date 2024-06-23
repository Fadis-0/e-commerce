package com.example.demo.entities;

import java.util.*;
import java.lang.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "announcement")
public class Announcement {
	
	@Id 
	@SequenceGenerator(name="announcement_seq", sequenceName="announcement_seq", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="announcement_seq")
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "product_id", referencedColumnName = "id")
	private Products product;

	@Column(name="idprd")
	private Integer idprd;
	
    @Column(name="title")
	private String title;

    @Column(name="image_ur")
	private String image_ur;

	
	public Announcement(Products product, Integer idprd ,String title,String image_ur ) {
		this.product = product;
		this.idprd = idprd;
		this.title = title;
		this.image_ur = image_ur;
	}
	
	// Getters and setters for all fields
}