import requests

def fetch_season_data(year):
    url = f'http://ergast.com/api/f1/{year}/results.json?limit=1000'
    response = requests.get(url)
    return response.json()


def calculate_driver_ratings(data):
    driver_ratings = {}
    
    for race in data['MRData']['RaceTable']['Races']:
        for result in race['Results']:
            driver_id = result['Driver']['driverId']
            grid_position = int(result['grid'])
            race_position = int(result['position'])
            points = float(result['points'])
            
            team_id = result['Constructor']['constructorId']  # Correctly extract team ID

            if driver_id not in driver_ratings:
                driver_ratings[driver_id] = {
                    'races': 0, 
                    'wins': 0, 
                    'total_points': 0, 
                    'average_grid': 0, 
                    'average_finish': 0,
                    'team_id': team_id  # Include team ID here
                }

            driver_info = driver_ratings[driver_id]
            driver_info['races'] += 1
            driver_info['total_points'] += points
            driver_info['average_grid'] += grid_position
            driver_info['average_finish'] += race_position

            if race_position == 1:
                driver_info['wins'] += 1


    # Final calculation
    for driver_id, info in driver_ratings.items():
        info['average_grid'] /= info['races']
        info['average_finish'] /= info['races']
        performance_score = calculate_performance_score(info)
        driver_ratings[driver_id]['performance_score'] = performance_score

    return driver_ratings

def calculate_performance_score(info):
    # Custom formula to calculate performance score
    score = (info['wins'] / info['races']) * 50 + (info['total_points'] / (info['races'] * 25)) * 50
    # Adjustments based on average grid and finish positions
    grid_adjustment = (1 - (info['average_grid'] / 20)) * 15
    finish_adjustment = (1 - (info['average_finish'] / 20)) * 35
    score += grid_adjustment + finish_adjustment
    return round(min(max(score, 1), 100))  # Ensure score is between 1 and 100


def calculate_team_ratings(data, max_possible_points=1058):  #  max points
    team_ratings = {}

    for race in data['MRData']['RaceTable']['Races']:
        for result in race['Results']:
            team_id = result['Constructor']['constructorId']
            points = float(result['points'])

            if team_id not in team_ratings:
                team_ratings[team_id] = {'races': 0, 'total_points': 0}

            team_info = team_ratings[team_id]
            team_info['races'] += 1
            team_info['total_points'] += points

    # Final calculation for teams
    for team_id, info in team_ratings.items():
        # Calculate performance score based on total points scaled to max possible points
        performance_score = ((info['total_points'] / max_possible_points) * 99) + 1  # Scale from 1 to 100
        team_ratings[team_id]['performance_score'] = round(min(max(performance_score, 1), 100))

    return team_ratings


if __name__ == "__main__":
    year = 2023
    season_data = fetch_season_data(year)
    driver_ratings = calculate_driver_ratings(season_data)
    team_ratings = calculate_team_ratings(season_data)

    for driver_id, rating in driver_ratings.items():
        print(f"Driver: {driver_id}, Rating: {rating['performance_score']}")
    for team_id, rating in team_ratings.items():
        print(f"Team: {team_id}, Rating: {rating['performance_score']}")
