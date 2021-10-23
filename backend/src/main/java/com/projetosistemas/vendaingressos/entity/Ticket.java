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
@Table(name = "tb_ingresso")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id_ingresso")
    private Long id;

    @ManyToOne(optional=false)
    @JoinColumn(name="id_organizador")
    private User organizer;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "data", nullable = false)
    private Date data;

    @Column(name = "horario", nullable = false)
    private Date horario;

    @Column(name = "endereco", nullable = false)
    private String endereco;

    @Column(name = "preco", nullable = false)
    private Double preco;

    @Column(name = "descricao", nullable = false)
    private String descricao;

    @Column(name = "qtd_ingressos", nullable = false)
    private Integer qtdIngressos;

    @Column(name = "status", nullable = false)
    private String status;

    @Column(name = "porcentagem_desconto")
    private Integer porcentagemDesconto;

    @Column(name = "foto_evento", nullable = false)
    private String fotoEvento;

    @Column(name = "categoria", nullable = false)
    private String categoria;

}
