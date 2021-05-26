import React from "react";
import PlayComponent from "./PlayComponent";

const Footer: React.FC<{ paused: boolean; accessToken: string; deviceId: string; currentTrackId: string; currentTrackName: string }> = (props) => {
  return (
    // <div className="footer fixed-bottom">
    //   <footer>
    //     <div className="container">
    //       <div className="row">
    //         <div className="col-3">this is the first text</div>
    //         <div className="col-6">
    //           this is the second text
    //           <PlayComponent paused={props.paused} accessToken={props.accessToken} deviceId={props.deviceId} />
    //         </div>
    //         <div className="col-3">this is the third text</div>
    //       </div>
    //     </div>
    //   </footer>
    //   <script
    //     src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
    //     integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
    //     crossOrigin="anonymous"
    //   ></script>
    //   <script
    //     src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js"
    //     integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT"
    //     crossOrigin="anonymous"
    //   ></script>
    //   {/* Called of font style  file */}
    // </div>
    <>
      <div className="footerleft col-3">
        {/* <p>{props.currentTrackId}</p> */}
        <p>{props.currentTrackName}</p>
      </div>
      <div className="footermidle col-6">
        <PlayComponent paused={props.paused} accessToken={props.accessToken} deviceId={props.deviceId} />
      </div>
      <div className="footerright col-3">this is the third text</div>
    </>
  );
};

export default Footer;
