package com.projetosistemas.vendaingressos.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.text.SimpleDateFormat;
import java.util.Date;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_usuario")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id_usuario")
    private Long id;

    @ManyToOne(optional=false)
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

    @Override
    public String toString() {
        SimpleDateFormat fmt = new SimpleDateFormat("dd/MM/yyyy");

        return String.format("Usuario [id=%d, nome=%s, cpfCnpj=%s, telefoneContato=%s"
                + ", fotoPerfil=%s, dataNascimento=%s, email=%s, senha=%s",
                id, nome, cpfCnpj, telefoneContato, fotoPerfil,
                fmt.format(dataNascimento), email, senha)
                + ", role=" + role.toString() + "]";
    }
}
