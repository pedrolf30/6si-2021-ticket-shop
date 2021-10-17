package com.projetosistemas.vendaingressos.service;

import com.projetosistemas.vendaingressos.entity.Ticket;
import com.projetosistemas.vendaingressos.exception.ResourceNotFoundException;
import com.projetosistemas.vendaingressos.exception.ResourceNotSavedException;
import com.projetosistemas.vendaingressos.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    public ResponseEntity<List<Ticket>> listAll() {
        List<Ticket> tickets = ticketRepository.findAll();

        return ResponseEntity.ok().body(tickets);
    }

    public ResponseEntity<Ticket> getTicketById(Long id) throws ResourceNotFoundException {
        Ticket ticket = verifyIfExists(id);

        return ResponseEntity.ok().body(ticket);
    }

    public ResponseEntity<Ticket> createTicket(Ticket ticket) throws ResourceNotSavedException {
        Ticket savedTicket = ticketRepository.save(ticket);

        if (savedTicket == null)
            throw new ResourceNotSavedException(savedTicket);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedTicket);
    }

    public ResponseEntity<Ticket> updateTicket(Long id, Ticket ticket) throws Exception {
        verifyIfExists(id);
        ticket.setId(id);

        Ticket updatedTicket = ticketRepository.save(ticket);

        if (updatedTicket == null)
            throw new ResourceNotSavedException(updatedTicket);

        return ResponseEntity.ok().body(updatedTicket);
    }

    public ResponseEntity<String> deleteTicket(Long id) throws ResourceNotFoundException {
        verifyIfExists(id);
        ticketRepository.deleteById(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Ticket successfully deleted");
    }

    private Ticket verifyIfExists(Long id) throws ResourceNotFoundException {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
    }
}
