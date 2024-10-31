import React, { useEffect } from 'react';
import { RouletteWheel } from './components/RouletteWheel';
import { BettingBoard } from './components/BettingBoard';
import { GameStats } from './components/GameStats';
import { useGameStore } from './store/gameStore';
import { Wifi, WifiOff } from 'lucide-react';

function App() {
  const { connected, setConnected } = useGameStore();

  // Simulate WebSocket connection
  useEffect(() => {
    const connectWebSocket = () => {
      setConnected(true);
      // In a real app, implement actual WebSocket connection here
    };

    connectWebSocket();
    return () => setConnected(false);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-gray-900">Modern Roulette</h1>
            <div className="flex items-center gap-2">
              {connected ? (
                <Wifi className="w-5 h-5 text-green-500" />
              ) : (
                <WifiOff className="w-5 h-5 text-red-500" />
              )}
              <span className="text-sm text-gray-600">
                {connected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <RouletteWheel />
        </div>
        <BettingBoard />
        <GameStats />
      </main>
    </div>
  );
}

export default App;