import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box } from '@mui/system';
import { Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import moment from 'moment'; // Importez Moment.js

const EventDetail = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8088/events/${eventId}`);
        setEventDetails(response.data);
        setError('');
      } catch (error) {
        setError('Failed to fetch event details. Please try again later.');
        setIsLoading(false);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  const formatDate = (dateString) => {
    return moment(dateString).format('DD MMMM YYYY à HH:mm'); // Utilisez le format de date souhaité
  };

  if (error) {
    return <p>{error}</p>;
  }

  if (!eventDetails) {
    return <p>Loading...</p>;
  }
  const handleGoEventsList = () => {
    navigate(`/events-list`);
  };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleGoEventsList}>
        Go Back to Event List
      </Button>
      <Box sx={{ p: 2 }}>
        <Typography variant="h2" sx={{ color: '#E32845', marginBottom: '1rem' }}>
          Event Details
        </Typography>
        <Box sx={{ display: 'flex', gap: '2rem' }}>
          <Box sx={{ width: '50%' }}>
            <Box sx={{ marginBottom: '0.5rem' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                Name:
              </Typography>
              <Typography variant="body1" sx={{ color: '#666666' }}>
                {eventDetails.eventName}
              </Typography>
            </Box>
            <Box sx={{ marginBottom: '0.5rem' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                Description:
              </Typography>
              <Typography variant="body1" sx={{ color: '#666666' }}>
                {eventDetails.description}
              </Typography>
            </Box>
            <Box sx={{ marginBottom: '0.5rem' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                Location:
              </Typography>
              <Typography variant="body1" sx={{ color: '#666666' }}>
                {eventDetails.location}
              </Typography>
            </Box>
            <Box sx={{ marginBottom: '0.5rem' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                Type:
              </Typography>
              <Typography variant="body1" sx={{ color: '#666666' }}>
                {eventDetails.sportType}
              </Typography>
            </Box>
            <Box sx={{ marginBottom: '0.5rem' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                Start Date:
              </Typography>
              <Typography variant="body1" sx={{ color: '#666666' }}>
                {formatDate(eventDetails.startDate)}
              </Typography>
            </Box>
            <Box sx={{ marginBottom: '0.5rem' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                End Date:
              </Typography>
              <Typography variant="body1" sx={{ color: '#666666' }}>
                {formatDate(eventDetails.endDate)}
              </Typography>
            </Box>
            <Box sx={{ marginBottom: '0.5rem' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                Max Participants:
              </Typography>
              <Typography variant="body1" sx={{ color: '#666666' }}>
                {eventDetails.maxParticipants}
              </Typography>
            </Box>
            <Box sx={{ marginBottom: '0.5rem' }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#333333' }}>
                Registration Price:
              </Typography>
              <Typography variant="body1" sx={{ color: '#666666' }}>
                {eventDetails.registrationPrice}
              </Typography>
            </Box>

            {/* Display other event details as needed */}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default EventDetail;
