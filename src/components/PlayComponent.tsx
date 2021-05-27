import React from "react";
import { pause, play, nextTrackButton, previousTrackButton } from "../pages/player";

const PlayComponent: React.FC<{
  paused: boolean;
  accessToken: string;
  deviceId: string;
  trackId: string;
}> = (props) => {
  return (
    <footer className="PlayComponent">
      <i
        onClick={() => previousTrackButton(props.accessToken, props.deviceId)}
        className="ButtonNextLeft fa fa-step-backward"
        aria-hidden="true"
      ></i>

      <span
        className="ButtonPlayAndPause"
        onClick={() => {
          props.paused
            ? play(props.accessToken, props.deviceId, props.trackId)
            : pause(props.accessToken, props.deviceId);
        }}
      >
        {props.paused ? (
          <i className="fa fa-play-circle" aria-hidden="true"></i>
        ) : (
          <i className="fa fa-pause-circle" aria-hidden="true"></i>
        )}
      </span>

      <i
        className="ButtonNextRight fa fa-step-forward"
        aria-hidden="true"
        onClick={() => nextTrackButton(props.accessToken, props.deviceId)}
      ></i>
    </footer>
  );
};

export default PlayComponent;

//37i9dQZF1DWXncK9DGeLh7
