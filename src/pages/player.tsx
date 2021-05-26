import { NextPage, GetServerSidePropsContext } from "next";
import useSpotifyPlayer from "../hooks/useSpotifyPlayer";
import Cookies from "cookies";
import useSWR from "swr";
import { Layout } from "../components/Layout";
import React from "react";
import { SpotifyState, SpotifyTrack, SpotifyUser, SpotifyArtist } from "../types/spotify";
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

  const [paused, setPaused] = React.useState(true);

  const trackArray: Track[] = [
    {
      id: "12345",
      name: "Toto",
      duration_ms: 15000,
      artistsIds: ["123"],
      albumId: "GJFHZRK9820947",
    },
  ];

  const [paused, setPaused] = React.useState(true);
  const [deviceId, player] = useSpotifyPlayer(accessToken);
  const [currentTrackId, setCurrentTrackId] = React.useState("");
  const [currentTrackName, setCurrentTrackName] = React.useState("");
  const [currentTrackDuration_Ms, setCurrentTrackDuration_Ms] = React.useState(0);
  const [currentTrackArtistsIds, setCurrentTrackArtistsIds] = React.useState([""]);
  const [currentAlbumId, setCurrentAlbumId] = React.useState<any | null>(null);
  const [currentAlbumName, setCurrentAlbumName] = React.useState("");
  const [currentAlbumImage, setCurrentAlbumImage] = React.useState("");
  const [currentAlbumDuration_Ms, setCurrentAlbumDuration_Ms] = React.useState(0);
  const [currentAlbumTrackList, setCurrentAlbumTrackList] = React.useState([]);

  const album = async (accessToken: string, idOfAlbum: string) => {
    return await fetch(`https://api.spotify.com/v1/albums/${idOfAlbum}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        setCurrentAlbumName(result.name);
        setCurrentAlbumImage(result.images ? result.images[1].url : "emptyImageUrl");
        setCurrentAlbumDuration_Ms(
          result.tracks
            ? result.tracks.items.map((track: any) => track.duration_ms).reduce((a: any, b: any) => a + b)
            : 120000,
        );
        setCurrentAlbumTrackList(result.tracks ? result.tracks.items : trackArray);
      });
  };

  const track = async (accessToken: string, idOfTrack: string) => {
    return await fetch(`https://api.spotify.com/v1/tracks/${idOfTrack}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((result) => {
        const spotifyArtistsIdsExtracted: string[] = result.artists ? result.artists.map(
          (artist: SpotifyArtist) => artist.uri.split(":")[2],
        ) : [""];
        setCurrentTrackName(result.name);
        setCurrentTrackDuration_Ms(result.duration_ms);
        setCurrentTrackArtistsIds(spotifyArtistsIdsExtracted);
        setCurrentAlbumId(result.album ? result.album.uri.split(":")[2]: "123");
      });
  };

  React.useEffect(() => {
    const playerStateChanged = (state: SpotifyState) => {
      setPaused(state.paused);

      setCurrentTrackId(state.track_window.current_track.id);
      setCurrentAlbumId(state.track_window.current_track.album.uri.split(":")[2]);
    };

    if (player) {
      player.addListener("player_state_changed", playerStateChanged);
    }
    return () => {
      if (player) {
        player.removeListener("player_state_changed", playerStateChanged);
      }
    };
  }, [player, currentAlbumId, currentTrackId]);

  if (error) return <div>failed to load</div>;

  if (!data) return <div>loading...</div>;
  const user = data;

  // const currentAlbum: AlbumType = await album(accessToken, currentAlbumId);
  // const currentTrack: Track = track(accessToken, currentTrackId);

  return (
    <Layout
      currentTrackId={currentTrackId}
      currentTrackName={currentTrackName}
      isLoggedIn={true}
      paused={paused}
      accessToken={accessToken}
      deviceId={deviceId}
    >
      <h1>Player</h1>
      <p>Welcome {user && user.display_name}</p>
      <p>Track : {currentTrackName}</p>
      <p>Album : {currentAlbumName}</p>
      <Album
        id={currentAlbumId}
        image={currentAlbumImage}
        name={currentAlbumName}
        duration_ms={currentAlbumDuration_Ms}
        tracks={currentAlbumTrackList}
      />
      <button onClick={() => track(accessToken, currentTrackId)}>Button Track</button>
      <button onClick={() => album(accessToken, currentAlbumId)}>Button Album</button>
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
