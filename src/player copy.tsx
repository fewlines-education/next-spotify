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

export const nextTrack = (accessToken: string, deviceId: string) => {
  return fetch(`https://api.spotify.com/v1/me/player/next?device_id=${deviceId}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
};

const Player: NextPage<Props> = ({ accessToken }) => {
  const { data, error } = useSWR("/api/get-user-info");

  const trackArray: Track[] = [
    {
      id: "12345",
      name: "Toto",
      duration_ms: 15000,
      artists: [{ id: "123", name: "Tata" }],
      albumId: "GJFHZRK9820947",
    },
  ];

  const tempAlbum: AlbumType = {
    id: "37i9dQZF1DWXncK9DGeLh7",
    image: "https://i.scdn.co/image/ab67616d00001e029db4d4e3550dd76488583195",
    title: "Album gratuit, vol. 6",
    duration_ms: 100000,
    tracksNb: 13,
    tracks: trackArray,
  };

  const [paused, setPaused] = React.useState(true);
  const [currentTrack, setCurrentTrack] = React.useState<any | null>(null);
  const [currentAlbum, setCurrentAlbum] = React.useState<any | null>(null);
  // const [currentAlbumShortInfo, setCurrentAlbumShortInfo] = React.useState<any|null>(null);
  const [deviceId, player] = useSpotifyPlayer(accessToken);
  // const [currentTrackId, setCurrentTrackId] = React.useState();
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
        const spotifyAlbumExtracted: AlbumType = {
          id: result.id,
          image: result.images && result.images.url ? result.images.url[1] : "emptyImageUrl",
          title: result.name,
          duration_ms: result.tracks
            ? result.tracks.items.map((track: any) => track.duration_ms).reduce((a: any, b: any) => a + b)
            : 120000,
          tracksNb: result.total_tracks,
          tracks: result.tracks ? result.tracks.items : trackArray,
        };

        setCurrentAlbum(spotifyAlbumExtracted);
        // id: result.id,
        // image: result.images && result.images.url ? result.images.url[1] : "emptyImageUrl",
        // title: result.name,
        // soundTimeMs: result.tracks ? result.tracks.items.map((track: any) => track.duration_ms).reduce((a: any,b: any) => a + b) : 120000,
        // tracksNb: result.total_tracks,
        // tracks: result.tracks ? result.tracks.items : trackArray,
      });
  };

  React.useEffect(() => {
    const playerStateChanged = (state: SpotifyState) => {
      setPaused(state.paused);
      //const spotifyTrack: SpotifyTrack = state.track_window.current_track;

      const spotifyArtistsExtracted: Artist[] = state.track_window.current_track.artists.map((artist) => {
        return {
          id: artist.uri.split(":")[2],
          name: artist.name,
        };
      });

      const spotifyTrackExtracted: Track = {
        id: state.track_window.current_track.id,
        name: state.track_window.current_track.name,
        duration_ms: state.track_window.current_track.duration_ms,
        artists: spotifyArtistsExtracted,
        albumId: state.track_window.current_track.album.uri.split(":")[2],
      };

      setCurrentTrack(spotifyTrackExtracted);
      setCurrentAlbumId(spotifyTrackExtracted.albumId);
    };

    if (player) {
      player.addListener("player_state_changed", playerStateChanged);
    }
    return () => {
      if (player) {
        player.removeListener("player_state_changed", playerStateChanged);
      }
    };
  }, [player, currentAlbumId, currentTrack, currentAlbum]);

  if (error) return <div>failed to load</div>;

  if (!data) return <div>loading...</div>;
  const user = data;

  return (
    <Layout currentTrack={currentTrack} isLoggedIn={true} paused={paused} accessToken={accessToken} deviceId={deviceId}>
      <h1>Player</h1>
      <p>Welcome {user && user.display_name}</p>
      <p>Track : {currentTrack ? currentTrack.name : "not yet"}</p>
      <p>Album : {currentAlbum ? currentAlbum.name : "not yet"}</p>
      <Album
        id={currentAlbum ? currentAlbum.id : tempAlbum.id}
        image={currentAlbum && currentAlbum.image ? currentAlbum.image : tempAlbum.image}
        title={currentAlbum ? currentAlbum.name : tempAlbum.title}
        tracksNb={currentAlbum ? currentAlbum.tracksNb : tempAlbum.tracksNb}
        duration_ms={currentAlbum ? currentAlbum.soundTimeMs : tempAlbum.duration_ms}
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
