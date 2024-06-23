package com.example.demo.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "suppliers")
public class Suppliers {

    @Id
    @SequenceGenerator(name="suppliers_seq", sequenceName="suppliers_seq", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="suppliers_seq")
    private Long id;    
    
    @Column(name = "name")
    private String name;

    @Column(name = "address")
    private String address;

    @Column(name = "phone_number")
    private Integer phone_number;

    @Column(name = "email")
    private String email;

    public Suppliers(String name, String address, Integer phone_number,String email) {
        
        this.name = name;
        this.address = address;
        this.phone_number = phone_number;
        this.email = email;
    }

}