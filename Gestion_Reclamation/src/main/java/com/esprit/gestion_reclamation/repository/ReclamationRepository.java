package com.esprit.gestion_reclamation.repository;

import com.esprit.gestion_reclamation.entites.Reclamation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReclamationRepository extends JpaRepository<Reclamation , Integer> {
}
