package com.datmt.keycloak.springbootauth.Repository;

import com.datmt.keycloak.springbootauth.Entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,String> {
}
