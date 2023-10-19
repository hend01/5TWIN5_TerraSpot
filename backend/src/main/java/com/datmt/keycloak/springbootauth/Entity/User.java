package com.datmt.keycloak.springbootauth.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import java.io.Serializable;
import java.util.List;
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User implements Serializable {
    @Id
    // @GeneratedValue(strategy= GenerationType.IDENTITY)
    private String idUser;
    private String firstName;
    private String lastName;
    private String username;
    private String email;
    private String password;
    private String phonenumber;
    private boolean etat;
    private  boolean banned;

}