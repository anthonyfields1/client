import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

// Initial state
const initialState = {
  time: 0
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions

  function handleTimer(time) {
    // console.log(time)
    dispatch({
      type: "TIMER",
      payload: {
        // time
      }
    });
  }
  function toStartGame() {
    dispatch({
      type: "START"
    });
  }
  function toStopGame() {
    dispatch({
      type: "RESET"
    });
  }
  function toResetGame() {
    dispatch({
      type: "STOP"
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        handleTimer,
        toResetGame,
        toStartGame,
        toStopGame,
        time: state.time
        // showStartPage: state.showStartPage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
