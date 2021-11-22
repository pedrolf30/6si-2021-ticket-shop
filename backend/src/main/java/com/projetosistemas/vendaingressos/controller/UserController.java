package com.projetosistemas.vendaingressos.controller;

import com.projetosistemas.vendaingressos.model.Login;
import com.projetosistemas.vendaingressos.entity.User;
import com.projetosistemas.vendaingressos.exception.ResourceNotFoundException;
import com.projetosistemas.vendaingressos.security.MD5;
import com.projetosistemas.vendaingressos.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
@RequestMapping("/api/v1")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) throws ResourceNotFoundException {
        return userService.getUserById(id);
    }

    @PostMapping("/login")
    public ResponseEntity<User> authenticate(@RequestBody Login login) throws Exception {
        login.setSenha(MD5.encrypt(login.getSenha()));

        return userService.authenticate(login);
    }

    @PostMapping("/users")
    public ResponseEntity<User> createUser(@RequestBody User user) throws Exception {
        user.setSenha(MD5.encrypt(user.getSenha()));

        return userService.createUser(user);
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) throws Exception {
        user.setSenha(MD5.encrypt(user.getSenha()));

        return userService.updateUser(id, user);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) throws ResourceNotFoundException {
        return userService.deleteUser(id);
    }
}
