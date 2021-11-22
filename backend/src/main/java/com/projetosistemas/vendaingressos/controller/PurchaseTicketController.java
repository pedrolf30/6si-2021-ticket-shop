package com.projetosistemas.vendaingressos.controller;

import com.projetosistemas.vendaingressos.entity.PurchaseTicket;
import com.projetosistemas.vendaingressos.exception.ResourceNotFoundException;
import com.projetosistemas.vendaingressos.exception.ResourceNotSavedException;
import com.projetosistemas.vendaingressos.service.PurchaseTicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class PurchaseTicketController {

    @Autowired
    private PurchaseTicketService purchaseTicketService;

    @GetMapping("/purchases/tickets/purchases/{id}")
    public ResponseEntity<List<PurchaseTicket>> getPurchaseTicketsByPurchaseId(@PathVariable Long id) {
        return purchaseTicketService.getPurchaseTicketsByPurchaseId(id);
    }

    @GetMapping("/purchases/tickets/purchasers/{id}")
    public ResponseEntity<List<PurchaseTicket>> getPurchaseTicketsByPurchaserId(@PathVariable Long id) {
        return purchaseTicketService.getPurchaseTicketsByPurchaserId(id);
    }

    @GetMapping("/purchases/tickets/sellers/{id}")
    public ResponseEntity<List<PurchaseTicket>> getPurchaseTicketsBySellerId(@PathVariable Long id) {
        return purchaseTicketService.getPurchaseTicketsBySellerId(id);
    }

    @GetMapping("/purchases/tickets/{id}")
    public ResponseEntity<PurchaseTicket> getPurchaseTicketById(@PathVariable Long id) throws ResourceNotFoundException {
        return purchaseTicketService.getPurchaseTicketById(id);
    }

    @PostMapping("/purchases/tickets")
    public ResponseEntity<PurchaseTicket> createPurchaseTicket(@RequestBody PurchaseTicket purchaseTicket) throws Exception {
        return purchaseTicketService.createPurchaseTicket(purchaseTicket);
    }

}
