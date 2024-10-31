import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useGameStore } from '../store/gameStore';

const NUMBERS = [
  0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5,
  24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26
];

const getNumberColor = (num: number) => {
  if (num === 0) return 'bg-green-500';
  return [
    1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36
  ].includes(num) ? 'bg-red-500' : 'bg-black';
};

export const RouletteWheel: React.FC = () => {
  const controls = useAnimation();
  const wheelRef = useRef<HTMLDivElement>(null);
  const { isSpinning, currentNumber, setCurrentNumber } = useGameStore();

  const spinWheel = async (finalNumber: number) => {
    const finalDegree = NUMBERS.indexOf(finalNumber) * (360 / 37);
    const spins = 5; // Number of full rotations
    const finalRotation = -(360 * spins + finalDegree);
    
    await controls.start({
      rotate: finalRotation,
      transition: {
        duration: 8,
        ease: [0.32, 0.72, 0.35, 0.98],
      },
    });
  };

  useEffect(() => {
    if (isSpinning && currentNumber !== null) {
      spinWheel(currentNumber);
    }
  }, [isSpinning, currentNumber]);

  return (
    <div className="relative w-[400px] h-[400px] mx-auto">
      <motion.div
        ref={wheelRef}
        animate={controls}
        className="absolute inset-0 rounded-full border-8 border-gray-800 overflow-hidden"
        style={{ transformOrigin: 'center center' }}
      >
        {NUMBERS.map((number, index) => {
          const rotation = (index * (360 / 37));
          return (
            <div
              key={number}
              className={`absolute w-full h-[2px] origin-[50%_50%] -translate-y-1/2`}
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <div
                className={`absolute left-1/2 w-[40px] h-[40px] -translate-x-1/2 -translate-y-1/2 ${getNumberColor(
                  number
                )} rounded-full flex items-center justify-center text-white font-bold`}
              >
                {number}
              </div>
            </div>
          );
        })}
      </motion.div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-4 bg-yellow-400 z-10" />
    </div>
  );
};