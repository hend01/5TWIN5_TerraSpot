package com.datmt.keycloak.springbootauth.http.requests;

import lombok.Data;



@Data
public class CreateUserRequest {
    String id;
    String username;
    String password;
    String email;
    String firstname;
    String lastname;
    String phonenumber;
    boolean banned;




}
