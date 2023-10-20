package esprit.tn.gestionterrainms.Service;

import esprit.tn.gestionterrainms.Entity.Terrain;

import java.util.List;

public interface ITerrainService {
    public long Ajouter_Terrain(Terrain t) ;
    public void removeTerrain(Long idTerrain) ;
    public Terrain updateTerrain(Long id, Terrain updatedTerrain) ;

    public List<Terrain> getAllTerrains() ;
    public List<Terrain> getTerrainsByNom(String nom) ;
    public List<Terrain> getTerrainsByType(String type) ;
}
