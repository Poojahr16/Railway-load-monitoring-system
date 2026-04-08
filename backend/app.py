from flask import Flask, request, jsonify
from flask_cors import CORS
from model import predict

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Bridge Monitoring Backend Running 🚆"

@app.route("/predict", methods=["POST"])
def get_prediction():

    data = request.json

    load = data["load"]
    vibration = data["vibration"]
    temperature = data["temperature"]

    result = predict(load, vibration, temperature)

    return jsonify({"prediction": result})

if __name__ == "__main__":
    app.run(debug=True)