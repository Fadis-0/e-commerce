package com.example.demo.controllers;

import com.example.demo.entities.Laivrason;
import com.example.demo.repositories.LaivrasonRepository;
import com.example.demo.services.LaivrasonService;

import java.util.List;
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
@RequestMapping("/laivrason")
@CrossOrigin

public class LaivrasonController {

    @Autowired
    private LaivrasonService laivrasonService;
    @Autowired
    private LaivrasonRepository laivrasonRepository;
    
    @GetMapping("/list")
	@ResponseBody
	public Iterable<Laivrason> list(){
		Iterable<Laivrason> laivrason = laivrasonRepository.findAll();
		return laivrason;
	}
    @PostMapping("/add")
    public void formSubmit(@RequestBody Laivrason laivrason) {
    laivrasonService.saveLaivrason(laivrason.getIdard(), laivrason.getIdord(), laivrason.getType(), laivrason.getName());
    }
    @DeleteMapping("/delete/{id}")
	public void deleteLaivrason(@PathVariable Long id) {
		laivrasonService.deleteLaivrason(id);
	}
}
