package com.datmt.keycloak.springbootauth.http.requests;

import lombok.Data;

@Data
public class LoginRequest {

    String username;
    String password;
}
