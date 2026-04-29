import tensorflow as tf
from tensorflow.keras import layers, models

# --- CONFIGURATION ---
INPUT_SHAPE = (32, 32, 3)
NUM_CLASSES = 10

EPOCHS = 50 #V3 passe de 10 a 50 epoch car manque de precision

def load_and_prep_data():
    (train_images, train_labels), (test_images, test_labels) = tf.keras.datasets.cifar10.load_data()
    # Normalisation
    train_images = (train_images / 255.0).astype('float16')
    test_images = (test_images / 255.0).astype('float16')
    return (train_images, train_labels), (test_images, test_labels)

def build_model():
    #DATA AUGMENTATION V2
    data_augmentation = tf.keras.Sequential([
        layers.RandomFlip("horizontal"), # Inverse l'image (miroir gauche/droite)
        layers.RandomTranslation(0.1, 0.1), # Décalage (Translation) car Zoom et Rotation détruisent trop de pixels sur du 32x32
    ])
    
    model = models.Sequential([
        layers.Input(shape=INPUT_SHAPE),
        data_augmentation,

        # BLOC 1
        layers.Conv2D(32, (3, 3), activation='relu', padding='same'),
        layers.BatchNormalization(),
        layers.Conv2D(32, (3, 3), activation='relu', padding='same'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.2),

        # BLOC 2
        layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
        layers.BatchNormalization(),
        layers.Conv2D(64, (3, 3), activation='relu', padding='same'),
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.3),

        # BLOC 3
        layers.Conv2D(128, (3, 3), activation='relu', padding='same'), 
        layers.BatchNormalization(),
        layers.Conv2D(128, (3, 3), activation='relu', padding='same'), 
        layers.BatchNormalization(),
        layers.MaxPooling2D((2, 2)),
        layers.Dropout(0.4),

        # CLASSIFICATION
        layers.Flatten(),
        layers.Dense(128, activation='relu'),
        layers.BatchNormalization(),
        layers.Dropout(0.5),
        layers.Dense(NUM_CLASSES)
    ])
    
    model.compile(optimizer='adam',
                  loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
                  metrics=['accuracy'])
    return model

if __name__ == "__main__":
    (train_images, train_labels), (test_images, test_labels) = load_and_prep_data()
    model = build_model()

    # Callback pour arrêter si ça n'apprend plus (Clean Dev)
    early_stop = tf.keras.callbacks.EarlyStopping(monitor='val_loss', patience=3)

    print("Début de l'entraînement...")
    history = model.fit(
        train_images, train_labels, 
        epochs=EPOCHS, 
        validation_data=(test_images, test_labels),
        callbacks=[early_stop]
    )

    model.save('cifar10_model.keras')
    print("\nModèle sauvegardé. Prêt pour l'intégration API.")