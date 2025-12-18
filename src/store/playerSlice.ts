import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PlayerState {
  name: string;
  address1: string;
  address2: string;
  pinCode: string;
  playingStatus: string;
  sport: string;
  feedback: string;
  sports: string[]; 
}

const initialState: PlayerState = {
  name: '',
  address1: '',
  address2: '',
  pinCode: '',
  playingStatus: '',
  sport: '',
  feedback: '',
  sports: [],
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setBasicInfo(
      state,
      action: PayloadAction<{
        name: string;
        address1: string;
        address2: string;
        pinCode: string;
      }>
    ) {
      Object.assign(state, action.payload);
    },

    setSportInfo(
      state,
      action: PayloadAction<{
        playingStatus: string;
        sport: string;
      }>
    ) {
      state.playingStatus = action.payload.playingStatus;
      state.sport = action.payload.sport;
    },

    setFeedback(state, action: PayloadAction<string>) {
        state.feedback = action.payload;
      },

    setSports(state, action: PayloadAction<string[]>) {
      state.sports = action.payload;
    },

    resetPlayer() {
      return initialState;
    },
  },
});

export const {
  setBasicInfo,
  setSportInfo,
  setSports,
  resetPlayer,
  setFeedback,
} = playerSlice.actions;

export default playerSlice.reducer;
