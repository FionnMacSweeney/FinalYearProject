from flask import Flask, request, jsonify
from flask_cors import CORS
from race_simulation import simulate_race 

app = Flask(__name__)
CORS(app)

@app.route('/start-simulation', methods=['POST'])
def start_simulation():
    data = request.json
    results = simulate_race(data)
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True, port=5000)

