import numpy as np

# load trained model
model = tf.keras.models.load_model("../ml_model/model.h5", compile=False)

def predict(load, vibration, temperature):

    data = np.array([[load, vibration, temperature]])

    prediction = model.predict(data)

    if prediction[0][0] > 0.5:
        return "Danger ⚠️ Bridge Failure Risk"
    else:
        return "Safe ✅"
