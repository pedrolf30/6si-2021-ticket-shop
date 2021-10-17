package com.projetosistemas.vendaingressos.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NO_CONTENT)
public class ResourceNotSavedException extends Exception {

    private static final long serialVersionUID = 1L;

    public ResourceNotSavedException(Object resource) {
        super("Failed to save resource: " + resource.toString());
    }
}
