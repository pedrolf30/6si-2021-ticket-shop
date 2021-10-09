package com.projetosistemas.vendaingressos.exception;

import com.projetosistemas.vendaingressos.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NO_CONTENT)
public class UserNotSavedException extends Exception {

    private static final long serialVersionUID = 1L;

    public UserNotSavedException(User user) {
        super("Failed to save user: " + user.toString());
    }
}
