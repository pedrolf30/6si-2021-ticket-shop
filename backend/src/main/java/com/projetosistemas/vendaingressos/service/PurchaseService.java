package com.projetosistemas.vendaingressos.service;

import com.projetosistemas.vendaingressos.entity.Purchase;
import com.projetosistemas.vendaingressos.exception.ResourceNotFoundException;
import com.projetosistemas.vendaingressos.exception.ResourceNotSavedException;
import com.projetosistemas.vendaingressos.repository.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PurchaseService {

    @Autowired
    private PurchaseRepository purchaseRepository;

    public ResponseEntity<List<Purchase>> getPurchasesByUserId(Long userId) {
        List<Purchase> purchases = purchaseRepository.findByUserId(userId);

        return ResponseEntity.ok().body(purchases);
    }

    public ResponseEntity<Purchase> getPurchaseById(Long id) throws ResourceNotFoundException {
        Purchase purchase = verifyIfExists(id);

        return ResponseEntity.ok().body(purchase);
    }

    @Transactional
    public ResponseEntity<Purchase> createPurchase(Purchase purchase) throws ResourceNotSavedException {
        Purchase savedPurchase = purchaseRepository.save(purchase);

        if (savedPurchase == null)
            throw new ResourceNotSavedException(savedPurchase);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedPurchase);
    }

    private Purchase verifyIfExists(Long id) throws ResourceNotFoundException {
        return purchaseRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
    }

}
