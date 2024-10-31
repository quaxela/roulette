import React from 'react';
import { useGameStore } from '../store/gameStore';
import type { BetType } from '../types/game';

const STRAIGHT_NUMBERS = Array.from({ length: 37 }, (_, i) => i);
const COLUMNS = [
  [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36],
  [2, 5, 8, 11, 14, 17, 20, 23, 26, 29, 32, 35],
  [1, 4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34],
];

export const BettingBoard: React.FC = () => {
  const { placeBet, balance, isSpinning } = useGameStore();

  const handleBet = (type: BetType, numbers: number[], amount: number = 10) => {
    if (isSpinning || balance < amount) return;
    placeBet({ type, numbers, amount });
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-4 bg-green-800 rounded-lg shadow-xl">
      {/* Zero */}
      <div className="grid grid-cols-13 gap-1 mb-4">
        <button
          onClick={() => handleBet('straight', [0])}
          className="col-span-1 h-16 bg-green-600 text-white font-bold rounded hover:bg-green-500 transition-colors"
        >
          0
        </button>
        
        {/* Numbers 1-36 */}
        <div className="col-span-12 grid grid-cols-12 gap-1">
          {COLUMNS.map((column, i) => (
            <div key={i} className="grid grid-rows-3 gap-1">
              {column.map((number) => (
                <button
                  key={number}
                  onClick={() => handleBet('straight', [number])}
                  className={`h-16 ${
                    [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(number)
                      ? 'bg-red-600 hover:bg-red-500'
                      : 'bg-black hover:bg-gray-800'
                  } text-white font-bold rounded transition-colors`}
                >
                  {number}
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Outside bets */}
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="space-y-2">
          <button
            onClick={() => handleBet('color', [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36])}
            className="w-full py-2 bg-red-600 text-white font-bold rounded hover:bg-red-500 transition-colors"
          >
            Red
          </button>
          <button
            onClick={() => handleBet('evenOdd', STRAIGHT_NUMBERS.filter(n => n % 2 === 0 && n !== 0))}
            className="w-full py-2 bg-gray-700 text-white font-bold rounded hover:bg-gray-600 transition-colors"
          >
            Even
          </button>
        </div>
        <div className="space-y-2">
          <button
            onClick={() => handleBet('color', [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35])}
            className="w-full py-2 bg-black text-white font-bold rounded hover:bg-gray-800 transition-colors"
          >
            Black
          </button>
          <button
            onClick={() => handleBet('evenOdd', STRAIGHT_NUMBERS.filter(n => n % 2 === 1))}
            className="w-full py-2 bg-gray-700 text-white font-bold rounded hover:bg-gray-600 transition-colors"
          >
            Odd
          </button>
        </div>
      </div>
    </div>
  );
};