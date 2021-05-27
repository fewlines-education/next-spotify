import React from "react";
import Head from "next/head";
import NavBar from "./NavBar";
import SideBar from "./sidenavbar";
import Footer from "./Footer";

type Props = {
  isLoggedIn: boolean;
  spotifyLoginUrl?: string;
  paused: boolean;
  accessToken: string;
  deviceId: string;
  currentTrackId: string;
  currentTrackName: string;
  trackId: string;
  currentTrack: string;
};

export const Layout: React.FC<Props> = ({
  children,
  isLoggedIn,
  spotifyLoginUrl,
  paused,
  accessToken,
  deviceId,
  currentTrackId,
  currentTrackName,
  trackId,
}) => {
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
        <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@900&family=Montserrat:wght@600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="container-fluid">
        <div className="row">
          <div className="sideBar col-2">
            <SideBar />
          </div>
          <div className="col-10">
            <NavBar accessToken={accessToken} isLoggedIn={isLoggedIn} spotifyLoginUrl={spotifyLoginUrl} />
            <main className="mainBody">{children}</main>
          </div>
        </div>

        <div className="row">
          <Footer
            currentTrackId={currentTrackId}
            currentTrackName={currentTrackName}
            paused={paused}
            accessToken={accessToken}
            deviceId={deviceId}
            trackId={trackId}
          />
        </div>
      </div>
    </>
  );
};

export default Layout;
