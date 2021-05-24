import React from "react";
import PlayComponent from "./PlayComponent";

const Footer: React.FC<{ paused: boolean; accessToken: string; deviceId: string }> = (props) => {
  return (
    <>
      <div className="col-3">this is the first text</div>
      <div className="col-6 justify-content-center">
        this is the second text
        <PlayComponent paused={props.paused} accessToken={props.accessToken} deviceId={props.deviceId} />
      </div>
      <div className="col-3">this is the third text</div>
    </>
  );
};

export default Footer;
