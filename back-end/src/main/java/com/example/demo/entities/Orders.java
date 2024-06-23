package com.example.demo.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "orders")
public class Orders {

    @Id
    @SequenceGenerator(name="orders_seq", sequenceName="orders_seq", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="orders_seq")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "client_id", referencedColumnName = "id")
    private Client client;

    
    
    @Column(name = "order_date")
    private LocalDateTime orderDate;

    @Column(name = "total_price")
    private Float totalPrice;

    @Column(name = "status")
    private String status;

    @Column(name = "id2")
    private Integer id2;

    public Orders(Client client, LocalDateTime orderDate, Float totalPrice, String status,Integer id2) {
        
        this.client = client;
        this.orderDate = orderDate;
        this.totalPrice = totalPrice;
        this.status = status;
        this.id2 = id2;
    }

}