import React from "react";

const Album: React.FC<AlbumType> = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <img src={props.image} />
      <p>nombre de titres : {props.tracks.length}</p>
      <p>Liste des titres : </p>

      <ul>{props.tracks ? props.tracks.map((track, i) => <li key={i}>{track.name}</li>) : "no tracks"}</ul>

      {Math.floor((props.duration_ms / (1000 * 60 * 60)) % 24) >= 1 ? (
        <p>
          {Math.floor((props.duration_ms / (1000 * 60 * 60)) % 24)} h {Math.floor(props.duration_ms / (1000 * 60)) % 60}{" "}
          min
        </p>
      ) : (
        <p>
          {Math.floor(props.duration_ms / 60000)} min {((props.duration_ms % 60000) / 1000).toFixed(0)} s
        </p>
      )}
    </div>
  );
};

export default Album;
