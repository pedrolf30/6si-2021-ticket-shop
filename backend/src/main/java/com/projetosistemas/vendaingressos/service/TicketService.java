package com.projetosistemas.vendaingressos.service;

import com.projetosistemas.vendaingressos.entity.Ticket;
import com.projetosistemas.vendaingressos.exception.ResourceNotFoundException;
import com.projetosistemas.vendaingressos.exception.ResourceNotSavedException;
import com.projetosistemas.vendaingressos.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    public ResponseEntity<List<Ticket>> getTicketsAvailable() {
        List<Ticket> tickets = ticketRepository.findByQtdIngressosGreaterThanAndDataGreaterThanEqual(0, new Date());

        return ResponseEntity.ok().body(tickets);
    }

    @Transactional
    public ResponseEntity<List<Ticket>> getTicketsByOrganizerId(Long organizerId) {
        List<Ticket> tickets = ticketRepository.findByOrganizerId(organizerId);

        return ResponseEntity.ok().body(reloadTicketsStatus(tickets));
    }

    @Transactional
    public ResponseEntity<Ticket> getTicketById(Long id) throws ResourceNotFoundException {
        Ticket ticket = this.reloadTicketStatus(verifyIfExists(id));

        return ResponseEntity.ok().body(ticket);
    }

    @Transactional
    public ResponseEntity<Ticket> createTicket(Ticket ticket) throws ResourceNotSavedException {
        Ticket savedTicket = ticketRepository.save(checkStatus(ticket));

        if (savedTicket == null)
            throw new ResourceNotSavedException(savedTicket);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedTicket);
    }

    @Transactional
    public ResponseEntity<Ticket> updateTicket(Long id, Ticket ticket) throws Exception {
        verifyIfExists(id);
        ticket.setId(id);

        Ticket updatedTicket = ticketRepository.save(checkStatus(ticket));

        if (updatedTicket == null)
            throw new ResourceNotSavedException(updatedTicket);

        return ResponseEntity.ok().body(updatedTicket);
    }

    @Transactional
    public ResponseEntity<String> deleteTicket(Long id) throws ResourceNotFoundException {
        verifyIfExists(id);
        ticketRepository.deleteById(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("Ticket successfully deleted");
    }

    public Ticket reloadTicketStatus(Ticket ticket) {
        try {
            String statusBefore = ticket.getStatus(); Integer qtdIngressosBefore = ticket.getQtdIngressos();
            Ticket ticketToReload = checkStatus(ticket);

            if (!ticketToReload.getStatus().equals(statusBefore) ||
                    !ticketToReload.getQtdIngressos().equals(qtdIngressosBefore)) {
                ticket = ticketRepository.save(ticketToReload);

                if (ticketToReload == null)
                    throw new ResourceNotSavedException(ticketToReload);
            }
        } catch(Exception e) {
            e.printStackTrace();
        } finally {
            return ticket;
        }
    }

    private List<Ticket> reloadTicketsStatus(List<Ticket> ticketsToReloadStatus) {
        for (int i = 0; i < ticketsToReloadStatus.size(); i++) {
            ticketsToReloadStatus.set(i, reloadTicketStatus(ticketsToReloadStatus.get(i)));
        }

        return ticketsToReloadStatus;
    }

    private Ticket checkStatus(Ticket ticket) {
        ticket.setData(formatTicketDate(ticket));

        if (ticket.getQtdIngressos() < 0) {
            ticket.setQtdIngressos(0);
        }

        if (ticket.getData().before(new Date())) {
            ticket.setStatus("INDISPONÍVEL");
        } else if (ticket.getQtdIngressos().equals(0)) {
            ticket.setStatus("ESGOTADO");
        } else {
            ticket.setStatus("DISPONÍVEL");
        }

        return ticket;
    }

    private Date formatTicketDate(Ticket ticket) {
        SimpleDateFormat timeFormatter = new SimpleDateFormat("HH:mm:ss");
        Date ticketDate = ticket.getData();

        try {
            if (!timeFormatter.format(ticketDate).equals(ticket.getHorario())) {
                ticketDate.setTime(ticket.getData().getTime() + timeFormatter.parse(ticket.getHorario()).getTime());
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return ticketDate;
    }

    private Ticket verifyIfExists(Long id) throws ResourceNotFoundException {
        return ticketRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
    }

}
