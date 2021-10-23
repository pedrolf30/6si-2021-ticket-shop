package com.projetosistemas.vendaingressos.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_compra_ingresso")
public class PurchaseTicket {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id_compra_ingresso")
    private Long id;

    @ManyToOne(optional=false)
    @JoinColumn(name="id_compra")
    private Purchase purchase;

    @ManyToOne(optional=false)
    @JoinColumn(name="id_ingresso")
    private Ticket ticket;

    @Column(name = "quantidade", nullable = false)
    private Integer quantidade;
}
