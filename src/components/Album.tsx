import React from "react";
import { pause, play } from "../pages/player";

const Album: React.FC<any> = (props) => {
  // setCurrentTrackId;
  // console.log("------------TRACK ID---------", {track.id});
  return (
    <div>
      <h1>{props.name}</h1>
      <img src={props.image} />
      <p>nombre de titres : {props.tracks.length}</p>
      <p>Liste des titres :</p>
      <ul>
        {props.tracks
          ? props.tracks.map((track: any, i: number) => (
              <li key={i}>
                <span
                  className="ButtonPlayAndPause"
                  onClick={() => {
                    props.paused
                      ? play(props.accessToken, props.deviceId, track.id)
                      : pause(props.accessToken, props.deviceId);
                    //props.fn(track.id);
                  }}
                >
                  {props.paused ? (
                    <i className="fa fa-play-circle" aria-hidden="true"></i>
                  ) : (
                    <i className="fa fa-pause-circle" aria-hidden="true"></i>
                  )}
                </span>
                {track.name} {(track.duration_ms * 1.6666666666667e-5).toFixed(2)}
              </li>
            ))
          : "no tracks"}
      </ul>
      <p>
        soundTimeMs:{" "}
        {Math.floor((props.duration_ms / (1000 * 60 * 60)) % 24) >= 1 ? (
          <p>
            {Math.floor((props.duration_ms / (1000 * 60 * 60)) % 24)} h{" "}
            {Math.floor(props.duration_ms / (1000 * 60)) % 60} min
          </p>
        ) : (
          <p>
            {Math.floor(props.duration_ms / 60000)} min {((props.duration_ms % 60000) / 1000).toFixed(0)} s
          </p>
        )}
      </p>
    </div>
  );
};

export default Album;
