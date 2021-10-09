package com.projetosistemas.vendaingressos.repository;

import com.projetosistemas.vendaingressos.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {

    Optional<Role> findByIdOrRole(Long id, String role);

}
