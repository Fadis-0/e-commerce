package com.example.demo.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import com.example.demo.entities.Orders;
import com.example.demo.entities.OrderLine;
import com.example.demo.entities.Products;
import com.example.demo.entities.Variants;

import com.example.demo.repositories.OrderRepository;
import com.example.demo.repositories.ProductsRepository;
import com.example.demo.repositories.OrderLineRepository;
import com.example.demo.repositories.VariantsRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Service
public class OrderLineService{
	@Autowired
	private OrderRepository orderRepository;
    @Autowired
    private OrderLineRepository orderLineRepository;
    @Autowired
    private ProductsRepository productsRepository;
    @Autowired
    private VariantsRepository variantsRepository;


    public ResponseEntity<OrderLine> orderLinesave(Integer idord, Integer idprd,Integer idvar, Integer quantity){
        Optional<Orders> optionalOrders = orderRepository.findById((long)idord);
        Orders orders = optionalOrders.get();
        Optional<Products> optionalProducts = productsRepository.findById((long)idprd);
        Products products = optionalProducts.get();
        Optional<Variants> optionalvariants = variantsRepository.findById((long)idvar);
        Variants variants = optionalvariants.get();
        Float price = (float) 300;
    
        if (quantity > variants.getQuantity()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
        variants.setQuantity(variants.getQuantity() - quantity);
        variantsRepository.save(variants);
        products.setQuantity(products.getQuantity() - quantity);
        productsRepository.save(products);
    
        OrderLine orderLine = new OrderLine(orders, idord, products, idprd,variants,idvar, quantity, price);
        orderLineRepository.save(orderLine);
        return ResponseEntity.status(HttpStatus.CREATED).body(orderLine);
    }
    

	
}
