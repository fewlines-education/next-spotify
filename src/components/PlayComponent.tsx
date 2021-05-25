import React from "react";
import { pause, play } from "../pages/player";

const PlayComponent: React.FC<{ paused: boolean; accessToken: string; deviceId: string }> = (props) => {
  return (
    <footer className="PlayComponent">
      <i className="ButtonNextLeft fa fa-step-backward" aria-hidden="true"></i>

      <span
        className="ButtonPlayAndPause"
        onClick={() => {
          props.paused ? play(props.accessToken, props.deviceId) : pause(props.accessToken, props.deviceId);
        }}
      >
        {props.paused ? (
          <i className="fa fa-play-circle" aria-hidden="true"></i>
        ) : (
          <i className="fa fa-pause-circle" aria-hidden="true"></i>
        )}
      </span>

      <i className="ButtonNextRight fa fa-step-forward" aria-hidden="true"></i>
    </footer>
  );
};

export default PlayComponent;

//37i9dQZF1DWXncK9DGeLh7
