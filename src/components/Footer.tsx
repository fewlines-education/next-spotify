import React from "react";
import PlayComponent from "./PlayComponent";

const Footer: React.FC<{ paused: boolean; accessToken: string; deviceId: string }> = (props) => {
  return (
    <div className="footer fixed-bottom">
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-3">this is the first text</div>
            <div className="col-6">
              this is the second text
              <PlayComponent paused={props.paused} accessToken={props.accessToken} deviceId={props.deviceId} />
            </div>
            <div className="col-3">this is the third text</div>
          </div>
        </div>
      </footer>

      {/* Called of font style  file */}
    </div>
  );
};

export default Footer;
