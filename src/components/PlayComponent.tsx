import React from "react";
import { pause, play, nextTrackButton, previousTrackButton, songSlider } from "../pages/player";

const PlayComponent: React.FC<{
  paused: boolean;
  accessToken: string;
  deviceId: string;
  trackId: string;
  songPosition: number;
}> = (props) => {
  const [songPosition, setSongPosition] = React.useState<number>(props.songPosition);
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
      <div className="footerright col-3">
        <label className="form-label" htmlFor="customRange1">
          Position
        </label>
        <div className="range">
          <input
            onClick={() => songSlider(props.accessToken, songPosition, props.deviceId)}
            value={songPosition}
            type="range"
            className="form-range"
            id="customRange1"
            onChange={(e) => setSongPosition(parseInt(e.target.value))}
          />
        </div>
      </div>
    </footer>
  );
};

export default PlayComponent;

//37i9dQZF1DWXncK9DGeLh7
