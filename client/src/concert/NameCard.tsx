import React from "react";
import avatar from "../assets/images/avatar.png";
import football from "../assets/images/football.jpeg";

interface INameCard {
  name: string;
  hasBall: boolean;
  passBall: () => void;
}

const styles: { [key: string]: React.CSSProperties } = {
  cardWrapper: {
    display: "flex",
    flexDirection: "column",
    width: "35%",
    maxWidth: 200,
    maxHeight: 250,
    aspectRatio: "1/1.25",
    position: "relative",
    border: "2px solid gray",
    padding: 10,
    borderRadius: 10,
    cursor: "pointer",
  },
  avatar: {
    width: "100%",
    aspectRatio: "1/1",
    maxWidth: 200,
    maxHeight: 200,
  },
  name: {
    padding: "10px 5px 0 5px",
    fontSize: "large",
    fontWeight: "bold",
  },
  ball: {
    width: "25%",
    aspectRatio: "1/1",
    borderRadius: "50%",
    border: "2px solid lightgray",
    position: "absolute",
    right: 0,
    top: 0,
    margin: 5,
  },
};

function NameCard(props: INameCard) {
  const { name, hasBall, passBall } = props;

  return (
    <div style={styles.cardWrapper} onClick={passBall}>
      <div>
        <img alt={name} src={avatar} style={styles.avatar} />
      </div>
      <div style={styles.name}>{name}</div>
      <div style={hasBall ? { display: "block" } : { display: "none" }}>
        <img style={styles.ball} alt="football" src={football} />
      </div>
    </div>
  );
}

export default NameCard;
