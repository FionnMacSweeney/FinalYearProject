from calculate_performance import calculate_driver_ratings, fetch_season_data, calculate_team_ratings
import random
import json
import sys

# Constants
SAFETY_CAR_PROBABILITY = 0.5  # Probability of safety car deployment on DNF
SAFETY_CAR_DURATION = 5  # Number of laps the safety car stays out
PIT_WINDOW_START = 15  # Lap to start considering pitstops
PIT_WINDOW_END = 45  # Lap to stop considering pitstops
TYRE_DEGRADATION_RATE = 0.1  # Performance loss per lap due to tyre degradation

def adjust_for_weather(weather):
    global TYRE_DEGRADATION_RATE, SAFETY_CAR_PROBABILITY
    if weather == "veryHot":
        TYRE_DEGRADATION_RATE += 0.05
    elif weather == "wet":
        SAFETY_CAR_PROBABILITY += 0.03

weather_condition = sys.argv[1] if len(sys.argv) > 1 else "mild"
adjust_for_weather(weather_condition)

def determine_starting_positions(driver_ratings, team_ratings):
    combined_scores = {}
    for driver_id, driver_info in driver_ratings.items():
        team_id = driver_info['team_id']
        combined_score = 0.7 * driver_info['performance_score'] + 0.3 * team_ratings[team_id]['performance_score']
        combined_scores[driver_id] = combined_score
    sorted_drivers = sorted(combined_scores, key=lambda x: combined_scores[x], reverse=True)
    starting_positions = []
    while sorted_drivers:
        pick = random.choices(sorted_drivers, weights=[combined_scores[d] for d in sorted_drivers], k=1)[0]
        starting_positions.append(pick)
        sorted_drivers.remove(pick)
    return starting_positions

def simulate_race(starting_positions, driver_ratings, team_ratings, weather_condition):
    race_positions = starting_positions[:]
    lap_results = []  # Store results for each lap
    race_length = 60
    dnf_drivers = []
    safety_car_active = False
    safety_car_remaining = 0
    tyre_performance = {driver: 1.0 for driver in starting_positions}

    for lap in range(1, race_length + 1):
        lap_snapshot = {'lap': lap, 'positions': []}
        for position, driver_id in enumerate(race_positions):
            lap_snapshot['positions'].append({'driver_id': driver_id, 'position': position + 1})
        lap_results.append(lap_snapshot)

        if safety_car_active:
            if safety_car_remaining > 0:
                safety_car_remaining -= 1
                continue
            else:
                safety_car_active = False

        i = 0
        while i < len(race_positions) - 1:
            current_driver_id = race_positions[i]
            current_team_id = driver_ratings[current_driver_id]['team_id']
            if "DNF" in current_driver_id:
                i += 1
                continue
            current_driver_score = driver_ratings[current_driver_id]['performance_score']
            current_team_score = team_ratings[current_team_id]['performance_score']
            combined_performance_score = current_driver_score + (0.5 * current_team_score)
            overtaking_chance = min(max(0.1 + combined_performance_score / 200, 0), 1)
            if random.random() < overtaking_chance:
                if i > 0:
                    race_positions[i], race_positions[i - 1] = race_positions[i - 1], race_positions[i]
                    i -= 1
            if random.random() < 0.0025:
                dnf_driver = race_positions.pop(i)
                dnf_drivers.append(dnf_driver + " (DNF)")
                if random.random() < SAFETY_CAR_PROBABILITY:
                    safety_car_active = True
                    safety_car_remaining = SAFETY_CAR_DURATION
                continue
            if PIT_WINDOW_START <= lap <= PIT_WINDOW_END and random.random() < 0.1:
                pitstop_loss = random.randint(1, 4)
                race_positions = race_positions[:i] + race_positions[i+1:i+1+pitstop_loss] + [race_positions[i]] + race_positions[i+1+pitstop_loss:]
                tyre_performance[current_driver_id] = 1.0
            if not safety_car_active:
                tyre_performance[current_driver_id] -= TYRE_DEGRADATION_RATE
            i += 1

    final_results = {'lap_results': lap_results, 'final_positions': {driver: position + 1 for position, driver in enumerate(race_positions + dnf_drivers)}}

    return final_results

if __name__ == "__main__":
    year = 2023
    season_data = fetch_season_data(year)
    driver_ratings = calculate_driver_ratings(season_data)
    team_ratings = calculate_team_ratings(season_data)  # Ensure this function is defined in your imports or script

    starting_positions = determine_starting_positions(driver_ratings, team_ratings)
    race_details = simulate_race(starting_positions, driver_ratings, team_ratings, weather_condition)

    #output keys
    output = {
        "startingPositions": starting_positions,
        "lapResults": race_details['lap_results'],  
        "finalPositions": race_details['final_positions']  
    }

    # Print the JSON output with proper formatting for better readability
    print( json.dumps(output, indent=4));



   
    
    
