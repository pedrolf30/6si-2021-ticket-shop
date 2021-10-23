package com.projetosistemas.vendaingressos.service;

import com.projetosistemas.vendaingressos.entity.PurchaseTicket;
import com.projetosistemas.vendaingressos.exception.ResourceNotFoundException;
import com.projetosistemas.vendaingressos.exception.ResourceNotSavedException;
import com.projetosistemas.vendaingressos.repository.PurchaseTicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class PurchaseTicketService {

    @Autowired
    private PurchaseTicketRepository purchaseTicketRepository;

    public ResponseEntity<List<PurchaseTicket>> getPurchaseTicketsByPurchaseId(Long userId) {
        List<PurchaseTicket> purchaseTickets = purchaseTicketRepository.findByPurchaseId(userId);

        return ResponseEntity.ok().body(purchaseTickets);
    }

    public ResponseEntity<List<PurchaseTicket>> getPurchaseTicketsByPurchaserId(Long purchaserId) {
        List<PurchaseTicket> purchaseTickets = purchaseTicketRepository.findByPurchaseUserId(purchaserId);

        return ResponseEntity.ok().body(purchaseTickets);
    }

    public ResponseEntity<List<PurchaseTicket>> getPurchaseTicketsBySellerId(Long sellerId) {
        List<PurchaseTicket> purchaseTickets = purchaseTicketRepository.findByTicketOrganizerId(sellerId);

        return ResponseEntity.ok().body(purchaseTickets);
    }

    public ResponseEntity<PurchaseTicket> getPurchaseTicketById(Long id) throws ResourceNotFoundException {
        PurchaseTicket purchaseTicket = verifyIfExists(id);

        return ResponseEntity.ok().body(purchaseTicket);
    }

    @Transactional
    public ResponseEntity<PurchaseTicket> createPurchaseTicket(PurchaseTicket purchaseTicket) throws ResourceNotSavedException {
        PurchaseTicket savedPurchaseTicket = purchaseTicketRepository.save(purchaseTicket);

        if (savedPurchaseTicket == null)
            throw new ResourceNotSavedException(savedPurchaseTicket);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedPurchaseTicket);
    }

    private PurchaseTicket verifyIfExists(Long id) throws ResourceNotFoundException {
        return purchaseTicketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
    }

}
