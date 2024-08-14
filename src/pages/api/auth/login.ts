import pool from "@/app/db/db";
import { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "@/app/db/createUser";
import { getUserData } from "@/app/db/getUserData";
import { createFile } from "@/app/db/createFile";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'POST'){
        return res.status(405).json({error: 'Method not allowed, use POST'});
    }
    else{
        try{
            const {id, name, email, image} = req.body;
            const client = await pool.connect();
            const user = await pool.query(`SELECT * FROM users WHERE id = '${id}'`);
            if(user.rows.length > 0){
                const data = await getUserData(id);
                res.status(200).json(data);
            }
            else{
                const content = '<H1>Welcome to Syngergy!</H1>';
                const newUser = await createUser({id, name, email, image});
                const file = await createFile({user_id: id, title: 'New File', content: content});
                const data = {user: newUser, files: [file]};
                res.status(200).json(data);
            }

        }
        catch(err: any){
            console.log(err);
            res.status(500).json({error: err.message});
        }
    }
};

export default handler;