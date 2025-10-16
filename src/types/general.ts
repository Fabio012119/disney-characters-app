export type Character = {
  _id: string;
  name: string;
  imageUrl?: string;
  films?: string[];
  tvShows?: string[];
  videoGames?: string[];
  allies?: string[];
  enemies?: string[];
};
