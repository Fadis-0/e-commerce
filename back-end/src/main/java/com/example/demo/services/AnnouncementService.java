package com.example.demo.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;


import com.example.demo.entities.Announcement;
import com.example.demo.entities.Products;


import com.example.demo.repositories.AnnouncementRepository;
import com.example.demo.repositories.ProductsRepository;

import jakarta.websocket.Decoder.Text;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Service
public class AnnouncementService{

    @Autowired
    private AnnouncementRepository AnnouncementRepository;
    @Autowired
    private ProductsRepository productsRepository;


    public Iterable<Announcement> listAnnouncement(){
		Iterable<Announcement> announcement = AnnouncementRepository.findAll();
		return announcement;
	}

    public ResponseEntity<Announcement> Announcementsave(Integer idprd,String title, String image_ur){

        Optional<Products> optionalProducts = productsRepository.findById((long)idprd);
        Products products = optionalProducts.get();
		Announcement announcement = new Announcement(products, idprd, title, image_ur);
		AnnouncementRepository.save(announcement);
		return ResponseEntity.status(HttpStatus.CREATED).body(announcement);
	}
    public ResponseEntity<Announcement> updateAnnouncement(Long id, String title, String image_ur){
		Announcement announcement = AnnouncementRepository.findById(id).orElse(null);
    announcement.setTitle(title);
    announcement.setImage_ur(image_ur);
    
    AnnouncementRepository.save(announcement);
		return ResponseEntity.status(HttpStatus.CREATED).body(announcement);
	}
	
	
	public void deleteAnnouncement(Long id) {
        AnnouncementRepository.deleteById(id);
  }

	
}