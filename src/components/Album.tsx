import React from "react";

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

const Album: React.FC<AlbumType> = (props) => {
  return (
    <div>
      <h1>{props.title}</h1>
      <img src={props.image} />
      <p>nombre de titre : {props.tracksNb}</p>
      <p>Liste des titres : </p>
      <ul>
        { props.tracks ? props.tracks.map((track, i) => 
        <li key= {i}>{track.name }</li>) : "no tracks"
        }
      </ul>
      <p>soundTimeMs: {props.soundTimeMs}</p>
    </div>
  );
};

export default Album;
