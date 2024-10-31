import React from 'react';
import { useGameStore } from '../store/gameStore';
import { formatDistance } from 'date-fns';
import { Trophy, Coins, History } from 'lucide-react';

export const GameStats: React.FC = () => {
  const { balance, lastNumbers, bets } = useGameStore();

  return (
    <div className="max-w-3xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Coins className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-bold">Balance</h3>
        </div>
        <p className="text-2xl font-bold text-green-600">${balance.toFixed(2)}</p>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <History className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-bold">Last Numbers</h3>
        </div>
        <div className="flex gap-2 flex-wrap">
          {lastNumbers.map((number, index) => (
            <span
              key={index}
              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                number === 0
                  ? 'bg-green-500'
                  : [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(number)
                  ? 'bg-red-500'
                  : 'bg-black'
              }`}
            >
              {number}
            </span>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg p-4">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-bold">Current Bets</h3>
        </div>
        <div className="space-y-2">
          {bets.map((bet) => (
            <div key={bet.id} className="text-sm">
              <p className="font-semibold">
                {bet.type} - ${bet.amount}
              </p>
              <p className="text-gray-500 text-xs">
                {formatDistance(bet.timestamp, new Date(), { addSuffix: true })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};