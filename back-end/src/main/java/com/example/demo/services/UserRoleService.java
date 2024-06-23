package com.example.demo.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import com.example.demo.entities.UserRole;
import com.example.demo.repositories.UserRoleRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Service
public class UserRoleService{
	@Autowired
	private UserRoleRepository userRepository;


	public Long saveUser( String email, String role, String password){
        UserRole user = new UserRole( email, role, password);
        userRepository.save(user);
    return user.getId();
}
	public void deleteclient(Long id) {
        userRepository.deleteById(id);
  }
    

}