package com.projetosistemas.vendaingressos.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_compra")
public class Purchase {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id_compra")
    private Long id;

    @ManyToOne(optional=false)
    @JoinColumn(name="id_usuario")
    private User user;

    @Column(name = "forma_pagamento", nullable = false)
    private String formaPagamento;

    @Column(name = "data_compra", nullable = false)
    private Date dataCompra;

    @Column(name = "valor_total", nullable = false)
    private Double valorTotal;

}
