import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';

function AbsencesChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    const token = localStorage.getItem('token');

    axios
      .get('http://localhost:8080/admin/calculateAbsencesOverTime', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        const formattedData = response.data.map((item) => ({
          name: item.category,
          value: item.value
        }));
        setData(formattedData);
      })
      .catch((error) => {
        console.log('Error fetching data:', error);
      });
  };

  return (
    <div>
      <LineChart width={1000} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="blue" />
      </LineChart>
    </div>
  );
}

export default AbsencesChart;
