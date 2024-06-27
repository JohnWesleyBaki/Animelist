
import { database,ID} from './lib/appwrite';



const COLLECTION_ID = import.meta.env.VITE_COLLECTION_ID_NOTES; 
const DATABASE_ID = import.meta.env.VITE_DATABASE_ID;

export const addAnimeToList = async (animeId,userId ,category) => {

  
  try {
    const response = await database.createDocument(DATABASE_ID,COLLECTION_ID, ID.unique(), {
      
      animeId,
      userId,
      category
    });
    return response;
  } catch (error) {
    console.error('Error adding anime to list:', error);
    throw error;
  }
};

export const getAnimeListByStatus = async (userId, status) => {
  try {
    const response = await database.listDocuments(COLLECTION_ID, [
      { key: 'userId', value: userId },
      { key: 'status', value: status }
    ]);
    return response.documents;
  } catch (error) {
    console.error('Error fetching anime list:', error);
    throw error;
  }
};
