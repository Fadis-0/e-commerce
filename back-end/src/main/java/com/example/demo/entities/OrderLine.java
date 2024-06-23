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
@Table(name = "order_line")
public class OrderLine {
	
	@Id 
	@SequenceGenerator(name="order_line_seq", sequenceName="order_line_seq", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="order_line_seq")
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "order_id", referencedColumnName = "id")
	private Orders order;

	@Column(name="idord")
	private Integer idord;
	
	@ManyToOne
	@JoinColumn(name = "product_id", referencedColumnName = "id")
	private Products product;

	@Column(name="idprd")
	private Integer idprd;

	@ManyToOne
	@JoinColumn(name = "variant_id", referencedColumnName = "id")
	private Variants variants;

	@Column(name="idvar")
	private Integer idvar;
	
	@Column(name="quantity")
	private Integer quantity;
	
	@Column(name="price")
	private Float price;
	
	public OrderLine(Orders order,Integer idord, Products product, Integer idprd,Variants variants, Integer idvar, Integer quantity, Float price ) {
		this.order = order;
		this.idord = idord;
		this.product = product;
		this.idprd = idprd;
		this.variants = variants;
		this.idvar = idvar ;
		this.quantity = quantity;
		this.price = price;
	}
	
	// Getters and setters for all fields
}