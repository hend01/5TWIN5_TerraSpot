package terraspot.esprit.tn.terraspot.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import terraspot.esprit.tn.terraspot.Entity.Reservation;
import terraspot.esprit.tn.terraspot.Repository.ReservationRepository;
import terraspot.esprit.tn.terraspot.Service.IService;
import terraspot.esprit.tn.terraspot.Service.ReservationService;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/reservation")
public class ReservationController {
    @Autowired
    IService service;


    @PostMapping("/add")
    @ResponseBody
    public ResponseEntity<String> addReservation(@RequestBody Reservation reservation) {
        service.Create_Reservation(reservation);
        String message = "Reservation created ";
        return ResponseEntity.ok(message);
    }

    @DeleteMapping("/remove/{id}")
    @ResponseBody
    public ResponseEntity<String> removeReservation(@PathVariable("id") Long id) {
        service.remove_reservation(id);
        String message = "Reservation deleted";
        return ResponseEntity.ok(message);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<String> updateReservation(@PathVariable Long id, @RequestBody Reservation updatedReservation) {
        Reservation updated = service.update_reservation(id, updatedReservation);

        if (updated != null) {
            return ResponseEntity.status(HttpStatus.OK).body("");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Reservation with id:" + id + " not found");
        }
    }
    @GetMapping("/list")
    public List<Reservation> getAllReservations() {
        return service.getAllReservations();
    }
    @GetMapping("/find/{id}")
    public ResponseEntity<Reservation> findReservationById(@PathVariable Long id) {
        Reservation foundReservation = service.findById(id);

        if (foundReservation != null) {
            return ResponseEntity.ok(foundReservation);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
    @GetMapping("/findByDate/{date}")
    public ResponseEntity<List<Reservation>> findReservationsByDate(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date) {
        List<Reservation> reservations = service.findReservationsByDate(date);

        if (!reservations.isEmpty()) {
            return ResponseEntity.ok(reservations);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }


}
