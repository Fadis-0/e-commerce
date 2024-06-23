package com.example.demo.controllers;

import com.example.demo.entities.Announcement;
import com.example.demo.repositories.AnnouncementRepository;
import com.example.demo.services.AnnouncementService;

import java.util.List;
import java.lang.Iterable;

import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
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


@RestController
@RequestMapping("/announcement")
@CrossOrigin
public class AnnouncementController {
	@Autowired
	private AnnouncementRepository announcementRepository;
	
	@Autowired
	private AnnouncementService announcementService;
  
  @GetMapping("/list")
  @ResponseBody
  public Iterable<Announcement> list() {
    return announcementService.listAnnouncement();
  }
	
	@PostMapping("/add")
  public void formSubmit(@RequestParam String title, @RequestParam String image_ur ,@RequestParam Integer idprd) {
    announcementService.Announcementsave(idprd,title, image_ur);
  }
  
  @PutMapping("/update")
  public void formUpdate(@RequestParam Long id,  @RequestParam String title, @RequestParam String image_ur) {
    announcementService.updateAnnouncement(id, title, image_ur);
  }

  @DeleteMapping("/delete/{id}")
  public void deleteAnnouncement(@PathVariable Long id) {
    announcementService.deleteAnnouncement(id);
  }
	
	

  
  

	
}
