import React, { useEffect, useState } from "react";
import "./App.css";
import Concert from "./concert/Concert";
import Details from "./home/Details";

function App() {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [allSet, setAllSet] = useState(false);

  const onContinue = (r: string, n: string) => {
    setRoom(r);
    setName(n);
    setAllSet(true);
  };

  if (!allSet) {
    return <Details onContinue={onContinue} />;
  }

  return <Concert room={room} name={name} />;
}

export default App;
