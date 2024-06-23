package com.example.demo.repositories;

import com.example.demo.entities.Announcement;


import org.springframework.data.repository.CrudRepository;

public interface AnnouncementRepository extends CrudRepository<Announcement, Long> {

}