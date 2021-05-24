import React from "react";
import Head from "next/head";

type Props = {
  isLoggedIn: boolean;
  spotifyLoginUrl?: string;
};

const NavBar: React.FC<Props> = ({ isLoggedIn, spotifyLoginUrl }) => {
  return (
    <nav>
      <p>
        <a href="/">Home</a>
      </p>
      {isLoggedIn ? (
        <>
          <p>
            <a href="/api/logout">logout</a>
          </p>
        </>
      ) : (
        <p>
          <a href={spotifyLoginUrl}>login</a>
        </p>
      )}
    </nav>
  );
};

export const Layout: React.FC<Props> = ({ children, isLoggedIn, spotifyLoginUrl }) => {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
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
      <NavBar isLoggedIn={isLoggedIn} spotifyLoginUrl={spotifyLoginUrl} />
      <main>{children}</main>
    </>
  );
};
