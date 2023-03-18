import React, { useEffect, useState } from "react";

interface IDetails {
  onContinue: (room: string, name: string) => void;
}

const styles: { [key: string]: React.CSSProperties } = {
  details: {
    padding: 16,
    display: "flex",
    justifyContent: "center",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
    padding: 32,
    maxWidth: 400,
    width: "100%",
    border: "2px solid gray",
  },
  label: {
    width: "100%",
    fontSize: "smaller",
    alignSelf: "flex-start",
  },
  input: {
    width: "100%",
    padding: 10,
    marginBottom: 16,
    boxSizing: "border-box",
  },
  btn: {
    padding: "5px 10px",
    borderRadius: 5,
    border: "1px solid darkgray",
    cursor: "pointer",
  },
};

function Details(props: IDetails) {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const urlParams = new URLSearchParams(window.location.search);
  const roomId = urlParams.get("r");
  useEffect(() => {
    const n = localStorage.getItem("name");
    setName(n || "");
    setRoom(roomId || "");
  }, [roomId]);

  const onContinue = (r: string, n: string) => {
    if (name && room) {
      localStorage.setItem("name", n);
      props.onContinue(r, n);
    }
  };

  return (
    <div style={styles.details}>
      <div style={styles.form}>
        <label style={styles.label} htmlFor="meeting-id">
          Meeting Id
        </label>
        <input
          name="meeting-id"
          id="meeting-id"
          onChange={(evt) => setRoom(evt.target.value)}
          placeholder="Enter meeting id"
          disabled={!!roomId}
          value={room}
          style={styles.input}
        ></input>
        <label style={styles.label} htmlFor="name">
          Name
        </label>
        <input
          name="name"
          id="name"
          onChange={(evt) => setName(evt.target.value)}
          placeholder="Enter your name"
          value={name}
          style={styles.input}
        ></input>
        <button style={styles.btn} onClick={() => onContinue(room, name)}>
          Continue
        </button>
      </div>
    </div>
  );
}

export default Details;
