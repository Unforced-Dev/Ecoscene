import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface Transaction {
  id: string;
  type: 'send' | 'receive' | 'purchase' | 'reward';
  currency: 'V' | 'Y' | 'Q';
  amount: number;
  from: string;
  to: string;
  description: string;
  timestamp: string;
}

interface CurrencyState {
  balances: {
    V: number;
    Y: number;
    Q: number;
  };
  transactions: Transaction[];
  exchangeRates: {
    V_TO_USD: number;
    Y_TO_USD: number;
    Q_TO_USD: number;
  };
  loading: boolean;
  error: string | null;
}

const initialState: CurrencyState = {
  balances: {
    V: 0,
    Y: 0,
    Q: 0,
  },
  transactions: [],
  exchangeRates: {
    V_TO_USD: 0.9,
    Y_TO_USD: 1.0,
    Q_TO_USD: 10.0,
  },
  loading: false,
  error: null,
};

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setBalances: (state, action: PayloadAction<typeof initialState.balances>) => {
      state.balances = action.payload;
    },
    updateBalance: (state, action: PayloadAction<{ currency: 'V' | 'Y' | 'Q'; amount: number }>) => {
      state.balances[action.payload.currency] += action.payload.amount;
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload);
    },
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },
    setExchangeRates: (state, action: PayloadAction<typeof initialState.exchangeRates>) => {
      state.exchangeRates = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setBalances,
  updateBalance,
  addTransaction,
  setTransactions,
  setExchangeRates,
  setLoading,
  setError,
} = currencySlice.actions;

export default currencySlice.reducer;