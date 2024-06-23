package com.example.demo.controllers;

import com.example.demo.entities.Adresse;
import com.example.demo.repositories.AdresseRepository;
import com.example.demo.services.AdresseService;

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
@RequestMapping("/adresse")
@CrossOrigin

public class AdresseController {

    @Autowired
    private AdresseService adresseService;
    @Autowired
    private AdresseRepository adresseRepository;
    
    @GetMapping("/list")
	@ResponseBody
	public Iterable<Adresse> list(){
		Iterable<Adresse> adresse = adresseRepository.findAll();
		return adresse;
	}

    @PostMapping("/add")
    public ResponseEntity<Map<String, Long>> formSubmit(@RequestBody Adresse adresse) {
        Long adresseId = adresseService.saveAdresse(adresse.getIdclt(), adresse.getFirst_name(), adresse.getName(),adresse.getAddressclt(), adresse.getCode_Postal(), adresse.getPhone());
        Map<String, Long> response = new HashMap<>();
        response.put("id", adresseId);
        return ResponseEntity.ok(response);
    }
    @DeleteMapping("/delete/{id}")
	public void deleteAdresse(@PathVariable Long id) {
		adresseService.deleteAdresse(id);
	}
  
}