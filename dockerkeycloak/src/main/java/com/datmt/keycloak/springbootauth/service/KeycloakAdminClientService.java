package com.datmt.keycloak.springbootauth.service;

import com.datmt.keycloak.springbootauth.Entity.User;
import com.datmt.keycloak.springbootauth.Repository.UserRepository;
import com.datmt.keycloak.springbootauth.config.KeycloakProvider;
import com.datmt.keycloak.springbootauth.http.requests.CreateUserRequest;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import lombok.extern.slf4j.Slf4j;
import org.keycloak.admin.client.resource.*;
import org.keycloak.representations.idm.CredentialRepresentation;
import org.keycloak.representations.idm.UserRepresentation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import javax.ws.rs.core.Response;
import java.util.*;


@Service
@Slf4j
public class KeycloakAdminClientService {


    @Value("${app.TWILIO_AUTH_TOKEN}")
    private  String Service_TWILIO_AUTH_TOKEN;
    @Value("${app.WILIO_ACCOUNT_SID}")
    private  String Service_TWILIO_ACCOUNT_SID;


    @Autowired
    UserRepository userRepository;
    @Value("${keycloak.realm}")
    public String realm;

    private final KeycloakProvider kcProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;


    public KeycloakAdminClientService(KeycloakProvider keycloakProvider ) {
        this.kcProvider = keycloakProvider;
    }




    public Response createKeycloakUser(CreateUserRequest user) {
        UsersResource usersResource = kcProvider.getInstance().realm(realm).users();
        CredentialRepresentation credentialRepresentation = createPasswordCredentials(user.getPassword());
        // Check if user with the same email already exists
        List<UserRepresentation> existingUsersByEmail = usersResource.search(user.getEmail());
        if (!existingUsersByEmail.isEmpty()) {
            log.info("A user with this email already exists");
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("A user with this email address already exists.")
                    .build();
        }
        // Check if user with the same username already exists
        List<UserRepresentation> existingUsersByUsername = usersResource.search(user.getUsername());
        if (!existingUsersByUsername.isEmpty()) {
            log.info("A user with this username already exists");
            return Response.status(Response.Status.BAD_REQUEST)
                    .entity("A user with this username already exists.")
                    .build();
        }
        UserRepresentation kcUser = new UserRepresentation();
        kcUser.setUsername(user.getUsername());
        kcUser.setCredentials(Collections.singletonList(credentialRepresentation));
        kcUser.setFirstName(user.getFirstname());
        kcUser.setLastName(user.getLastname());
        kcUser.setEmail(user.getEmail());
        kcUser.setEnabled(true);
        kcUser.setEmailVerified(false);


        Response response = usersResource.create(kcUser);
        if (response.getStatus() == 201) {
            User localUser = new User();
            localUser.setFirstName(kcUser.getFirstName());
            localUser.setLastName(kcUser.getLastName());
            localUser.setUsername(kcUser.getUsername());
            localUser.setEmail(user.getEmail());
            String userId = response.getLocation().getPath().replaceAll(".*/([^/]+)$", "$1");
            localUser.setIdUser(userId);
            localUser.setPhonenumber(user.getPhonenumber());
            // Set password in localUser object
            List<CredentialRepresentation> credentials = kcUser.getCredentials();
            if (credentials != null && !credentials.isEmpty()) {
                CredentialRepresentation passwordCredential = credentials.get(0);
                if (passwordCredential.getType().equals(CredentialRepresentation.PASSWORD)) {
                    String password = passwordCredential.getValue();
                    localUser.setPassword(passwordEncoder.encode(password));
                }
            }
            userRepository.save(localUser);
        }
        return response;
    }

    /*
    public Response verifyEmail(String userId, String code) {
    UsersResource usersResource = kcProvider.getInstance().realm(realm).users();
    UserResource userResource = usersResource.get(userId);
    VerificationResource verificationResource = userResource.getVerification();
    Response response = verificationResource.verifyEmail(code);
    if (response.getStatus() == 204) {
        // Update user emailVerified attribute in local database
        User user = userRepository.findById(userId).orElse(null);
        if (user != null) {
            user.setEmailVerified(true);
            userRepository.save(user);
        }
    }
    return response;
}

     */




