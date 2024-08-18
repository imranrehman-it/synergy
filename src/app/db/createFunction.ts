import pool from "@/app/db/db";
import { useSession } from "next-auth/react";

interface Function {
    user_id: string;
    value: string;
    template: string;
}



const createFunction = async ({value, template, user_id}: Function)=> {
    if(!value || !template || !user_id){
        throw new Error('Missing required fields for function creation');
    }
    try{
        const client = await pool.connect();
        const result = await client.query(`INSERT INTO functions (user_id, value, template) VALUES ('${user_id}', '${value}', '${template}') RETURNING *`);
        client.release();
        return result;
    }catch(err: any){
        console.log(err);
        throw new Error(err.message);
    }
}

export default createFunction;