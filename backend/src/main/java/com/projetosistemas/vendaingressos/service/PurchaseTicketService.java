package com.projetosistemas.vendaingressos.service;

import com.projetosistemas.vendaingressos.entity.PurchaseTicket;
import com.projetosistemas.vendaingressos.entity.Ticket;
import com.projetosistemas.vendaingressos.exception.ResourceNotFoundException;
import com.projetosistemas.vendaingressos.exception.ResourceNotSavedException;
import com.projetosistemas.vendaingressos.exception.TicketAmountNotAvailableException;
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

    @Autowired
    private TicketService ticketService;

    @Transactional
    public ResponseEntity<List<PurchaseTicket>> getPurchaseTicketsByPurchaseId(Long userId) {
        List<PurchaseTicket> purchaseTickets = purchaseTicketRepository.findByPurchaseId(userId);


        return ResponseEntity.ok().body(purchaseTickets);
    }

    @Transactional
    public ResponseEntity<List<PurchaseTicket>> getPurchaseTicketsByPurchaserId(Long purchaserId) {
        List<PurchaseTicket> purchaseTickets = purchaseTicketRepository.findByPurchaseUserId(purchaserId);

        return ResponseEntity.ok().body(purchaseTickets);
    }

    @Transactional
    public ResponseEntity<List<PurchaseTicket>> getPurchaseTicketsBySellerId(Long sellerId) {
        List<PurchaseTicket> purchaseTickets = purchaseTicketRepository.findByTicketOrganizerId(sellerId);

        return ResponseEntity.ok().body(purchaseTickets);
    }

    @Transactional
    public ResponseEntity<PurchaseTicket> getPurchaseTicketById(Long id) throws ResourceNotFoundException {
        PurchaseTicket purchaseTicket = verifyIfExists(id);

        return ResponseEntity.ok().body(purchaseTicket);
    }

    @Transactional
    public ResponseEntity<PurchaseTicket> createPurchaseTicket(PurchaseTicket purchaseTicket) throws Exception {
        purchaseTicket.getTicket().setQtdIngressos(purchaseTicket.getTicket().getQtdIngressos() - purchaseTicket.getQuantidade());

        if (purchaseTicket.getTicket().getQtdIngressos() >= 0)
            purchaseTicket.setTicket(ticketService.updateTicket(purchaseTicket.getTicket().getId(), purchaseTicket.getTicket()).getBody());
        else
            throw new TicketAmountNotAvailableException(purchaseTicket.getQuantidade());

        PurchaseTicket savedPurchaseTicket = purchaseTicketRepository.save(purchaseTicket);

        if (savedPurchaseTicket == null)
            throw new ResourceNotSavedException(savedPurchaseTicket);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedPurchaseTicket);
    }

    private List<PurchaseTicket> reloadTicketsStatus(List<PurchaseTicket> purchaseTickets) {
        for (int i = 0; i < purchaseTickets.size(); i++) {
            purchaseTickets.get(i).setTicket(ticketService.reloadTicketStatus(purchaseTickets.get(i).getTicket()));
        }

        return purchaseTickets;
    }

    private PurchaseTicket verifyIfExists(Long id) throws ResourceNotFoundException {
        return purchaseTicketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
    }

}
