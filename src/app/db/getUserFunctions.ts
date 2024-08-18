import pool from "./db";

const getUserFunction = async (user_id: string) => {
    try{
        if(!user_id){
            throw new Error('Missing required fields for user data');
        }
        const client = await pool.connect();
        const user = await client.query(`SELECT value, template FROM functions WHERE user_id = $1`, [user_id]);
        client.release();
        return user.rows;
    }
    catch(err: any){
        console.log(err);
        throw new Error(err.message);
    }
}

export default getUserFunction;