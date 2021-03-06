package com.projetosistemas.vendaingressos.repository;

import com.projetosistemas.vendaingressos.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
}
