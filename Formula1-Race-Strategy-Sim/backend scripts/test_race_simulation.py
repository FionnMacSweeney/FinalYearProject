import unittest
from unittest.mock import patch
from race_simulation import adjust_for_weather, determine_starting_positions, simulate_race

class TestRaceSimulation(unittest.TestCase):
    def setUp(self):
        # Setup reusable attributes for the tests
        self.driver_ratings = {'driver1': {'performance_score': 90, 'team_id': 'team1'},
                               'driver2': {'performance_score': 85, 'team_id': 'team1'}}
        self.team_ratings = {'team1': {'performance_score': 88}}

    @patch('random.choices')
    def test_determine_starting_positions(self, mock_choices):
        mock_choices.side_effect = lambda population, weights, k=1: [population[0]]
        positions = determine_starting_positions(self.driver_ratings, self.team_ratings)
        self.assertEqual(positions, ['driver1', 'driver2'])

    @patch('random.random')
    @patch('random.choices')
    def test_simulate_race(self, mock_choices, mock_random):
        mock_random.side_effect = lambda: 0.1  # Always return 0.1, no matter how many times it's called
        mock_choices.side_effect = lambda population, weights, k=1: [population[0]]
        race_result = simulate_race(['driver1', 'driver2'], self.driver_ratings, self.team_ratings, 'mild')
        self.assertTrue('lap_results' in race_result)
        self.assertTrue('final_positions' in race_result)


if __name__ == '__main__':
    unittest.main()
