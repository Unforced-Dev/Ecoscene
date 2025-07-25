import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Guild } from '../../mocks/data';

interface GuildState {
  guilds: Guild[];
  userGuilds: Guild[];
  currentGuild: Guild | null;
  loading: boolean;
  error: string | null;
}

const initialState: GuildState = {
  guilds: [],
  userGuilds: [],
  currentGuild: null,
  loading: false,
  error: null,
};

const guildSlice = createSlice({
  name: 'guild',
  initialState,
  reducers: {
    fetchGuildsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchGuildsSuccess: (state, action: PayloadAction<Guild[]>) => {
      state.guilds = action.payload;
      state.loading = false;
    },
    fetchGuildsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setUserGuilds: (state, action: PayloadAction<Guild[]>) => {
      state.userGuilds = action.payload;
    },
    setCurrentGuild: (state, action: PayloadAction<Guild>) => {
      state.currentGuild = action.payload;
    },
    joinGuild: (state, action: PayloadAction<Guild>) => {
      if (!state.userGuilds.find(g => g.id === action.payload.id)) {
        state.userGuilds.push(action.payload);
      }
    },
    leaveGuild: (state, action: PayloadAction<string>) => {
      state.userGuilds = state.userGuilds.filter(g => g.id !== action.payload);
    },
    updateGuild: (state, action: PayloadAction<Guild>) => {
      const index = state.guilds.findIndex(g => g.id === action.payload.id);
      if (index !== -1) {
        state.guilds[index] = action.payload;
      }
      if (state.currentGuild?.id === action.payload.id) {
        state.currentGuild = action.payload;
      }
    },
  },
});

export const {
  fetchGuildsStart,
  fetchGuildsSuccess,
  fetchGuildsFailure,
  setUserGuilds,
  setCurrentGuild,
  joinGuild,
  leaveGuild,
  updateGuild,
} = guildSlice.actions;

export default guildSlice.reducer;