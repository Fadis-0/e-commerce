package com.example.demo.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import com.example.demo.entities.Adresse;
import com.example.demo.entities.Orders;
import com.example.demo.entities.Laivrason;
import com.example.demo.repositories.AdresseRepository;
import com.example.demo.repositories.OrderRepository;
import com.example.demo.repositories.LaivrasonRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Service
public class LaivrasonService{
	@Autowired
	private AdresseRepository adresseRepository;
    @Autowired
    private LaivrasonRepository LaivrasonRepository;
    @Autowired
    private OrderRepository ordersRepository;


	public Long saveLaivrason( Integer idard , Integer idord, Integer type, String name){
        Optional<Adresse> optionalAdresse = adresseRepository.findById((long)idard);
		Adresse adresse = optionalAdresse.get();
        Optional<Orders> optionalOrders = ordersRepository.findById((long)idord);
		Orders orders = optionalOrders.get();
        Laivrason laivrason = new Laivrason(adresse ,idard ,orders,idord,type,name);
        LaivrasonRepository.save(laivrason);
    return laivrason.getId();
}
	public void deleteLaivrason(Long id) {
        LaivrasonRepository.deleteById(id);
  }
    

}