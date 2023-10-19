package terraspot.esprit.tn.terraspot.Service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.stereotype.Service;
import terraspot.esprit.tn.terraspot.Entity.Reservation;
import terraspot.esprit.tn.terraspot.Repository.ReservationRepository;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
public class ReservationService implements IService {
    @Autowired
    ReservationRepository repository;
    @Override
    public long Create_Reservation(Reservation reservation) {
        repository.save(reservation);
        log.info("ajouter ");
        return reservation.getId();
    }

    public void remove_reservation(Long idReservation) {
        repository.deleteById(idReservation);

    }
    public Reservation update_reservation(Long id, Reservation updatedReservation) {
        Reservation existingReservation = repository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Reservation with id : " + id + " not found"));

        existingReservation.setDate(updatedReservation.getDate());
        existingReservation.setHeure(updatedReservation.getHeure());
        existingReservation.setDescription(updatedReservation.getDescription());


        return repository.save(existingReservation);
    }
    public List<Reservation> getAllReservations() {
        return repository.findAll();
    }
    @Override
    public Reservation findById(Long id) {
        Optional<Reservation> optionalReservation = repository.findById(id);
        return optionalReservation.orElse(null);
    }



}
