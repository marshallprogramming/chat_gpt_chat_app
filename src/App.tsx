import React, { useState, useEffect } from "react";
import { Provider } from "react-redux";

const App = () => {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const messagesRef = firebase.database().ref("messages");
    messagesRef.on("value", (snapshot) => {
      const messages = [];
      snapshot.forEach((childSnapshot) => {
        const message = childSnapshot.val();
        messages.push(message);
      });
      store.dispatch({ type: "SET_MESSAGES", payload: messages });
      setIsLoading(false);
    });
  }, []);

  const handleUserInput = (event) => {
    store.dispatch({ type: "SET_USER", payload: event.target.value });
  };

  const handleMessageInput = (event) => {
    setInputValue(event.target.value);
    store.dispatch({ type: "SET_MESSAGE", payload: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { user, message } = store.getState();
    const messageRef = firebase.database().ref("messages").push();
    messageRef.set({
      user: user,
      message: message,
      timestamp: Date.now(),
    });
    setInputValue("");
    store.dispatch({ type: "SET_MESSAGE", payload: "" });
  };

  return (
    <div>
      <h1>Chat App</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {store.getState().messages.map((message, index) => (
            <li key={index}>
              <strong>{message.user}: </strong>
              {message.message}
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" onChange={handleUserInput} />
        <input
          type="text"
          placeholder="Message"
          value={inputValue}
          onChange={handleMessageInput}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

// Render the app
const ChatApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
