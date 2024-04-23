 
const express = require('express');
const axios = require('axios');
const { exec } = require('child_process');
const cors = require('cors');

const app = express();
const { PythonShell } = require('python-shell');


app.use(express.json()); // for parsing application/json

// Enable CORS for client-side

app.use(cors());




const scriptPath = "C:\\Repos\\FYP\\FinalYearProject\\Formula1-Race-Strategy-Sim\\backend scripts\\calculate_performance.py";

// New route to start the simulation
app.post('/api/start-simulation', (req, res) => {
  const scriptPath = "C:\\Repos\\FYP\\FinalYearProject\\Formula1-Race-Strategy-Sim\\backend scripts\\race_simulation.py";

  exec(`python "${scriptPath}"`, (error, stdout, stderr) => {
    if (error) {
      console.error(`Execution error: ${error}`);
      return res.status(500).json({ message: 'Failed to start the simulation', error: stderr });
    }
    
    console.log("Python Script Output:", stdout);  // Debug log

    try {
      const results = JSON.parse(stdout);
      console.log("Parsed results:", results);  // Additional logging
      res.json(results);
    } catch (parseError) {
      console.error('Failed to parse simulation results:', parseError);
      res.status(500).json({ message: 'Failed to parse simulation results', error: parseError });
    }
  });
});






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

// fetch start pos, status, points, result
async function fetchDriverData(year) {
  try {
    const response = await axios.get(`https://ergast.com/api/f1/${year}/results.json`);
    return response.data.MRData.RaceTable.Races;
  } catch (error) {
    console.error('Error fetching driver data:', error);
    throw error;
  }
}

// Route to get team ratings
app.get('/api/team-ratings', (req, res) => {
  exec(`python "${scriptPath}" ratings`, (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          return res.status(500).json({ message: 'Failed to execute the ratings calculation script', error: stderr });
      }
      try {
          const results = JSON.parse(stdout);
          
          const teamRatings = results.teamRatings;
          res.json(teamRatings);
      } catch (parseError) {
          console.error('Failed to parse the script output:', parseError);
          res.status(500).json({ message: 'Failed to parse the ratings data', error: parseError });
      }
  });
});

// Define the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
