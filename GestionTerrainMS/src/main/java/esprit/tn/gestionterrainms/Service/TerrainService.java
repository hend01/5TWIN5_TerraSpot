package esprit.tn.gestionterrainms.Service;

import esprit.tn.gestionterrainms.Entity.Terrain;
import esprit.tn.gestionterrainms.TerrainRepository.ITerrainRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
@Slf4j

public class TerrainService implements ITerrainService {
    @Autowired
    ITerrainRepository terrainRepository;
    @Override
    public long Ajouter_Terrain(Terrain t) {
        terrainRepository.save(t);
        log.info("ajouter terrain");
        return t.getId();
    }

    public void removeTerrain(Long idTerrain) {
        terrainRepository.deleteById(idTerrain);

    }
    public Terrain updateTerrain(Long id, Terrain updatedTerrain) {
        Terrain existingTerrain = terrainRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Terrain avec l'ID " + id + " non trouvé"));

        existingTerrain.setNom(updatedTerrain.getNom());
        existingTerrain.setType(updatedTerrain.getType());
        existingTerrain.setEmplacement(updatedTerrain.getEmplacement());
        existingTerrain.setCapaciteSpectateurs(updatedTerrain.getCapaciteSpectateurs());
        existingTerrain.setEclairage(updatedTerrain.isEclairage());
        existingTerrain.setPrixLocation(updatedTerrain.getPrixLocation());

        return terrainRepository.save(existingTerrain);
    }
    public List<Terrain> getAllTerrains() {
        return terrainRepository.findAll();
    }


    public List<Terrain> getTerrainsByNom(String nom) {
        return terrainRepository.findByNom(nom);
    }

    public List<Terrain> getTerrainsByType(String type) {
        return terrainRepository.findByType(type);
    }
}
