import React, { useState } from "react";
import Stack from "./components/Stack";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [done, setDone] = useState(false);

  setTimeout(() => {
    setDone(true);
  }, 1500);

  return (
    <>
      {done ? (
        <Stack currentUser={null} authState={null} />
      ) : (
        <LoadingScreen />
      )}
    </>
  );
}

export default App;
