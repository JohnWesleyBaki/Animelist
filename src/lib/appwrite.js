import { Client, Account,Databases} from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('665165b10028aa9d35cb'); 

export const account = new Account(client);
export const database = new Databases(client);
export { ID } from 'appwrite';
