import tensorflow as tf
from tensorflow.keras import layers, models

INPUT_SHAPE = (32, 32, 3)
NUM_CLASSES = 10

# On pousse les époques pour forcer le modèle à apprendre par cœur
EPOCHS = 50 

def load_and_prep_data():
    (train_images, train_labels), (test_images, test_labels) = tf.keras.datasets.cifar10.load_data()
    # Normalisation
    train_images = (train_images / 255.0).astype('float16')
    test_images = (test_images / 255.0).astype('float16')
    return (train_images, train_labels), (test_images, test_labels)

def build_overfitted_model():
    
    model = models.Sequential([
        layers.Input(shape=INPUT_SHAPE),

        # BLOC 1
        layers.Conv2D(32, (3, 3), activation='relu', padding='same'),
        layers.BatchNormalization(),
        layers.Conv2D(32, (3, 3), activation='relu', padding='same'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        # AUCUN Dropout

        # BLOC 2
        layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
        layers.BatchNormalization(),
        layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        # AUCUN Dropout

        # BLOC 3
        layers.Conv2D(128, (3, 3), activation='relu', padding='same'), 
        layers.BatchNormalization(),
        layers.Conv2D(128, (3, 3), activation='relu', padding='same'), 
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        # AUCUN Dropout

        # CLASSIFICATION
        layers.Flatten(),
        # Une grosse couche Dense pour l'aider à mémoriser les données
        layers.Dense(512, activation='relu'),
        layers.BatchNormalization(),
        # AUCUN Dropout
        layers.Dense(NUM_CLASSES)
    ])
    
    model.compile(optimizer='adam',
                  loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
                  metrics=['accuracy'])
    return model

if __name__ == "__main__":
    (train_images, train_labels), (test_images, test_labels) = load_and_prep_data()
    model = build_overfitted_model()

    print("Début de l'entraînement du modèle SURENTRAÎNÉ (Overfitted)...")
    print("Attention: Il n'y a pas de EarlyStopping, l'entraînement ira jusqu'au bout.")
    
    # Entraînement SANS callback d'Early Stopping
    history = model.fit(
        train_images, train_labels, 
        epochs=EPOCHS, 
        validation_data=(test_images, test_labels)
    )

    model.save('cifar10_model_overfit.keras')
    print("\nModèle 'Overfitted' sauvegardé sous cifar10_model_overfit.keras.")
