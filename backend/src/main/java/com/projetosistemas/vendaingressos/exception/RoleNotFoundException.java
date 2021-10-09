package com.projetosistemas.vendaingressos.exception;

public class RoleNotFoundException extends Exception {

    private static final long serialVersionUID = 1L;

    public RoleNotFoundException() {
        super("Role not found");
    }
}
