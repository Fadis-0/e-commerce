package com.example.demo.controllers;

import com.example.demo.entities.OrderLine;
import com.example.demo.repositories.OrderLineRepository;
import com.example.demo.services.OrderLineService;

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
@RequestMapping("/orderLine")
@CrossOrigin

public class OrderLineController {

    @Autowired
    private OrderLineService orderLineService;
    @Autowired
    private OrderLineRepository orderLineRepository;
    
    @GetMapping("/list")
	@ResponseBody
	public Iterable<OrderLine> list(){
		Iterable<OrderLine> orderLine = orderLineRepository.findAll();
		return orderLine;
	}
    @PostMapping("/add")
    public void formSubmit(@RequestBody OrderLine orderLine) {
    orderLineService.orderLinesave(orderLine.getIdord(), orderLine.getIdprd(),orderLine.getIdvar(), orderLine.getQuantity());
    }
}
