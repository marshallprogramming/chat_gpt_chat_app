import { createStore } from "redux";

// Define our message action types
const ADD_MESSAGE = "ADD_MESSAGE";
const LOAD_MESSAGES = "LOAD_MESSAGES";

// Define our initial state
const initialState = {
  messages: [],
};

// Define our message actions
export function addMessage(user, message, timestamp) {
  return {
    type: ADD_MESSAGE,
    payload: {
      user,
      message,
      timestamp,
    },
  };
}

export function loadMessages(messages) {
  return {
    type: LOAD_MESSAGES,
    payload: messages,
  };
}

// Define our message reducer
function messageReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        messages: [
          ...state.messages,
          {
            user: action.payload.user,
            message: action.payload.message,
            timestamp: action.payload.timestamp,
          },
        ],
      };
    case LOAD_MESSAGES:
      return {
        messages: action.payload,
      };
    default:
      return state;
  }
}

// Create our Redux store
export const store = createStore(messageReducer);
