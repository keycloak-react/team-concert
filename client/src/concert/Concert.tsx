import React, { useEffect, useState } from "react";
import subscribe from "../common/socketSubscriber";
import useSocket from "../common/useSockets";
import NameCard from "./NameCard";

interface IConcertProps {
  name: string;
  room: string;
}

interface IUser {
  name: string;
  id: string;
}

const styles: { [key: string]: React.CSSProperties } = {
  concertContainer: {
    padding: 16,
    display: "flex",
    gap: 5,
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: "8px 16px",
    background: "#3f3f3f",
    justifyContent: "space-between",
    color: "white",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    height: 32,
    background: "#3f3f3f",
    justifyContent: "center",
    color: "white",
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  btn: {
    padding: "5px 10px",
    borderRadius: 5,
    border: "1px solid darkgray",
    cursor: "pointer",
  },
};
function Concert(props: IConcertProps) {
  const { room, name } = props;
  const socket = useSocket(room, name);
  const [userWithBall, setUserWithBall] = useState<string | null>(null);
  const [connectedClients, setConnectedClients] = useState<IUser[]>([]);
  useEffect(() => {
    if (!socket) return;
    subscribe(
      "updated-connected-users",
      socket,
      (data: { connectedUsers: IUser[] }) => {
        setConnectedClients(data.connectedUsers || []);
      }
    );

    subscribe("user-with-ball", socket, (data: { userWithBall: string }) => {
      setUserWithBall(data.userWithBall);
    });
    socket.emit("get-connected-users");
    socket.emit("user-with-ball");
  }, [socket]);

  const grabBall = () => {
    if (!socket) return;
    socket.emit("pass", { to: socket.id });
  };

  const passBall = (id: string) => {
    if (!socket) return;
    socket.emit("pass", { to: id });
  };

  return (
    <div className="App">
      <div style={styles.header}>
        <h1>
          <img
            style={{ width: 50, aspectRatio: "1/1" }}
            alt="Team concert logo"
            src="./spotlight.png"
          ></img>
        </h1>
        {!userWithBall && (
          <button style={styles.btn} onClick={grabBall}>
            Grab the Ball
          </button>
        )}
      </div>
      <div style={styles.concertContainer}>
        {connectedClients.map((item) => {
          return (
            <NameCard
              passBall={() => passBall(item.id)}
              key={item.id}
              name={item.name}
              hasBall={item.id === userWithBall}
            />
          );
        })}
      </div>
      <div style={styles.footer}>PCN Team Concert 1.0</div>
    </div>
  );
}

export default Concert;
