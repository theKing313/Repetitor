import { Client, Account, Databases, Storage, Query,Functions,ID, RealtimeResponseEvent  } from 'appwrite';
import AppwriteCollectionsID from './appwrite.collections.json';

import type { IAnnouncement} from '@/types/types';
// let currentAccount = null
export const provider = () => {
    const client = new Client();
    client?.setEndpoint(process.env.NEXT_PUBLIC_API_ENDPOINT!).setProject(process.env.NEXT_PUBLIC_PROJECT_ID!);
    const account = new Account(client);
    const database = new Databases(client);
    const storage = new Storage(client);
    const functions = new Functions(client);
    return { account, database, storage,functions,client };
};

export const getAnnouncements = async (queries: string[] = []) => {
    try {
        console.log(queries)
        const defaultQueries = [Query.orderDesc('$createdAt'), ...queries];
        const response = await provider().database.listDocuments<IAnnouncement>(
            AppwriteCollectionsID.basicDatabasesID,
            AppwriteCollectionsID.announcementsCollectionID,
            defaultQueries
        );
        return response;
    } catch (error) {
        console.log(error)
        return null;
    }
};
export const getAllSpecialist= async (queries: string[] = []) => {
    try {
        console.log(queries)
        const defaultQueries = [Query.orderDesc('$createdAt'), ...queries];
        const response = await provider().database.listDocuments<IAnnouncement>(
            AppwriteCollectionsID.basicDatabasesID,
            AppwriteCollectionsID.userInfoID,
            defaultQueries
        );
        return response;
    } catch (error) {
        console.log(error)
        return null;
    }
}

export const getUserResponses = async (queries: string[] = []) => {
    try {
        console.log(queries)
        const defaultQueries = [Query.orderDesc('$createdAt'), ...queries];
        const response = await provider().database.listDocuments<IAnnouncement>(
            AppwriteCollectionsID.basicDatabasesID,
            AppwriteCollectionsID.responsesID,
            defaultQueries
        );
        return response.documents;
    } catch (error) {
        console.log(error)
        return null;
    }
};
export const sendResponseApi= async (data) => {
    try {
        // console.log(queries)
        // const defaultQueries = [Query.orderDesc('$createdAt'), ...queries];
        const response = await provider().database.createDocument<IAnnouncement>(
            AppwriteCollectionsID.basicDatabasesID,
            AppwriteCollectionsID.responsesID,
            ID.unique(),
            data
        );

        // const uniqueKey = `${userId}_${announceId}`;
        // return res.total > 0;
        return response;
    } catch (error) {
        console.log(error)
        return null;
    }
};

export const createJWT = async () => {
    const response = await provider().account.createJWT();
    return response;
};

export const getAccount = async () => {
    try {
        const response = await provider().account.get();
        return response;
    } catch (error) {
        return null;
    }
};

export const getUserInfoApi = async (userId: string) => {
    try {
        console.log(userId)
        const response = await provider().database.getDocument<IUser>(AppwriteCollectionsID.basicDatabasesID, AppwriteCollectionsID.userInfoID, userId);
        console.log('response------------')
        console.log(response)
        return response;
    } catch (error) {
        return null;
    }
};
interface ICreateSession {
    email: string;
    password: string;
}
export const getRoleUser = async (userId: string) => {
    try {
        const response = await provider().database.listDocuments<IUser>(
            AppwriteCollectionsID.basicDatabasesID,
            AppwriteCollectionsID.clientsID,
            [Query.equal('userId', userId)] 
        );
        
        if (response.documents.length > 0) {
            return response.documents[0]; 
        }

        return null;
    } catch (error) {
        console.error('Ошибка получения роли пользователя:', error);
        return null;
    }
};
export const createUser = async (account) => {
    try {
        // { email, password }: ICreateSession
        // console.log(email, password)
        // const user = getAccount();
        console.log(account)
        const response = await provider().database.createDocument<IAnnouncement>(
            AppwriteCollectionsID.basicDatabasesID,
            AppwriteCollectionsID.clientsID,
            ID.unique(),
            {
                userId:account.$id,
                name : account.name,
                phone:account?.phone  ?account?.phone : null,
                // city:account
                
            }
        );
        return response;
    } catch (error) {
        console.log(error)
        return null;
    }
};
export const createSession = async ({ email, password }: ICreateSession) => {
    try {
        console.log(email, password)
        const response = await provider().account.createEmailPasswordSession(
        email,
        password
        );
        return response;
    } catch (error) {
        return null;
    }
};
export const createAccount = async ({ userId, email, password, name }: { userId: string; email: string; password: string; name: string }) => {
    try {
        const res = await  provider().account.create(userId, email, password, name);
        return res;
    } catch (err) {
        console.error(err);
        return null;
    }
};
export const createAuth2Session  = async ()=> {
    // email: string, password: string
      const session = await  provider().account.createOAuth2Session(
        "google",
        "http://localhost:3000/",
        "http://localhost:3000/auth/login"
      )
    const getinfoAcc = await getAccount();
    console.log(session)
    console.log(getinfoAcc)
    return getinfoAcc
    // this.currentAccount = d
    // if (session) this.currentAccount = session
    // return d
  }

export const deleteSession = async () =>{
    await provider().account.deleteSession('current');
}

