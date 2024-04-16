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

# Adjust simulation based on weather condition
def adjust_for_weather(weather):
    global TYRE_DEGRADATION_RATE
    global SAFETY_CAR_PROBABILITY
    
    if weather == "veryHot":
        TYRE_DEGRADATION_RATE += 0.05  # Increase tyre degradation for "Very Hot" condition
    elif weather == "wet":
        SAFETY_CAR_PROBABILITY += 0.03  # Increase the probability of DNF for "Wet" condition


weather_condition = sys.argv[1] if len(sys.argv) > 1 else "mild"
adjust_for_weather(weather_condition)

def determine_starting_positions(driver_ratings, team_ratings):
    # Adjusted function signature to accept team ratings as well.

    # Combine driver and team scores
    combined_scores = {}
    for driver_id, driver_info in driver_ratings.items():
        team_id = driver_info['team_id']
        # 70% driver score, 30% team score
        combined_score = 0.7 * driver_info['performance_score'] + 0.3 * team_ratings[team_id]['performance_score']
        combined_scores[driver_id] = combined_score

    # Sort drivers based on combined score
    sorted_drivers = sorted(combined_scores, key=lambda x: combined_scores[x], reverse=True)
    starting_positions = []

    # Apply a weighted shuffle to determine starting positions using combined scores
    while sorted_drivers:
        pick = random.choices(sorted_drivers, weights=[combined_scores[d] for d in sorted_drivers], k=1)[0]
        starting_positions.append(pick)
        sorted_drivers.remove(pick)

    return starting_positions


def simulate_race(starting_positions, driver_ratings, team_ratings, weather_condition):
    race_positions = starting_positions[:]
    race_length = 60
    dnf_drivers = []
    safety_car_active = False
    safety_car_remaining = 0
    tyre_performance = {driver: 1.0 for driver in starting_positions}  # Initialize tyre performance for each driver

    for lap in range(race_length):
        if safety_car_active:
            if safety_car_remaining > 0:
                safety_car_remaining -= 1
                continue  # No overtaking during safety car
            else:
                safety_car_active = False

        i = 0
        while i < len(race_positions) - 1:
            current_driver_id = race_positions[i].split(" ")[0]
            current_team_id = driver_ratings[current_driver_id]['team_id']  # Assuming driver_ratings include team_id
            if "DNF" in race_positions[i]:
                i += 1
                continue

            current_driver_score = driver_ratings[current_driver_id]['performance_score']
            current_team_score = team_ratings[current_team_id]['performance_score']
            # Combine driver and team scores for a comprehensive performance score
            combined_performance_score = current_driver_score + (0.5 * current_team_score)  # Adjust weighting as necessary
            
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

            # Handle Pitstops
            if PIT_WINDOW_START <= lap <= PIT_WINDOW_END and random.random() < 0.1:
                # Simulate Pitstop, driver loses positions
                pitstop_loss = random.randint(1, 4)  # Number of positions lost due to pitstop
                race_positions = race_positions[:i] + race_positions[i+1:i+1+pitstop_loss] + [race_positions[i]] + race_positions[i+1+pitstop_loss:]
                tyre_performance[current_driver_id] = 1.0  # Reset tyre performance after pitstop

            # Tyre degradation
            if not safety_car_active:
                tyre_performance[current_driver_id] -= TYRE_DEGRADATION_RATE

            i += 1

    race_results = {driver: position + 1 for position, driver in enumerate(race_positions + dnf_drivers)}
    return race_results

if __name__ == "__main__":
    year = 2023
    season_data = fetch_season_data(year)
    driver_ratings = calculate_driver_ratings(season_data)
    team_ratings = calculate_team_ratings(season_data)  # Make sure you have this function defined

    starting_positions = determine_starting_positions(driver_ratings,team_ratings)
    race_results = simulate_race(starting_positions, driver_ratings, team_ratings, weather_condition)

    # Format and print data as JSON
    output = {
        "startingPositions": starting_positions,
        "RaceResults": race_results
    }
    print(json.dumps(output))  # Convert the output dictionary to JSON and print it


   
    
    
