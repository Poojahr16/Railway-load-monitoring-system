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
    try:
        data = request.json

        load = data.get("load")
        vibration = data.get("vibration")
        temperature = data.get("temperature")

        result = predict(load, vibration, temperature)

        return jsonify({"prediction": result})

    except Exception as e:
        return jsonify({"error": str(e)})
