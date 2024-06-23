package com.example.demo.controllers;

import com.example.demo.entities.UserRole;
import com.example.demo.repositories.UserRoleRepository;
import com.example.demo.services.UserRoleService;

import jakarta.servlet.http.HttpSession;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.time.LocalDate;
import java.time.Month;

import java.lang.Iterable;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;


@RestController
@RequestMapping("/userRole")
@CrossOrigin
public class UserRoleController {
    @Autowired
    private UserRoleRepository userRepository;
    
    @Autowired
    private UserRoleService userService;
    
    @GetMapping("/list")
    @ResponseBody
    public Iterable<UserRole> list(){
        Iterable<UserRole> user = userRepository.findAll();
        return user;
    }


    @PostMapping("/add")
    public ResponseEntity<Map<String, Long>> formSubmit( @RequestParam String email, @RequestParam String role, @RequestParam String password) {
        Long userId = userService.saveUser( email, role, password);
        Map<String, Long> response = new HashMap<>();
        response.put("id", userId);
        return ResponseEntity.ok(response);
    }

@DeleteMapping("/delete/{id}")
public void deleteclient(@PathVariable Long id) {
    userService.deleteclient(id);
}
@PostMapping("/login")
public ResponseEntity<Object> login(@RequestParam String email, @RequestParam String password, HttpSession session) {
    UserRole user = userRepository.findByEmail(email);
    if (user != null && user.getPassword().equals(password) ) {
        session.setAttribute("userid", user.getId());
        return ResponseEntity.ok(Map.of("user", user, "role", user.getRole()));
        
    } else {
        return ResponseEntity.badRequest().body("Email déjà existant");
    }
}


}
