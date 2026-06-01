import { Accelerometer } from 'expo-sensors';
import { useState, useEffect, useRef } from 'react';

const SHAKE_THRESHOLD = 1.2; // Seuil de variation pour détecter une secousse
const SHAKE_HOLD_MS = 500; // Durée pendant laquelle on considère qu'une secousse est en cours

export const useAccelerometer = () => {
 const [data, setData] = useState({ x: 0, y: 0, z: 0 });
 const [isShaking, setIsShaking] = useState(false);
 const previousData = useRef(data);
 const shakeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

 useEffect(() => {
 const subscription = Accelerometer.addListener(accelerometerData => {
 setData(accelerometerData);

 const delta =
   Math.abs(accelerometerData.x - previousData.current.x) +
   Math.abs(accelerometerData.y - previousData.current.y) +
   Math.abs(accelerometerData.z - previousData.current.z);

 previousData.current = accelerometerData;

 if (delta > SHAKE_THRESHOLD) {
   setIsShaking(true);
   if (shakeTimeout.current) {
     clearTimeout(shakeTimeout.current);
   }
   shakeTimeout.current = setTimeout(() => {
     setIsShaking(false);
   }, SHAKE_HOLD_MS);
 }
 });

 Accelerometer.setUpdateInterval(50); // 50ms pour meilleure détection
 return () => {
   subscription.remove();
   if (shakeTimeout.current) {
     clearTimeout(shakeTimeout.current);
   }
 };
 }, []);

 return { data, isShaking };
};