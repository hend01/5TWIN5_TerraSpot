package terraspot.esprit.tn.terraspot.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import terraspot.esprit.tn.terraspot.Entity.Reservation;

import java.time.LocalDate;
import java.util.List;

public interface ReservationRepository extends JpaRepository<Reservation,Long> {
    @Query("SELECT r FROM Reservation r WHERE r.date = :date")
    List<Reservation> findByDate(@Param("date") LocalDate date);
}
