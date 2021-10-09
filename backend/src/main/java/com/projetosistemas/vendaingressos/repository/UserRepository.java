package com.projetosistemas.vendaingressos.repository;

import com.projetosistemas.vendaingressos.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmailAndSenha(String email, String senha);
}
