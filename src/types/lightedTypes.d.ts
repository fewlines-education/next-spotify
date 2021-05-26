type AlbumType = {
  id: string;
  image: string;
  name: string;
  duration_ms: number;
  tracks: Track[];
};

type Track = {
  id: string;
  name: string;
  duration_ms: number;
  artistsIds: string[];
  albumId: string;
};

type Artist = {
  id: string;
  name: string;
};
