import { GetStaticProps } from "next";
import { format, parseISO } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

import api from "../services/api";
import { convertDurationToTimeString } from "../utils/convertDurationToTimeString";

type HomeProps = {
  episodes: Episodes[];
};

type Episodes = {
  id: string;
  title: string;
  members: string;
  thumbnail: string;
  numbers: string;
  publishedAt: string;
  description: string;
  durationAsString: string;
  url: string;
};

export default function Home(props: HomeProps) {
  return (
    <div>
      <h1>Data</h1>
      <p>{JSON.stringify(props.episodes)}</p>
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get("episodes", {
    params: {
      _limit: 12,
      _sort: "published_at",
      _order: "desc",
    },
  });

  const episodes = data.map((episode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), "d MMM yy", {
        locale: ptBR,
      }),
      description: episode.description,
      durationAsString: convertDurationToTimeString(
        Number(episode.file.duration)
      ),
      duration: Number(episode.file.duration),
      url: episode.file.url,
    };
  });

  return {
    props: {
      episodes: episodes,
    },
    revalidate: 60 * 60 * 8, // 8 hours
  };
};
