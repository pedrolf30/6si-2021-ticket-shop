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
@Table(name = "tb_usuario")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id_usuario")
    private Long id;

    @ManyToOne()
    @JoinColumn(name="id_role")
    private Role role;

    @Column(name = "nome", nullable = false)
    private String nome;

    @Column(name = "cpf_cpnj", nullable = false, unique = true)
    private String cpfCnpj;

    @Column(name = "telefone_contato", nullable = false)
    private String telefoneContato;

    @Column(name = "foto_perfil")
    private String fotoPerfil;

    @Column(name = "data_nascimento", nullable = false)
    private Date dataNascimento;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "senha", nullable = false)
    private String senha;
}
