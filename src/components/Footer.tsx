import React from "react";
import PlayComponent from "./PlayComponent";
import { volumeSlider } from "../pages/player";

const Footer: React.FC<{
  paused: boolean;
  accessToken: string;
  deviceId: string;
  currentTrackId: string;
  currentTrackName: string;
  trackId: string;
  volumePercent: number;
  songPosition: number;
}> = (props) => {
  const [volume, setVolume] = React.useState<number>(0);
  return (
    <>
      <div className="footerleft col-3">
        {/* <p>{props.currentTrackId}</p> */}
        <p>{props.currentTrackName}</p>
      </div>
      <div className="footermidle col-6">
        <PlayComponent
          songPosition={props.songPosition}
          paused={props.paused}
          accessToken={props.accessToken}
          deviceId={props.deviceId}
          trackId={props.trackId}
        />
      </div>
      <div className="footerright col-3">
        <label className="form-label" htmlFor="customRange1">
          Volume
        </label>
        <div className="range">
          <input
            onClick={() => volumeSlider(props.accessToken, volume, props.deviceId)}
            value={volume}
            type="range"
            className="form-range"
            id="customRange1"
            onChange={(e) => setVolume(parseInt(e.target.value))}
          />
        </div>
      </div>
    </>
  );
};

export default Footer;
