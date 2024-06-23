package com.example.demo.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import com.example.demo.entities.Client;
import com.example.demo.repositories.ClientRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Service
public class ClientService{
	@Autowired
	private ClientRepository clientRepository;


	public Long saveClient(String name, String email, Integer phone, String password){
    Client client = new Client(name, email, phone, password);
    clientRepository.save(client);
    return client.getId();
}
	public void deleteclient(Long id) {
    clientRepository.deleteById(id);
  }
    

}