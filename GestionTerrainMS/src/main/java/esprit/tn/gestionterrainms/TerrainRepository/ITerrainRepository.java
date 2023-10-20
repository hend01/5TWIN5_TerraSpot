package esprit.tn.gestionterrainms.TerrainRepository;

import esprit.tn.gestionterrainms.Entity.Terrain;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ITerrainRepository extends JpaRepository<Terrain,Long> {
    List<Terrain> findByNomAndType(String nom, String type);

    List<Terrain> findByNom(String nom);

    List<Terrain> findByType(String type);
}
