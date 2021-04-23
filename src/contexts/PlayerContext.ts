import { createContext} from "react";

type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  togglePlay: () => void;
  setPlayingState: (boolean) => void;
  play: (episode: Episode) => void;
};

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
};

export const PlayerContext = createContext({} as PlayerContextData);
