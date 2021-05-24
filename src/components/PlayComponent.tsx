import React from "react";
import { pause, play } from "../pages/player";

const PlayComponent: React.FC<{ paused: boolean; accessToken: string; deviceId: string }> = (props) => {
  return (
    <div>previous
      <button
        className={props.paused ? "button play" : "button pause"}
        onClick={() => {
          props.paused ? play(props.accessToken, props.deviceId) : pause(props.accessToken, props.deviceId);
        }}
      >
        {/* {props.paused ? "play" : "stop"} */}
      </button>next
    </div>
  );
};

export default PlayComponent;


//37i9dQZF1DWXncK9DGeLh7