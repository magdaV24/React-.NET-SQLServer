import { createSlice } from "@reduxjs/toolkit";
import { Card } from "../../types/CardType";

interface GameState {
  category: string;
  limit: number;
  points: number;
  cards: Card[];
}

const initialState: GameState = {
  category: "",
  limit: 0,
  points: 0,
  cards: [],
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      localStorage.setItem("Category", action.payload);
      state.category = action.payload;
    },
    setLimit: (state, action) => {
      localStorage.setItem("Limit", action.payload);
      state.limit = action.payload;
    },
    incrementPoints: (state) => {
      state.points++;
    },
    clearGameState: () => {
      localStorage.removeItem("Cards")
      localStorage.removeItem("Category")
      localStorage.removeItem("Limit")
      return initialState;
    },
    setCards:(state, action)=>{
      localStorage.setItem("Cards", JSON.stringify(action.payload));
      state.cards=action.payload;
    }
  },
});

export const { setCategory, setLimit, incrementPoints, clearGameState, setCards } =
  gameSlice.actions;

export default gameSlice.reducer;
