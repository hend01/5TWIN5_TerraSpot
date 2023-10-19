package terraspot.esprit.tn.terraspot.Service;

import terraspot.esprit.tn.terraspot.Entity.Reservation;

import java.util.List;

public interface IService {
    public List<Reservation> getAllReservations();
    public long Create_Reservation(Reservation reservation);
    public Reservation update_reservation(Long id, Reservation updatedReservation) ;
    public void remove_reservation(Long idReservation) ;
    public Reservation findById(Long id) ;
    }
