package com.projetosistemas.vendaingressos.service;

import com.projetosistemas.vendaingressos.entity.Role;
import com.projetosistemas.vendaingressos.repository.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public ResponseEntity<List<Role>> listAll() {
        List<Role> roles = roleRepository.findAll();

        return ResponseEntity.ok().body(roles);
    }

}
