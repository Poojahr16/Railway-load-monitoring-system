import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split

# Load dataset
data = pd.read_csv("Combined Data.csv")

print(data.columns)

# Features and label
X = data[['load', 'vibration', 'temperature']]
y = data['label']

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Build model
model = tf.keras.Sequential([
    tf.keras.layers.Dense(16, activation='relu', input_shape=(3,)),
    tf.keras.layers.Dense(8, activation='relu'),
    tf.keras.layers.Dense(1, activation='sigmoid')
])

# Compile
model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

# Train
model.fit(X_train, y_train, epochs=20)

# Save model
model.save("model.h5")

print("Model saved successfully")