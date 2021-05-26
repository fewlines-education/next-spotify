import React from "react";
import PlayComponent from "./PlayComponent";

const Footer: React.FC<{
  paused: boolean;
  accessToken: string;
  deviceId: string;
  currentTrack: string;
}> = (props) => {
  return (
    <>
      <div className="footerleft col-3">
        <p>{props.currentTrack}</p>
      </div>
      <div className="footermidle col-6">
        <PlayComponent paused={props.paused} accessToken={props.accessToken} deviceId={props.deviceId} />
      </div>
      <div className="footerright col-3">this is the third text</div>
    </>
  );
};

export default Footer;
