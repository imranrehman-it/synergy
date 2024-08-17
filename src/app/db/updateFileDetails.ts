import pool from "@/app/db/db";

const updateFileDetails = async ({file_id, title, description}: {file_id: string, title: string, description: string}) => {
    if(!file_id || !title || !description){
        throw new Error('Missing required fields for file update');
    }
    const client = await pool.connect();
    
    try{
        const result = await client.query(
            `UPDATE files SET title = $1, description = $2 WHERE id = $3 RETURNING *`, 
            [title, description, file_id]
        );
        return result;
    }
    catch(err){
        console.error('Error executing query', err);
        throw err;
    }
    finally{
        client.release();
    }
}

export default updateFileDetails;