    private static CredentialRepresentation createPasswordCredentials(String password) {
        CredentialRepresentation passwordCredentials = new CredentialRepresentation();
        passwordCredentials.setTemporary(false);
        passwordCredentials.setType(CredentialRepresentation.PASSWORD);
        passwordCredentials.setValue(password);
        return passwordCredentials;
    }

    public List<UserRepresentation> getAllUsers() {
        RealmResource realmResource = kcProvider.getInstance().realm(realm);
        UsersResource usersResource = realmResource.users();
        List<UserRepresentation> users = usersResource.list();
        return users;
    }

    public void deleteKeycloakUser(String userId) {
        UsersResource usersResource = kcProvider.getInstance().realm(realm).users();
        usersResource.delete(userId);
        User user = userRepository.findById(userId).orElse(null);
        if (user!=null){
            log.info("user  found");
            userRepository.deleteById(userId);
        }
        log.info("user not found");
    }

    public void updateKeycloakUser(String userId, CreateUserRequest user) {
        UsersResource usersResource = kcProvider.getInstance().realm(realm).users();
        UserResource userResource = usersResource.get(userId);
        UserRepresentation kcUser = userResource.toRepresentation();
        CredentialRepresentation credential = new CredentialRepresentation();
        credential.setType(CredentialRepresentation.PASSWORD);
        credential.setValue(user.getPassword());
        kcUser.setUsername(user.getUsername());
        kcUser.setFirstName(user.getFirstname());
        kcUser.setLastName(user.getLastname());
        kcUser.setEmail(user.getEmail());
        userResource.update(kcUser);
        // Update user in MySQL database
        User userup = userRepository.findById(userId).orElse(null);
        userup.setFirstName(user.getFirstname());
        userup.setLastName(user.getLastname());
        userup.setEmail(user.getEmail());
        userup.setPassword(user.getPassword());
        userup.setPhonenumber(user.getPhonenumber());
        userRepository.save(userup);

    }
    public void banned(String email,boolean verfied) {
        UsersResource usersResource = kcProvider.getInstance().realm(realm).users();
        UserResource userResource = usersResource.get(email);
        UserRepresentation kcUser = userResource.toRepresentation();
        User userup = userRepository.findById(email).orElse(null);
        if (verfied==kcUser.isEmailVerified()){
            kcUser.setEnabled(!verfied);
            userup.setBanned(!verfied);
        }else {
            kcUser.setEnabled(!verfied);
            userup.setBanned(!verfied);
        }
        userResource.update(kcUser);
        System.out.println( kcUser.isEnabled());

        userRepository.save(userup);


    }
    public void resetpassword(String username) {
        UsersResource usersResource = kcProvider.getInstance().realm(realm).users();
        UserResource userResource = usersResource.get(username);
        UserRepresentation kcUser = userResource.toRepresentation();
        User userup = userRepository.findById(username).orElse(null);

        System.out.println(kcUser.getEmail());
        SendSms(userup.getPhonenumber(),"/reset/"+kcUser.getId());

    }
    public void forgetpassword(String username,String newPassword) {
        UsersResource usersResource = kcProvider.getInstance().realm(realm).users();
        User userup = userRepository.findById(username).orElse(null);
        UserResource userResource = usersResource.get(username);
        UserRepresentation kcUser = userResource.toRepresentation();
        System.out.println(kcUser.getEmail());
        CredentialRepresentation credential = new CredentialRepresentation();
        credential.setType(CredentialRepresentation.PASSWORD);
        // Reset the user's password in Keycloak
        credential.setValue(newPassword);
        userup.setPassword(newPassword);
        userResource.resetPassword(credential);
        userRepository.save(userup);


    }
    public  List<User> SQL() {

        List<User> userup = userRepository.findAll();

        return userup;


    }
    @Async
    public String SendSms(String Phone, String message){
        Twilio.init(Service_TWILIO_ACCOUNT_SID, Service_TWILIO_AUTH_TOKEN);
        Message.creator(new PhoneNumber(Phone),
                new PhoneNumber("+19145742867"), message).create();
        log.info("Sms Send");
        return "Message sent successfully";
    }






}
