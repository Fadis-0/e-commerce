package com.example.demo.repositories;

import com.example.demo.entities.Client;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface ClientRepository extends CrudRepository<Client, Long> {

    Client findByEmail(String email);


}