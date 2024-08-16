import pool from "@/app/db/db";

export const updateFileContent = async ({ file_id, content }: { file_id: string, content: string }) => {
    if (!file_id || !content) {
        throw new Error('Missing required fields for file update');
    }
    const client = await pool.connect();
    
    try {
        const result = await client.query(
            `UPDATE files SET content = $1 WHERE id = $2 RETURNING *`, 
            [content, file_id]
        );
        return result;
    } catch (err) {
        console.error('Error executing query', err);
        throw err;
    } finally {
        client.release();
    }
};
