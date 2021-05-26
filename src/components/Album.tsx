import React from "react";

const Album: React.FC<AlbumType> = (props) => {
  return (
    <div>
      <h1>{props.name}</h1>
      <img src={props.image} />
      <p>nombre de titres : {props.tracks.length}</p>
      <p>Liste des titres : </p>

      <ul>
        { props.tracks ? props.tracks.map((track, i) => 
        <li key= {i}>{track.name }</li>) : "no tracks"
        }
      </ul>
      <p>soundTimeMs: {props.duration_ms}</p>

    </div>
  );
};

export default Album;
