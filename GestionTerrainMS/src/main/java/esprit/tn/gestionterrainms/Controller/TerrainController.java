package esprit.tn.gestionterrainms.Controller;

import esprit.tn.gestionterrainms.Entity.Terrain;
import esprit.tn.gestionterrainms.Service.ITerrainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/Terrain")
public class TerrainController {
    @Autowired
    ITerrainService terrainService;


    @PostMapping("/addTerrain")
    @ResponseBody
    public ResponseEntity<String> addTerrain(@RequestBody Terrain terrain) {
        terrainService.Ajouter_Terrain(terrain);
        String message = "Terrain ajouté avec succès";
        return ResponseEntity.ok(message);
    }

    @DeleteMapping("/removeTerrain/{idTerrain}")
    @ResponseBody
    public ResponseEntity<String> removeTerrain(@PathVariable("idTerrain") Long idTerrain) {
        terrainService.removeTerrain(idTerrain);
        String message = "Terrain supprimé avec succès";
        return ResponseEntity.ok(message);
    }

    @PutMapping("/updateTerrain/{id}")
    public ResponseEntity<String> updateTerrain(@PathVariable Long id, @RequestBody Terrain updatedTerrain) {
        Terrain updated = terrainService.updateTerrain(id, updatedTerrain);

        if (updated != null) {
            return ResponseEntity.status(HttpStatus.OK).body("Modification du terrain avec succès");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Terrain avec l'ID " + id + " non trouvé");
        }
    }
    @GetMapping("/listTerrains")
    public List<Terrain> getAllTerrains() {
        return terrainService.getAllTerrains();
    }
    @GetMapping("/terrains/nom")
    public ResponseEntity<List<Terrain>> getTerrainsByNom(
            @RequestParam(value = "nom") String nom
    ) {
        List<Terrain> terrains = terrainService.getTerrainsByNom(nom);
        return ResponseEntity.ok(terrains);
    }
    @GetMapping("/terrains/type")
    public ResponseEntity<List<Terrain>> getTerrainsByType(
            @RequestParam(value = "type") String type
    ) {
        List<Terrain> terrains = terrainService.getTerrainsByType(type);
        return ResponseEntity.ok(terrains);
    }
}
