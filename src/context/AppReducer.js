export default (state, action) => {
    switch (action.type) {
      case "TIMER":
        return {
          ...state,
          ...action.payload
        };
      default:
        return state;
    }
  };
  