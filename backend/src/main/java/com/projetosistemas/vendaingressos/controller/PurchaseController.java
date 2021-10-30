package com.projetosistemas.vendaingressos.controller;

import com.projetosistemas.vendaingressos.entity.Purchase;
import com.projetosistemas.vendaingressos.exception.ResourceNotFoundException;
import com.projetosistemas.vendaingressos.exception.ResourceNotSavedException;
import com.projetosistemas.vendaingressos.service.PurchaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class PurchaseController {

    @Autowired
    private PurchaseService purchaseService;

    @GetMapping("/purchases/users/{id}")
    public ResponseEntity<List<Purchase>> getPurchasesByUserId(@PathVariable Long id) {
        return purchaseService.getPurchasesByUserId(id);
    }

    @GetMapping("/purchases/{id}")
    public ResponseEntity<Purchase> getPurchaseById(@PathVariable Long id) throws ResourceNotFoundException {
        return purchaseService.getPurchaseById(id);
    }

    @PostMapping("/purchases")
    public ResponseEntity<Purchase> createPurchase(@RequestBody Purchase purchase) throws ResourceNotSavedException {
        return purchaseService.createPurchase(purchase);
    }

}
