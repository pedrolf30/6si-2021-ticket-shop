package com.projetosistemas.vendaingressos.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class UserAuthenticationFailedException extends Exception {

    private static final long serialVersionUID = 1L;

    public UserAuthenticationFailedException() {
        super("User authentication failed");
    }
}
