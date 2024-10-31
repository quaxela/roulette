export type BetType = 
  | 'straight'    // Single number
  | 'split'       // Two adjacent numbers
  | 'street'      // Three numbers in a row
  | 'corner'      // Four numbers in a square
  | 'line'        // Six numbers (two rows)
  | 'column'      // Twelve numbers (whole column)
  | 'dozen'       // Twelve numbers (1-12, 13-24, 25-36)
  | 'color'       // Red or black
  | 'evenOdd'     // Even or odd numbers
  | 'highLow';    // 1-18 or 19-36

export interface Bet {
  id: string;
  type: BetType;
  amount: number;
  numbers: number[];
  timestamp: Date;
}

export interface GameState {
  currentNumber: number | null;
  isSpinning: boolean;
  lastNumbers: number[];
  bets: Bet[];
  balance: number;
  connected: boolean;
}

export interface GameStats {
  totalBets: number;
  winRate: number;
  favoriteNumbers: number[];
  biggestWin: number;
}