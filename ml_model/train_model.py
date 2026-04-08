import numpy as np
import tensorflow as tf
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense

# Sample training data
# [load, vibration, temperature]

X = np.array([
    [40, 2, 30],
    [50, 3, 35],
    [60, 4, 40],
    [80, 7, 50],
    [90, 8, 55],
    [100, 9, 60]
])

# 0 = Safe, 1 = Risk
y = np.array([0, 0, 0, 1, 1, 1])

model = Sequential([
    Dense(16, activation="relu", input_shape=(3,)),
    Dense(8, activation="relu"),
    Dense(1, activation="sigmoid")
])

model.compile(
    optimizer="adam",
    loss="binary_crossentropy",
    metrics=["accuracy"]
)

model.fit(X, y, epochs=100)

model.save("model.h5")

print("Model trained and saved successfully!")