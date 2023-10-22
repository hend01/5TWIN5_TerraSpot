package com.datmt.keycloak.springbootauth.controller;


import com.datmt.keycloak.springbootauth.Entity.User;
import com.datmt.keycloak.springbootauth.config.KeycloakProvider;
import com.datmt.keycloak.springbootauth.http.requests.CreateUserRequest;
import com.datmt.keycloak.springbootauth.http.requests.LoginRequest;
import com.datmt.keycloak.springbootauth.service.KeycloakAdminClientService;
import org.keycloak.admin.client.Keycloak;
import org.keycloak.representations.AccessTokenResponse;
import org.keycloak.representations.idm.UserRepresentation;
import org.slf4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.security.RolesAllowed;
import javax.validation.constraints.NotNull;
import javax.ws.rs.BadRequestException;
import javax.ws.rs.NotFoundException;
import javax.ws.rs.core.Response;
import java.util.List;

@RestController
public class UserController {
    private final KeycloakAdminClientService kcAdminClient;

    private final KeycloakProvider kcProvider;

    private static final Logger LOG = org.slf4j.LoggerFactory.getLogger(UserController.class);


    public UserController(KeycloakAdminClientService kcAdminClient, KeycloakProvider kcProvider) {
        this.kcProvider = kcProvider;
        this.kcAdminClient = kcAdminClient;
    }


    @PostMapping(value = "/create")
    public ResponseEntity<?> createUser(@RequestBody CreateUserRequest user) {
        Response createdResponse = kcAdminClient.createKeycloakUser(user);
        kcAdminClient.SendSms(user.getPhonenumber(),"vous inscription a eté sauvgarder avec succes");


        return ResponseEntity.status(createdResponse.getStatus()).build();

    }


    @PostMapping("/login")
    public ResponseEntity<AccessTokenResponse> login(@NotNull @RequestBody LoginRequest loginRequest) {
        Keycloak keycloak = kcProvider.newKeycloakBuilderWithPasswordCredentials(loginRequest.getUsername(), loginRequest.getPassword()).build();

        AccessTokenResponse accessTokenResponse = null;
        try {
            accessTokenResponse = keycloak.tokenManager().getAccessToken();
            return ResponseEntity.status(HttpStatus.OK).body(accessTokenResponse);
        } catch (BadRequestException ex) {
            LOG.warn("invalid account. User probably hasn't verified email.", ex);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(accessTokenResponse);
        }

    }

    @GetMapping("/admin/getalluser")
    public ResponseEntity<List<UserRepresentation>> getAllUsers() {
        List<UserRepresentation> users = kcAdminClient.getAllUsers();
        return ResponseEntity.ok(users);
    }
    @RolesAllowed("admin")
    @DeleteMapping("/admin/delete/{userId}")
    public ResponseEntity<Void> deleteUser(@PathVariable("userId") String userId) {
        kcAdminClient.deleteKeycloakUser(userId);
        return ResponseEntity.noContent().build();
    }


    @RolesAllowed({"admin","user"})
    @PutMapping("/update/{userId}")
    public ResponseEntity<?> updateUser(@PathVariable("userId") String userId, @RequestBody CreateUserRequest user) {
        try {
            kcAdminClient.updateKeycloakUser(userId, user);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @PutMapping("/reset/{userId}")
    public ResponseEntity<?> forgetpassword(@PathVariable("userId") String userId,@RequestBody CreateUserRequest user) {
        try {
            kcAdminClient.forgetpassword(userId,user.getPassword());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @RolesAllowed("admin")
    @PutMapping("/banned/{userId}")
    public ResponseEntity<?> email(@PathVariable("userId") String userId,@RequestBody CreateUserRequest user ) {
        try {
            kcAdminClient.banned(userId,user.isBanned());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
    @PutMapping("/forget")
    public ResponseEntity<?> rest(@RequestBody CreateUserRequest user) {
        try {
            kcAdminClient.resetpassword(user.getId());
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @GetMapping("/get")
    public String getAllUserazes() {
        return "yui";
    }

    @GetMapping("/users")
    public List<User> aze() {
        return kcAdminClient.SQL();
    }

}
