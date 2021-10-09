package com.projetosistemas.vendaingressos.service;

import com.projetosistemas.vendaingressos.entity.Login;
import com.projetosistemas.vendaingressos.entity.Role;
import com.projetosistemas.vendaingressos.entity.User;
import com.projetosistemas.vendaingressos.exception.RoleNotFoundException;
import com.projetosistemas.vendaingressos.exception.UserAuthenticationFailedException;
import com.projetosistemas.vendaingressos.exception.UserNotFoundException;
import com.projetosistemas.vendaingressos.exception.UserNotSavedException;
import com.projetosistemas.vendaingressos.repository.RoleRepository;
import com.projetosistemas.vendaingressos.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

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

    public ResponseEntity<User> getUserById(Long id) throws UserNotFoundException {
        User user = verifyIfExists(id);

        return ResponseEntity.ok().body(user);
    }

    public ResponseEntity<User> createUser(User user) throws UserNotSavedException, RoleNotFoundException {
        user.setRole(verifyIfExists(user.getRole()));
        User savedUser = userRepository.save(user);

        if (savedUser == null)
            throw new UserNotSavedException(savedUser);

        return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
    }

    public ResponseEntity<User> updateUser(Long id, User user) throws Exception {
        verifyIfExists(id);
        user.setId(id);
        user.setRole(verifyIfExists(user.getRole()));

        User updatedUser = userRepository.save(user);

        if (updatedUser == null)
            throw new UserNotSavedException(updatedUser);

        return ResponseEntity.ok().body(updatedUser);
    }

    public ResponseEntity<String> deleteUser(Long id) throws UserNotFoundException {
        verifyIfExists(id);
        userRepository.deleteById(id);

        return ResponseEntity.status(HttpStatus.NO_CONTENT).body("User successfully deleted");
    }

    private User verifyLogin(Login login) throws UserAuthenticationFailedException {
        return userRepository.findByEmailAndSenha(login.getEmail(), login.getSenha())
                .orElseThrow(() -> new UserAuthenticationFailedException());
    }

    private User verifyIfExists(Long id) throws UserNotFoundException {
        return userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(id));
    }

    private Role verifyIfExists(Role role) throws RoleNotFoundException {
        return roleRepository.findByIdOrRole(role.getId(), role.getRole())
                .orElseThrow(() -> new RoleNotFoundException());
    }
}
