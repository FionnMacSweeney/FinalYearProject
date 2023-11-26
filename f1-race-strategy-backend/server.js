 
const express = require('express');
const axios = require('axios');
const app = express();

// Enable CORS for client-side
const cors = require('cors');
app.use(cors());

// In your Express server file (e.g., server.js)

app.get('/api/teams/:constructorId/drivers', async (req, res) => {
  const constructorId = req.params.constructorId;
  try {
    const response = await axios.get(`http://ergast.com/api/f1/2023/constructors/${constructorId}/drivers.json`);
    const drivers = response.data.MRData.DriverTable.Drivers;
    res.json(drivers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching drivers', error: error });
  }
});



// Route to get constructor (team) information
app.get('/api/constructors', async (req, res) => {
  try {
    const response = await axios.get('http://ergast.com/api/f1/2023/constructors.json');
    res.json(response.data.MRData.ConstructorTable.Constructors);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

//route to get current circuits
app.get('/api/circuits', async (req, res) => {
  try {
    const response = await axios.get('https://ergast.com/api/f1/current/circuits.json');
    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// Route to get pit stops data for a specific race
app.get('/api/races/:raceId/pitstops', async (req, res) => {
  try {
    const raceId = req.params.raceId;
    const response = await axios.get(`https://ergast.com/api/f1/2023/${raceId}/pitstops.json`);
    res.json(response.data.MRData.RaceTable.Races[0].PitStops);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// Route to get lap times for a specific race and lap
app.get('/api/races/:raceId/laps/:lap', async (req, res) => {
  try {
    const { raceId, lap } = req.params;
    const response = await axios.get(`https://ergast.com/api/f1/2023/${raceId}/laps/${lap}.json`);
    res.json(response.data.MRData.RaceTable.Races[0].Laps);
  } catch (error) {
    res.status(500).send(error.toString());
  }
});

// Define the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
