package com.projetosistemas.vendaingressos.repository;

import com.projetosistemas.vendaingressos.entity.PurchaseTicket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PurchaseTicketRepository extends JpaRepository<PurchaseTicket, Long> {

    List<PurchaseTicket> findByPurchaseId(Long purchaseId);

    List<PurchaseTicket> findByPurchaseUserId(Long userId);

    List<PurchaseTicket> findByTicketOrganizerId(Long organizerId);

}
