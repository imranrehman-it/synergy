import pool from "@/app/db/db";

interface File {
    user_id: string;
    title: string;
    content: string;
    description: string;
}

export const createFile = async ({user_id, title, content, description}: File)=> {
    if(!user_id || !title || !content || !description){
        throw new Error('Missing required fields for file creation');
    }
    const client = await pool.connect();
    const result = await client.query(`INSERT INTO files (user_id, title, content, description) VALUES ('${user_id}', '${title}', '${content}', '${description}') RETURNING *`);
    client.release();
    return result;
}