package com.example.backend.Entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.io.Serializable;
import java.time.LocalDate;

@javax.persistence.Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Test implements Serializable {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    Long numSkier;
    String firstName;
    String lastName;
    int number;
    String city;

}