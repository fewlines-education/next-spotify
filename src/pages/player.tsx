import { NextPage, GetServerSidePropsContext } from "next";
import useSpotifyPlayer from "../hooks/useSpotifyPlayer";
import Cookies from "cookies";
import useSWR from "swr";
import { Layout } from "../components/Layout";
import React from "react";
import { SpotifyState, SpotifyUser } from "../types/spotify";
import { pathToFileURL } from "url";

interface Props {
  user: SpotifyUser;
  accessToken: string;
}

export const play = (accessToken: string, deviceId: string) => {
  return fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      uris: ["spotify:track:4FnWH9l7gxQmrNpfA5AZKP"],
    }),
  });
};

export const pause = (accessToken: string, deviceId: string) => {
  return fetch(`https://api.spotify.com/v1/me/player/pause?device_id=${deviceId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const getAlbum = (accessToken: string) => {
  return fetch(`https://api.spotify.com/v1/albums/7tB40pGzj6Tg0HePj2jWZt`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  }).then((album) => {
    return album.json();
  });
};

// export const nextTrack = (accessToken: string, currentAlbum: string) => {
//   return fetch(`https://api.spotify.com/v1/albums/${currentAlbum}/tracks`, {
//     method: "PUT",
//     headers: {
//       Authorization: `Bearer ${accessToken}`,
//     },
//     body: JSON.stringify({
//       uris: [`spotify:album:${currentAlbum}`],
//     }),
//   });
// };

export const nextTrack = (accessToken: string, deviceId: string) => {
  return fetch(`https://api.spotify.com/v1/me/player/next?device_id=${deviceId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

//https://api.spotify.com/v1/albums/{id}/tracks
//https://open.spotify.com/playlist/37i9dQZF1DWXncK9DGeLh7?si=f3268d0933014f8e

const Player: NextPage<Props> = ({ accessToken }) => {
  const { data, error } = useSWR("/api/get-user-info");
  const [paused, setPaused] = React.useState(true);
  const [currentTrack, setCurrentTrack] = React.useState("");
  const [currentAlbumId, setCurrentAlbumId] = React.useState("37i9dQZF1DWXncK9DGeLh7");
  const [deviceId, player] = useSpotifyPlayer(accessToken);

  // const [currentAlbum, setCurrentAlbum] = React.useState("7tB40pGzj6Tg0HePj2jWZt");
  React.useEffect(() => {
    const playerStateChanged = (state: SpotifyState) => {
      setPaused(state.paused);
      setCurrentTrack(state.track_window.current_track.name);
    };
    if (player) {
      player.addListener("player_state_changed", playerStateChanged);
    }
    return () => {
      if (player) {
        player.removeListener("player_state_changed", playerStateChanged);
      }
    };
  }, [player]);

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;
  const user = data;

  // console.log("ALBUMALBUM", getAlbum(accessToken, currentAlbum));

  // nextTrack(accessToken, deviceId).then((nextTrackResponse) =>
  // console.log(nextTrackResponse.json()));

  // const testVar = nextTrack(accessToken, deviceId);
  // console.log("===================",testVar);
  //console.log("________________", await nextTrack(accessToken, deviceId));

  return (
    <Layout currentTrack={currentTrack} isLoggedIn={true} paused={paused} accessToken={accessToken} deviceId={deviceId}>
      <h1>Player</h1>
      <p>Welcome {user && user.display_name}</p>
      <p>{currentTrack}</p>
      {/* //////////////////////////////////////////////////////////
      ///// LE BOUTON EST DEPLACE DANS LE FOOTER + PLAYCOMPONENT////
      ////////////////////////////////////////////////////////// */}
      {/* <button
        onClick={() => {
          paused ? play(accessToken, deviceId) : pause(accessToken, deviceId);
        }}
      >
        {paused ? "play" : "stop"}
      </button> */}

      <button onClick={() => getAlbum(accessToken)}>Button</button>
      {/* <Footer paused={paused} accessToken={accessToken} deviceId={deviceId} /> */}
    </Layout>
  );
};
export default Player;

export const getServerSideProps = async (context: GetServerSidePropsContext): Promise<unknown> => {
  const cookies = new Cookies(context.req, context.res);
  const accessToken = cookies.get("spot-next");
  if (accessToken) {
    return { props: { accessToken } };
  } else {
    return {
      props: {},
      redirect: {
        permanent: false,
        destination: "/",
      },
    };
  }
};
