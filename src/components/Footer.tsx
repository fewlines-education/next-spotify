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
    < footer className="fixed-bottom w-100 greenSF" style={{height: 110}}>
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3 d-none d-md-block">
          chanson
        <p>{props.currentTrackName}</p>

        </div>
        <div className="col-md-6 col-12">
          <PlayComponent
d={props.paused}
          accessToken={props.accessToken}
          deviceId={props.deviceId}
          trackId={props.trackId}
        />
        </div>
        <div className="col-md-3 d-none d-md-block">
          volume
        </div>
      </div>
      </div>

      </footer>

    </>
  );
};

export default Footer;
