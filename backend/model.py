def predict(load, vibration, temperature):

    # Define thresholds (you can adjust later)
    if load > 80 or temperature > 70 or vibration > 50:
        return "DANGER ⚠️ Bridge Failure Risk"
    else:
        return "SAFE ✅"
