package com.example.demo.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import com.example.demo.entities.Adresse;
import com.example.demo.entities.Client;
import com.example.demo.repositories.AdresseRepository;
import com.example.demo.repositories.ClientRepository;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Service
public class AdresseService{
	@Autowired
	private AdresseRepository adresseRepository;
    @Autowired
    private ClientRepository clientRepository;


	public Long saveAdresse(Integer idclt ,String first_name, String name, String addressclt, Integer code_Postal, Integer phone){
        Optional<Client> optionalClient = clientRepository.findById((long)idclt);
		Client client = optionalClient.get();
        Adresse adresse = new Adresse(client , idclt ,first_name,name,addressclt,code_Postal,phone);
        adresseRepository.save(adresse);
    return adresse.getId();
}
	public void deleteAdresse(Long id) {
        adresseRepository.deleteById(id);
  }
    

}