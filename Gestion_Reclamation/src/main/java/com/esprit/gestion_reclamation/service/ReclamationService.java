package com.esprit.gestion_reclamation.service;

import com.esprit.gestion_reclamation.entites.Reclamation;
import com.esprit.gestion_reclamation.repository.ReclamationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReclamationService {


    ReclamationRepository reclamationRepository ;

    @Autowired
    public ReclamationService(ReclamationRepository reclamationRepository) {
        this.reclamationRepository = reclamationRepository;
    }

    // Création ou mise à jour (Create)
    public Reclamation saveReclamation(Reclamation reclamation) {
        return reclamationRepository.save(reclamation);
    }

    // Lecture (Read)
    public List<Reclamation> getAllReclamations() {
        return reclamationRepository.findAll();
    }

    public Reclamation getReclamationById(int id) {
        return reclamationRepository.findById(id).orElse(null);
    }

    // Suppression (Delete)
    public void deleteReclamation(int id) {
        reclamationRepository.deleteById(id);
    }

    public Reclamation updateReclamation(int id, Reclamation updatedReclamation) {
        Reclamation existingReclamation = reclamationRepository.findById(id).orElse(null);
        if (existingReclamation != null) {
            existingReclamation.setSujet(updatedReclamation.getSujet());
            existingReclamation.setDescription(updatedReclamation.getDescription());
            existingReclamation.setEmail(updatedReclamation.getEmail());
            return reclamationRepository.save(existingReclamation);
        }
        return null;
    }

}
