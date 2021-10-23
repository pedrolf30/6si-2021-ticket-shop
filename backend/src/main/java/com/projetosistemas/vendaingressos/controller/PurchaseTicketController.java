package com.projetosistemas.vendaingressos.controller;

import com.projetosistemas.vendaingressos.entity.PurchaseTicket;
import com.projetosistemas.vendaingressos.exception.ResourceNotFoundException;
import com.projetosistemas.vendaingressos.exception.ResourceNotSavedException;
import com.projetosistemas.vendaingressos.service.PurchaseTicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class PurchaseTicketController {

    @Autowired
    private PurchaseTicketService purchaseTicketService;

    @GetMapping("/purchases/tickets/purchases/{id}")
    public ResponseEntity<List<PurchaseTicket>> getPurchaseTicketsByPurchaseId(@PathVariable Long purchaseId) {
        return purchaseTicketService.getPurchaseTicketsByPurchaseId(purchaseId);
    }

    @GetMapping("/purchases/tickets/users/{id}")
    public ResponseEntity<List<PurchaseTicket>> getPurchaseTicketsByPurchaserId(@PathVariable Long purchaserId) {
        return purchaseTicketService.getPurchaseTicketsByPurchaserId(purchaserId);
    }

    @GetMapping("/purchases/tickets/users/{id}")
    public ResponseEntity<List<PurchaseTicket>> getPurchaseTicketsBySellerId(@PathVariable Long sellerId) {
        return purchaseTicketService.getPurchaseTicketsBySellerId(sellerId);
    }

    @GetMapping("/purchases/tickets/{id}")
    public ResponseEntity<PurchaseTicket> getPurchaseTicketById(@PathVariable Long id) throws ResourceNotFoundException {
        return purchaseTicketService.getPurchaseTicketById(id);
    }

    @PostMapping("/purchases/tickets")
    public ResponseEntity<PurchaseTicket> createPurchaseTicket(@RequestBody PurchaseTicket purchaseTicket) throws ResourceNotSavedException {
        return purchaseTicketService.createPurchaseTicket(purchaseTicket);
    }

}
