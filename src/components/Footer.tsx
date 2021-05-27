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
      <footer className="fixed-bottom w-100 greenSF" style={{ height: 110 }}>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-3 d-none d-md-block">
              chanson
              <p>{props.currentTrackName}</p>
            </div>
            <div className="col-md-6 col-12">
              <PlayComponent
                paused={props.paused}
                accessToken={props.accessToken}
                deviceId={props.deviceId}
                trackId={props.trackId}
              />
            </div>
            <div className="col-md-3 d-none d-md-block">
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
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
