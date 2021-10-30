package com.projetosistemas.vendaingressos.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class TicketAmountNotAvailableException  extends Exception {

    private static final long serialVersionUID = 1L;

    public TicketAmountNotAvailableException(Integer amount) {
        super("Ticket amount not available for purchase: " + amount);
    }
}
