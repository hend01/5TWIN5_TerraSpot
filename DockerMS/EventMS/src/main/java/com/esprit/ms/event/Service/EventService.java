package com.esprit.ms.event.Service;

import com.esprit.ms.event.Entity.Event;
import com.esprit.ms.event.EventNotFoundException;
import com.esprit.ms.event.Repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventService {
    @Autowired
    EventRepository eventRepository;

    public Event addEvent(Event event) {
        return eventRepository.save(event);
    }

    public Event getEventById(Long id) {
        return eventRepository.findById(id).orElse(null);
    }

    public List<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Event updateEvent(Long id, Event updatedEvent) {
        Event existingEvent = eventRepository.findById(id).orElseThrow(() -> new EventNotFoundException(id));

        existingEvent.setEventName(updatedEvent.getEventName());
        existingEvent.setDescription(updatedEvent.getDescription());
        existingEvent.setStartDate(updatedEvent.getStartDate());
        existingEvent.setEndDate(updatedEvent.getEndDate());
        existingEvent.setLocation(updatedEvent.getLocation());
        existingEvent.setSportType(updatedEvent.getSportType());
        existingEvent.setMaxParticipants(updatedEvent.getMaxParticipants());
        existingEvent.setRegistrationPrice(updatedEvent.getRegistrationPrice());

        return eventRepository.save(existingEvent);
    }

    public String deleteEvent(Long id) {
     if (eventRepository.findById(id).isPresent()) {
        eventRepository.deleteById(id);
        return "event deleted";
    } else
        return "event not found";
}

}
