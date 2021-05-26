import { NextPage, GetServerSidePropsContext } from "next";
import useSpotifyPlayer from "../hooks/useSpotifyPlayer";
import Cookies from "cookies";
import useSWR from "swr";
import { Layout } from "../components/Layout";
import React from "react";
import { SpotifyState, SpotifyTrack, SpotifyUser } from "../types/spotify";
import Album from "../components/Album";

interface Props {
  user: SpotifyUser;
  accessToken: string;
}

type AlbumType = {
  id: string;
  image: string;
  title: string;
  soundTimeMs: number;
  tracksNb: number;
  tracks: Track[];
};

type Track = {
  id: string;
  name: string;
  numberInList: number;
  soundTimeMs: number;
  artist: string;
};

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

export const nextTrackButton = (accessToken: string, deviceId: string) => {
  return fetch(`https://api.spotify.com/v1/me/player/next?device_id=${deviceId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

export const previousTrackButton = (accessToken: string, deviceId: string) => {
  return fetch(`https://api.spotify.com/v1/me/player/previous?device_id=${deviceId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const Player: NextPage<Props> = ({ accessToken }) => {
  const { data, error } = useSWR("/api/get-user-info");
  const [paused, setPaused] = React.useState(true);
  const [currentTrack, setCurrentTrack] = React.useState<any | null>(null);
  const [currentTrack2, setCurrentTrack2] = React.useState<any | null>(null);
  const [nextTrack, setNextTrack] = React.useState<SpotifyTrack[]>();
  const [previousTrack, setPreviousTrack] = React.useState<SpotifyTrack[]>();

  const trackArray: Track[] = [
    {
      id: "12345",
      name: "Toto",
      numberInList: 59,
      soundTimeMs: 15000,
      artist: "Tata",
    },
  ];

  const tempAlbum: AlbumType = {
    id: "37i9dQZF1DWXncK9DGeLh7",
    image: "https://i.scdn.co/image/ab67616d00001e029db4d4e3550dd76488583195",
    title: "Album gratuit, vol. 6",
    soundTimeMs: 100000,
    tracksNb: 13,
    tracks: trackArray,
  };

  const [currentAlbum, setCurrentAlbum] = React.useState<any | null>(null);
  const [currentAlbumShortInfo, setCurrentAlbumShortInfo] = React.useState<any | null>(null);
  const [deviceId, player] = useSpotifyPlayer(accessToken);
  const [currentTrackId, setCurrentTrackId] = React.useState();

  const [currentAlbumId, setCurrentAlbumId] = React.useState<any | null>(null);

  const album = async (accessToken: string) => {
    return await fetch(`https://api.spotify.com/v1/albums/${currentAlbumId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setCurrentAlbum({
          id: result.id,
          image: result.images && result.images.url ? result.images.url[1] : "emptyImageUrl",
          title: result.name,
          soundTimeMs: result.tracks
            ? result.tracks.items.map((track: any) => track.duration_ms).reduce((a: any, b: any) => a + b)
            : 120000,
          tracksNb: result.total_tracks,
          tracks: result.tracks ? result.tracks.items : trackArray,
        });
      });
  };

  React.useEffect(() => {
    const playerStateChanged = (state: SpotifyState) => {
      setPaused(state.paused);
      const spotifyTrack: SpotifyTrack = state.track_window.current_track;
      const spotifyNextTrack: SpotifyTrack[] = state.track_window.next_tracks;
      const spotifyPreviousTrack: SpotifyTrack[] = state.track_window.previous_tracks;

      setCurrentTrack(spotifyTrack.name);
      setCurrentAlbumShortInfo(spotifyTrack.album);
      setCurrentAlbumId(spotifyTrack.album.uri.split(":")[2]);
      setNextTrack(
        spotifyNextTrack.map((track) => {
          return track;
        }),
      );
      setPreviousTrack(
        spotifyPreviousTrack.map((track) => {
          return track;
        }),
      );
    };

    if (player) {
      player.addListener("player_state_changed", playerStateChanged);
    }
    return () => {
      if (player) {
        player.removeListener("player_state_changed", playerStateChanged);
      }
    };
  }, [
    player,
    currentTrackId,
    currentAlbumId,
    currentTrack,
    currentAlbum,
    currentAlbumShortInfo,
    nextTrack,
    previousTrack,
  ]);

  if (error) return <div>failed to load</div>;

  if (!data) return <div>loading...</div>;
  const user = data;

  return (
    <Layout currentTrack={currentTrack} isLoggedIn={true} paused={paused} accessToken={accessToken} deviceId={deviceId}>
      <h1>Player</h1>
      <p>Welcome {user && user.display_name}</p>
      <p>Track : {currentTrack ? currentTrack : "not yet"}</p>
      {/* <p>Album : {currentTrack ? currentTrack.album : "not yet"}</p> */}
      <p>Album : {currentAlbumShortInfo ? currentAlbumShortInfo.name : "not yet"}</p>
      <Album
        id={currentAlbumShortInfo ? currentAlbumShortInfo.uri.split(":")[2] : tempAlbum.id}
        image={
          currentAlbumShortInfo && currentAlbumShortInfo.images && currentAlbumShortInfo.images[0].url
            ? currentAlbumShortInfo.images[0].url
            : tempAlbum.image
        }
        title={currentAlbumShortInfo ? currentAlbumShortInfo.name : tempAlbum.title}
        tracksNb={currentAlbum ? currentAlbum.tracksNb : tempAlbum.tracksNb}
        soundTimeMs={currentAlbum ? currentAlbum.soundTimeMs : tempAlbum.soundTimeMs}
        tracks={currentAlbum ? currentAlbum.tracks : tempAlbum.tracks}
      />
      <button onClick={() => album(accessToken)}>Button</button>
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
