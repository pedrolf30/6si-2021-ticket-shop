package com.projetosistemas.vendaingressos.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Data
@Builder
@ToString
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "tb_roles")
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name="id_role")
    private Long id;

    @Column(name = "role", nullable = false)
    private String role;

    @Override
    public String toString() {
        return String.format("Role [id=%d, role=%s]", id, role);
    }
}
