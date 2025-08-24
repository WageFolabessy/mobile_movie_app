import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!;
console.log(DATABASE_ID, COLLECTION_ID);

const client = new Client()
  .setEndpoint("https://syd.cloud.appwrite.io/v1")
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);
const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal("searchTerm", query),
    ]);

    if (result.documents.length > 0) {
      const existingMovie = result.documents[0];
      await database.updateDocument(
        DATABASE_ID,
        COLLECTION_ID,
        existingMovie.$id,
        { count: existingMovie.count + 1 }
      );
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm: query,
        movie_id: movie.id,
        count: 1,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        title: movie.title,
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
        releaseDate: movie.release_date,
        originalLanguage: movie.original_language,
      });
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<TrendingMovie[]> => {
  try {
    const result: any = await database.listDocuments(
      DATABASE_ID,
      COLLECTION_ID,
      [Query.limit(5), Query.orderDesc("count")]
    );

    const docs = Array.isArray(result?.documents) ? result.documents : [];

    const trending: TrendingMovie[] = docs
      .map((d: any) => {
        return {
          searchTerm: String(d.searchTerm ?? ""),
          movie_id: Number(d.movie_id ?? 0),
          title: String(d.title ?? ""),
          count: Number(d.count ?? 0),
          poster_url: String(d.poster_url ?? ""),
          vote_average: Number(d.voteAverage ?? ""),
          vote_count: Number(d.voteCount ?? ""),
          release_date: String(d.releaseDate ?? ""),
          original_language: String(d.originalLanguage ?? ""),
        } as TrendingMovie;
      })
      .filter(
        (m: any) =>
          m.searchTerm.length > 0 &&
          !Number.isNaN(m.movie_id) &&
          m.title.length > 0 &&
          !Number.isNaN(m.count) &&
          m.poster_url.length > 0
      );

    return trending;
  } catch (error) {
    console.error("getTrendingMovies error:", error);
    return [];
  }
};
