import React, { useEffect, useState, useContext } from "react";
import { GlobalContext } from "./context/GlobalState";
export default function Ant(props) {
  const { time } = useContext(GlobalContext);
  const [position, setPosition] = useState(props.position);
  // eslint-disable-next-line
  const [ant, setAnt] = useState();
  // eslint-disable-next-line
  const [antTime, setAntTime] = useState(time);
  // eslint-disable-next-line
  const [antDir, setAntDir] = useState(Math.floor(Math.random() * 2));
  let postemp = position;
  console.log("add", postemp);
  // eslint-disable-next-line
  const cb = () => {
    setPosition(position + 1);
  };

  const setPos = (cb) => {
    if (props.timenow === 27) {
      return position;
    }
    if (props.timenow > 0) {
      // console.log(postemp);
      // let f = position
      // cb()
      postemp = postemp + 1;
      console.log("tem", postemp);

      return postemp;
    }
  };

  useEffect(() => {
    // setPosition((props.timenow - 26) +1)
  }, [props.timenow]);
  // eslint-disable-next-line
  function reposition() {}

  return (
    <div className="ant">
      Ant {props.ant}
      {/* <p>Timer: {props.timenow} </p> */}
      <p>Position: {setPos()} </p>
      <p>Direction:{antDir === 0 ? "right" : "left"}</p>
    </div>
  );
}
