package com.projetosistemas.vendaingressos.repository;

import com.projetosistemas.vendaingressos.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, Long> {

    List<Ticket> findByOrganizerId(Long organizerId);

    List<Ticket> findByQtdIngressosGreaterThanAndDataGreaterThanEqual(Integer qtdIngressos, Date data);

}
