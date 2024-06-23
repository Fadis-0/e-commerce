
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
@Table(name = "user_role")

public class UserRole {
  
 
  
	// product class attributes
	@Id 
	@SequenceGenerator(name="user_role_seq", sequenceName="user_role_seq", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="user_role_seq")
	private Long id;
	

	

	@Column(name="email")
	private String email;
	

	@Column(name="role")
	private String role;
	
    @Column(name = "password")
    private String password;

  
  public UserRole( String email, String role, String password) {
        this.email = email;
        this.role = role;
        this.password = password;
    }

	


} 