import pool from "./db";

interface User {
    id: string;
    name: string;
    email: string;
    image: string;
}

const preCheck = async ({id, name, email, image}: User)=> {
    if(!id || !name || !email || !image){
        throw new Error('Missing required fields for user creation');
    }
    const client = await pool.connect();
    const result = await client.query(`SELECT * FROM users WHERE id = '${id}'`);
    if(result.rows.length > 0){
        throw new Error('User already exists');
    }
    client.release();
}


export const createUser = async ({id, name, email, image} : User) => {
    try{
        await preCheck({id, name, email, image});
        const client = await pool.connect();
        const result = await client.query(`INSERT INTO users (id, name, email, image) VALUES ('${id}', '${name}', '${email}', '${image}') RETURNING *`);
        client.release();
        return result.rows[0];

    }catch(err: any){
        console.log(err);
        throw new Error(err.message);
    }
}