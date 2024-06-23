package com.example.demo.controllers;

import com.example.demo.entities.SuppliersOrders;
import com.example.demo.repositories.SuppliersOrdersRepository;
import com.example.demo.services.SuppliersOrdersService;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.time.LocalDateTime;
import java.time.Month;

import java.lang.Iterable;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
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
import java.util.Optional;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/suppliersOrders")
@CrossOrigin
public class SuppliersOrdersController {
    @Autowired
    private SuppliersOrdersRepository suppliersOrdersRepository;
    
    @Autowired
    private SuppliersOrdersService suppliersOrdersService;
    
    @GetMapping("/list")
    @ResponseBody
    public Iterable<SuppliersOrders> list(){
        Iterable<SuppliersOrders> suppliersOrders = suppliersOrdersRepository.findAll();
        return suppliersOrders;
    }
    
     @GetMapping("/list/{id}")
@ResponseBody
public SuppliersOrders getOrderById(@PathVariable Long id){
    Optional<SuppliersOrders> optionalOrder = suppliersOrdersRepository.findById(id);
    if(optionalOrder.isPresent()){
        return optionalOrder.get();
    }else {
        // handle case when product with given id does not exist
        throw new NoSuchElementException("Product with id " + id + " not found");
    }
}
    
  @PostMapping("/add")
  public void formSubmit(@RequestParam Integer idsup, @RequestParam String orderDate, @RequestParam String total_price, @RequestParam Float cost, @RequestParam String status, @RequestParam String departure, @RequestParam String destination, @RequestParam Long idpro) {
    suppliersOrdersService.saveSuppliersOrders(idsup, orderDate, total_price, cost, status, departure, destination, idpro);
  }


  @DeleteMapping("/delete/{id}")
  public void deleteSuppliersOrders(@PathVariable Long id) {
    suppliersOrdersService.deleteSuppliersOrders(id);
  }

  @PutMapping("/update")
	public void updateStatus(@RequestParam Long id, @RequestParam String status) {
	  suppliersOrdersService.updateStatus(id, status);
	}
	
	@PutMapping("/updateTransfer2")
	public void updateTransfer(@RequestParam Long id, @RequestParam Long idcar, @RequestParam String departure, @RequestParam String destination, @RequestParam String method2, @RequestParam String plan2, @RequestParam String date2, @RequestParam Long track2, @RequestParam Float spcost2) {
	  suppliersOrdersService.updateTransfer2(id, idcar, departure, destination, method2,  plan2, date2, track2, spcost2);
	}
	
	@PutMapping("/updateTransfer")
	public void updateTransfer2(@RequestParam Long id, @RequestParam Long idcar, @RequestParam String departure, @RequestParam String destination, @RequestParam String method, @RequestParam String plan, @RequestParam String date, @RequestParam Long track, @RequestParam Float spcost) {
	  suppliersOrdersService.updateTransfer(id, idcar, departure, destination, method, plan, date, track, spcost);
	}
	
	
}
