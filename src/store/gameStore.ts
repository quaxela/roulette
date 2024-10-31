import { create } from 'zustand';
import { GameState, Bet } from '../types/game';

interface GameStore extends GameState {
  placeBet: (bet: Omit<Bet, 'id' | 'timestamp'>) => void;
  setSpinning: (spinning: boolean) => void;
  setCurrentNumber: (number: number | null) => void;
  updateBalance: (amount: number) => void;
  setConnected: (connected: boolean) => void;
  clearBets: () => void;
}

export const useGameStore = create<GameStore>((set) => ({
  currentNumber: null,
  isSpinning: false,
  lastNumbers: [],
  bets: [],
  balance: 1000, // Starting balance
  connected: false,

  placeBet: (bet) =>
    set((state) => ({
      bets: [
        ...state.bets,
        {
          ...bet,
          id: crypto.randomUUID(),
          timestamp: new Date(),
        },
      ],
      balance: state.balance - bet.amount,
    })),

  setSpinning: (spinning) => set({ isSpinning: spinning }),
  
  setCurrentNumber: (number) =>
    set((state) => ({
      currentNumber: number,
      lastNumbers: number !== null 
        ? [number, ...state.lastNumbers].slice(0, 10)
        : state.lastNumbers,
    })),

  updateBalance: (amount) =>
    set((state) => ({ balance: state.balance + amount })),

  setConnected: (connected) => set({ connected }),
  
  clearBets: () => set({ bets: [] }),
}));