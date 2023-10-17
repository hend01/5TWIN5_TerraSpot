package com.esprit.ms.event;

import javax.persistence.*;
import java.sql.Date;


@Entity
public class Event {
    private static final long serialVersionUID = 795450928237931201L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    private String eventName;
    private String description;
    private Date startDate;
    private Date endDate;
    private String location;
    private String sportType;
    private int maxParticipants;
    private double registrationPrice;

    public Event() {
        super();
    }
    public Event(String eventName,String description,Date startDate,Date endDate,
                 String location,String sportType ,int maxParticipants,double registrationPrice) {
        super();
        this.eventName=eventName;
        this.description=description;
        this.startDate=startDate;
        this.endDate=endDate;
        this.maxParticipants=maxParticipants;
        this.location=location;
        this.sportType=sportType;
        this.registrationPrice=registrationPrice;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEventName() {
        return eventName;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getSportType() {
        return sportType;
    }

    public void setSportType(String sportType) {
        this.sportType = sportType;
    }

    public int getMaxParticipants() {
        return maxParticipants;
    }

    public void setMaxParticipants(int maxParticipants) {
        this.maxParticipants = maxParticipants;
    }

    public double getRegistrationPrice() {
        return registrationPrice;
    }

    public void setRegistrationPrice(double registrationPrice) {
        this.registrationPrice = registrationPrice;
    }
}
