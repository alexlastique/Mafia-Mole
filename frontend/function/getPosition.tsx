import { Accelerometer } from 'expo-sensors';
import { useState, useEffect } from 'react';

const SHAKE_THRESHOLD = 2; // Seuil d'accélération pour détecter une secousse

export const useAccelerometer = () => {
 const [data, setData] = useState({ x: 0, y: 0, z: 0 });
 const [isShaking, setIsShaking] = useState(false);

 useEffect(() => {
 const subscription = Accelerometer.addListener(accelerometerData => {
 setData(accelerometerData);

 // Calculer la magnitude de l'accélération (hypoténuse 3D)
 const acceleration = Math.sqrt(
   accelerometerData.x ** 2 +
   accelerometerData.y ** 2 +
   accelerometerData.z ** 2
 );

 // Détecter si c'est une secousse (magnitude > seuil)
 if (acceleration > SHAKE_THRESHOLD) {
   setIsShaking(true);
   // Réinitialiser après 500ms
   setTimeout(() => setIsShaking(false), 500);
 }
 });

 Accelerometer.setUpdateInterval(50); // 50ms pour meilleure détection
 return () => subscription.remove();
 }, []);

 return { data, isShaking };
};