package com.example.demo.controllers;

import com.example.demo.entities.Carrier;
import com.example.demo.repositories.CarrierRepository;
import com.example.demo.services.CarrierService;

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
@RequestMapping("/carrier")
@CrossOrigin
public class CarrierController {
    @Autowired
    private CarrierRepository carrierRepository;
    
    @Autowired
    private CarrierService carrierService;
    
    @GetMapping("/list")
    @ResponseBody
    public Iterable<Carrier> list(){
        Iterable<Carrier> carrier = carrierRepository.findAll();
        return carrier;
    }

    @PostMapping("/add")
  public void formSubmit(String name, String prenom, String address, Integer phone_number,String email) {
    carrierService.saveCarrier(name, address, phone_number, email);
  }

@DeleteMapping("/delete/{id}")
public void deleteCarrier(@PathVariable Long id) {
    carrierService.deleteCarrier(id);
}
}