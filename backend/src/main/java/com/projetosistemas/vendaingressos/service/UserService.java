package com.projetosistemas.vendaingressos.service;

import com.projetosistemas.vendaingressos.model.Login;
import com.projetosistemas.vendaingressos.entity.Role;
import com.projetosistemas.vendaingressos.entity.User;
import com.projetosistemas.vendaingressos.exception.UserAuthenticationFailedException;
import com.projetosistemas.vendaingressos.exception.ResourceNotFoundException;
import com.projetosistemas.vendaingressos.exception.ResourceNotSavedException;
import com.projetosistemas.vendaingressos.repository.RoleRepository;
import com.projetosistemas.vendaingressos.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public ResponseEntity<User> authenticate(Login login) throws UserAuthenticationFailedException {
        User user = verifyLogin(login);

        return ResponseEntity.ok().body(user);
    }

    public ResponseEntity<User> getUserById(Long id) throws ResourceNotFoundException {
        User user = verifyIfExists(id);

        return ResponseEntity.ok().body(user);
    }

    @Transactional
    public ResponseEntity<User> createUser(User user) throws ResourceNotSavedException {
        createRoles();
        User savedUser = userRepository.save(user);

        if (savedUser == null)
            throw new ResourceNotSavedException(savedUser);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    @Transactional
    public ResponseEntity<User> updateUser(Long id, User user) throws Exception {
        createRoles();
        verifyIfExists(id);
        user.setId(id);

        User updatedUser = userRepository.save(user);

        if (updatedUser == null)
            throw new ResourceNotSavedException(updatedUser);

        return ResponseEntity.ok().body(updatedUser);
    }

    @Transactional
    public ResponseEntity<String> deleteUser(Long id) throws ResourceNotFoundException {
        verifyIfExists(id);
        userRepository.deleteById(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("User successfully deleted");
    }

    private User verifyLogin(Login login) throws UserAuthenticationFailedException {
        return userRepository.findByEmailAndSenha(login.getEmail(), login.getSenha())
                .orElseThrow(() -> new UserAuthenticationFailedException());
    }

    private User verifyIfExists(Long id) throws ResourceNotFoundException {
        return userRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException(id));
    }

    public void createRoles() {
        roleRepository.save(new Role(1L, "Vendedor"));
        roleRepository.save(new Role(2L, "Comprador"));
    }
}
