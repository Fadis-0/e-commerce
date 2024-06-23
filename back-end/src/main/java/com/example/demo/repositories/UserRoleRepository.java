package com.example.demo.repositories;

import com.example.demo.entities.UserRole;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

public interface UserRoleRepository extends CrudRepository<UserRole, Long> {

    UserRole findByEmail(String email);


}