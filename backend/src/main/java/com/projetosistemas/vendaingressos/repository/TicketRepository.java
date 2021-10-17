package com.projetosistemas.vendaingressos.repository;

import com.projetosistemas.vendaingressos.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {
}
