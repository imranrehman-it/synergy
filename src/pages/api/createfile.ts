import pool from "@/app/db/db";
import { NextApiRequest, NextApiResponse } from "next";
import { createFile } from "@/app/db/createFile";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'POST'){
        return res.status(405).json({error: 'Method not allowed, use POST'});
    }
    else{
        try{
            const {user_id, title, content} = req.body;
            const result = await createFile({user_id, title, content});
            res.status(200).json(result.rows[0]);
        }
        catch(err: any){
            console.log(err);
            res.status(500).json({error: err.message
         });
    }
}
};