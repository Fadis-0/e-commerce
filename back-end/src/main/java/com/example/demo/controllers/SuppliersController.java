package com.example.demo.controllers;

import com.example.demo.entities.Suppliers;
import com.example.demo.repositories.SuppliersRepository;
import com.example.demo.services.SuppliersService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
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
@RequestMapping("/suppliers")
@CrossOrigin
public class SuppliersController {
    @Autowired
    private SuppliersRepository suppliersRepository;
    
    @Autowired
    private SuppliersService suppliersService;
    
    @GetMapping("/list")
    @ResponseBody
    public Iterable<Suppliers> list(){
        Iterable<Suppliers> suppliers = suppliersRepository.findAll();
        return suppliers;
    }

    @PostMapping("/add")
  public void formSubmit(String name, String address, Integer phone_number,String email) {
    suppliersService.saveSuppliers(name, address, phone_number, email);
  }

@DeleteMapping("/delete/{id}")
public void deleteSuppliers(@PathVariable Long id) {
    suppliersService.deleteSuppliers(id);
}
}