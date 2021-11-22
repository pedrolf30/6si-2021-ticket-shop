package com.projetosistemas.vendaingressos.controller;

import com.projetosistemas.vendaingressos.entity.Ticket;
import com.projetosistemas.vendaingressos.exception.ResourceNotFoundException;
import com.projetosistemas.vendaingressos.exception.ResourceNotSavedException;
import com.projetosistemas.vendaingressos.service.TicketService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class TicketController {

    @Autowired
    private TicketService ticketService;

    @GetMapping("/tickets")
    public ResponseEntity<List<Ticket>> getTicketsAvailable() {
        return ticketService.getTicketsAvailable();
    }

    @GetMapping("/tickets/organizers/{id}")
    public ResponseEntity<List<Ticket>> getTicketsByOrganizerId(@PathVariable Long id) {
        return ticketService.getTicketsByOrganizerId(id);
    }

    @GetMapping("/tickets/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable Long id) throws ResourceNotFoundException {
        return ticketService.getTicketById(id);
    }

    @PostMapping("/tickets")
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticket) throws ResourceNotSavedException {
        return ticketService.createTicket(ticket);
    }

    @PutMapping("/tickets/{id}")
    public ResponseEntity<Ticket> updateTicket(@PathVariable Long id, @RequestBody Ticket ticket) throws Exception {
        return ticketService.updateTicket(id, ticket);
    }

    @DeleteMapping("/tickets/{id}")
    public ResponseEntity<String> deleteTicket(@PathVariable Long id) throws ResourceNotFoundException {
        return ticketService.deleteTicket(id);
    }
}
