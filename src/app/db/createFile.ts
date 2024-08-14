import pool from "@/app/db/db";

interface File {
    user_id: string;
    title: string;
    content: string;
}

export const createFile = async ({user_id, title, content}: File)=> {
    if(!user_id || !title || !content){
        throw new Error('Missing required fields for file creation');
    }
    const client = await pool.connect();
    const result = await client.query(`INSERT INTO files (user_id, title, content) VALUES ('${user_id}', '${title}', '${content}') RETURNING *`);
    client.release();
    return result.rows[0];
}