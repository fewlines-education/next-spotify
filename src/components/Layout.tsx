import React from "react";
import Head from "next/head";
import NavBar from "./NavBar";
import SideBar from "./sidenavbar";

import NavBar from "./navbar";

import Footer from "./Footer";


type Props = {
  isLoggedIn: boolean;
  spotifyLoginUrl?: string;
  paused: boolean;
  accessToken: string;
  deviceId: string;
};


  export const Layout: React.FC<Props> = ({ children, isLoggedIn, spotifyLoginUrl, paused, accessToken, deviceId }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/css/bootstrap.min.css"
          rel="stylesheet"
          integrity="sha384-+0n0xVW2eSR5OomGNYDnhzAbDsOXxcvSN1TPprVMTNDbiYZCxYbOOl7+AMvyTG2x"
          crossOrigin="anonymous"
        ></link>
        {/* <script
          src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js"
          integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p"
          crossOrigin="anonymous"
        ></script>
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.1/dist/js/bootstrap.min.js"
          integrity="sha384-Atwg2Pkwv9vp0ygtn1JAojH0nYbwNJLPhwyoVbhoPwBhjQPR5VtM2+xf0Uwh9KtT"
          crossOrigin="anonymous"
        ></script> */}
      </Head>

      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            SIDEBAR
            <SideBar/>
          </div>
          <div className="col-9">
          <NavBar isLoggedIn={isLoggedIn} spotifyLoginUrl={spotifyLoginUrl}/>
            CHILDREN<main>{children}</main>
          </div>
        </div>
        <div className="row">
          <Footer paused={paused} accessToken={accessToken} deviceId={deviceId} />
        </div>
      </div>
    </>
  );
};

export default Layout;
