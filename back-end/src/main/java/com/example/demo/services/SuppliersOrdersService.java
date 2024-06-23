package com.example.demo.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import java.lang.Iterable;
import java.time.LocalDateTime;

import com.example.demo.entities.SuppliersOrders;
import com.example.demo.repositories.SuppliersOrdersRepository;
import com.example.demo.entities.Suppliers;
import com.example.demo.repositories.SuppliersRepository;
import com.example.demo.entities.Products;
import com.example.demo.repositories.ProductsRepository;

import com.example.demo.entities.Variants;
import com.example.demo.repositories.VariantsRepository;

import com.example.demo.entities.Carrier;
import com.example.demo.repositories.CarrierRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Service
public class SuppliersOrdersService{
	@Autowired 
	private SuppliersOrdersRepository suppliersOrdersRepository;
    @Autowired
	private SuppliersRepository suppliersRepository;
  
  @Autowired
	private VariantsRepository variantsRepository;
  
  @Autowired
	private ProductsRepository productsRepository;

  
  
  @Autowired
	private CarrierRepository carrierRepository;

  
  public Iterable<SuppliersOrders> listSuppliersOrders(){
		Iterable<SuppliersOrders> suppliersOrders = suppliersOrdersRepository.findAll();
		return suppliersOrders;
	}
  
	public ResponseEntity<SuppliersOrders> saveSuppliersOrders(Integer idsup, String orderDate, String total_price, Float cost, String status, String departure, String destination, Long idpro){
    Optional<Suppliers> optionalSuppliers = suppliersRepository.findById((long)idsup);
		Suppliers suppliers = optionalSuppliers.get();
    
    Optional<Products> optionalProduct = productsRepository.findById((long)idpro);
		Products product = optionalProduct.get();

    
    
		
		
		SuppliersOrders suppliersOrders = new SuppliersOrders( suppliers, product, idsup, orderDate , total_price, cost, status, departure, destination);
		suppliersOrdersRepository.save(suppliersOrders);
		return ResponseEntity.status(HttpStatus.CREATED).body(suppliersOrders);
	}
	
	

public ResponseEntity<SuppliersOrders> updateStatus(Long id, String status) {
    SuppliersOrders order = suppliersOrdersRepository.findById(id).orElse(null);

    if (order != null) {
      order.setStatus(status);
      suppliersOrdersRepository.save(order);
    }

    return ResponseEntity.status(HttpStatus.CREATED).body(order);
  }
  
  
  public ResponseEntity<SuppliersOrders> updateTransfer(Long id, Long idcar, String departure, String destination, String method, String plan, String date, Long track, Float spcost) {
    SuppliersOrders order = suppliersOrdersRepository.findById(id).orElse(null);
    if (order != null) {
      order.setDeparture(departure);
      order.setIdcar(idcar);
      
      Optional<Carrier> optionalCarrier = carrierRepository.findById((long)idcar);
	  	Carrier carrier = optionalCarrier.get();
      order.setCarrier(carrier);
      
      order.setDestination(destination);
      order.setMethod(method);
      order.setPlan(plan);
      order.setDate(date);
      order.setTrack(track);
      order.setSpcost(spcost);
      suppliersOrdersRepository.save(order);
    }

    return ResponseEntity.status(HttpStatus.CREATED).body(order);
  }
  
  public ResponseEntity<SuppliersOrders> updateTransfer2(Long id, Long idcar, String departure, String destination, String method2, String plan2, String date2, Long track2, Float spcost2) {
    SuppliersOrders order = suppliersOrdersRepository.findById(id).orElse(null);
    if (order != null) {
      order.setDeparture2(departure);
      order.setIdcar2(idcar);
   
      Optional<Carrier> optionalCarrier = carrierRepository.findById((long)idcar);
	  	Carrier carrier = optionalCarrier.get();
      order.setCarrier2(carrier);
      
      order.setDestination2(destination);
      order.setMethod2(method2);
      order.setPlan2(plan2);
      order.setDate2(date2);
      order.setTrack2(track2);
      order.setSpcost2(spcost2);
      suppliersOrdersRepository.save(order);
    }

    return ResponseEntity.status(HttpStatus.CREATED).body(order);
  }

	
	
	public void deleteSuppliersOrders(Long id) {
        suppliersOrdersRepository.deleteById(id);
  }
	
}