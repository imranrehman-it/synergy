import pool from "./db";
import { getUserFiles } from "./getUserFiles";

export const getUserData = async (user_id: string) => {
    try{
        if(!user_id){
            throw new Error('Missing required fields for user data');
        }
        const client = await pool.connect();
        const user = await client.query(`SELECT * FROM users WHERE id = '${user_id}'`);
        const files = await getUserFiles(user_id);
        const data = {user: user.rows[0], files: files};
        return data;
    }
    catch(err: any){
        console.log(err);
        throw new Error(err.message);
    }
}