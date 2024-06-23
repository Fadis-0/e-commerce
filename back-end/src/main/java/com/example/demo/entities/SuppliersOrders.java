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
@Table(name = "suppliers_orders")
public class SuppliersOrders {

    @Id
    @SequenceGenerator(name="suppliers_orders_seq", sequenceName="suppliers_orders_seq", allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="suppliers_orders_seq")
    private Long id;    
    
  @ManyToOne
	@JoinColumn(name = "supplier_id", referencedColumnName = "id")
	private Suppliers suppliers;
	
	@ManyToOne
	@JoinColumn(name = "variant_id", referencedColumnName = "id")
	private Variants variant;
	
	@ManyToOne
	@JoinColumn(name = "carrier_id", referencedColumnName = "id")
	private Carrier carrier;
	
	@ManyToOne
	@JoinColumn(name = "carrier2_id", referencedColumnName = "id")
	private Carrier carrier2;
	
	@ManyToOne
	@JoinColumn(name = "product", referencedColumnName = "id")
	private Products product;

    @Column(name = "idsup")
    private Integer idsup;

    @Column(name = "idvar")
    private Long idvar;
    
    @Column(name = "idcar")
    private Long idcar;
    
    @Column(name = "idcar2")
    private Long idcar2;
    
    @Column(name = "order_date")
    private String orderDate;

    @Column(name = "cost")
    private Float cost;

    @Column(name = "total_price")
    private String total_price;
    
    @Column(name = "status")
    private String status;
    
    @Column(name = "departure")
    private String departure;
    
    @Column(name = "destination")
    private String destination;
    
    @Column(name = "departure2")
    private String departure2;

    @Column(name = "destination2")
    private String destination2;
    
    @Column(name = "method")
    private String method;
    
    @Column(name = "plan")
    private String plan;
    
    @Column(name = "sp_date")
    private String date;
    
    @Column(name = "track")
    private Long track;
    
    @Column(name = "sp_cost")
    private Float spcost;
    
    @Column(name = "method2")
    private String method2;

    
    @Column(name = "plan2")
    private String plan2;
    
    @Column(name = "sp_date2")
    private String date2;
    
    @Column(name = "track2")
    private Long track2;
    
    @Column(name = "sp_cost2")
    private Float spcost2;
    
    

    public SuppliersOrders(Suppliers suppliers, Products product, Integer idsup, String orderDate, String total_price, Float cost, String status, String departure, String destination) {
        this.suppliers = suppliers;
        this.variant = null;
        this.carrier = null;
        this.idsup = idsup;
        this.idvar = null;
        this.idcar = null;
        this.orderDate = orderDate;
        this.total_price = total_price;
        this.status = status;
        this.cost = cost;
        this.departure = departure;
        this.destination = destination;
        this.method = "";
        this.plan = "";
        this.date = "";
        this.track = null;
        this.spcost = null;
        
        this.product = product;
        
  
        
        this.departure2 = "";
        this.destination2 = "";
        this.method2 = "";
        this.plan2 = "";
        this.date2 = "";
        this.track2 = null;
        this.spcost2 = null;
    }

}