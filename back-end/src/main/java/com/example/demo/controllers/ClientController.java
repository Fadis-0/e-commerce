	package com.example.demo.controllers;

	import com.example.demo.entities.Client;
	import com.example.demo.repositories.ClientRepository;
	import com.example.demo.services.ClientService;

import jakarta.servlet.http.HttpSession;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
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
	@RequestMapping("/client")
	@CrossOrigin
	public class ClientController {
		@Autowired
		private ClientRepository clientRepository;
		
		@Autowired
		private ClientService clientService;
		
		@GetMapping("/list")
		@ResponseBody
		public Iterable<Client> list(){
			Iterable<Client> client = clientRepository.findAll();
			return client;
		}


		@PostMapping("/add")
		public ResponseEntity<Map<String, Long>> formSubmit(@RequestParam String name, @RequestParam String email, @RequestParam Integer phone, @RequestParam String password) {
			Long clientId = clientService.saveClient(name, email, phone, password);
			Map<String, Long> response = new HashMap<>();
			response.put("id", clientId);
			return ResponseEntity.ok(response);
		}

	@DeleteMapping("/delete/{id}")
	public void deleteclient(@PathVariable Long id) {
		clientService.deleteclient(id);
	}
	@PostMapping("/login")
	public ResponseEntity<Object> login(@RequestParam String email, @RequestParam String password, HttpSession session) {
		Client client = clientRepository.findByEmail(email);
		if (client != null && client.getPassword().equals(password)) {
			session.setAttribute("clientId", client.getId());
			return ResponseEntity.ok(Map.of("client", client, "name", client.getName()));
			
		} else {
			return ResponseEntity.badRequest().body("Email ou mot de passe incorrect");
		}
	}
}
	