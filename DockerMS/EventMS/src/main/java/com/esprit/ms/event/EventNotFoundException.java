package com.esprit.ms.event;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class EventNotFoundException extends RuntimeException{
    public EventNotFoundException(Long eventId) {
        super("Event not found with ID: " + eventId);
    }
}
