import React from "react";
import PlayComponent from "./PlayComponent";

const Footer: React.FC<{
  paused: boolean;
  accessToken: string;
  deviceId: string;
  currentTrackId: string;
  currentTrackName: string;
  trackId: string;
}> = (props) => {
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
          paused={props.paused}
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
