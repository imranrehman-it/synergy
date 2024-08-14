import pool from "./db";

export const getUserFiles = async (user_id: string) => {
    try{
        if(!user_id){
            throw new Error('Missing required fields for fetching user files');
        }
        const client = await pool.connect();
        const result = await client.query(`SELECT * FROM files WHERE user_id = '${user_id}'`);
        client.release();
        return result.rows;
    }catch(err: any){
        console.log(err);
        throw new Error(err.message);
    }
}