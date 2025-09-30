import { Client, ID, Query, TablesDB } from 'react-native-appwrite';

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLEROW_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;

//   .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
const client = new Client()
  .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setPlatform(process.env.EXPO_PUBLIC_APPWRITE_PLATFORM!);

const tableDB = new TablesDB(client);

export const storeUserSearch = async (query: string, movie: Movie) => {
  try {
    //for read operation use (listRows)
    const response = await tableDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLEROW_ID,
      queries: [Query.equal('searchTerm', query)],
    });
    //check if a movie exist or not if exist then increment its count +1
    if (response.rows.length > 0) {
      const existingMovie = response.rows[0];
      await tableDB.updateRow(DATABASE_ID, TABLEROW_ID, existingMovie.$id, {
        count: existingMovie.count + 1,
      });
      console.log('count increment');
    } else {
      await tableDB.createRow(DATABASE_ID, TABLEROW_ID, ID.unique(), {
        searchTerm: query,
        count: 1,
        title: movie.title,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
      });
      console.log('new movie row created!');
    }
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const getTrendingMovies = async (): Promise<
  TrendingMovie[] | undefined
> => {
  try {
    const response = await tableDB.listRows({
      databaseId: DATABASE_ID,
      tableId: TABLEROW_ID,
      queries: [Query.limit(6), Query.orderDesc('count')],
    });
    return response.rows as unknown as TrendingMovie[];
  } catch (error) {
    console.error('error from get all trending movies', error);
    return undefined;
  }
};
