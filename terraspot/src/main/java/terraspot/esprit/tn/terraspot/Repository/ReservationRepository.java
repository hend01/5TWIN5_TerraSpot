package terraspot.esprit.tn.terraspot.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import terraspot.esprit.tn.terraspot.Entity.Reservation;

public interface ReservationRepository extends JpaRepository<Reservation,Long> {
}
