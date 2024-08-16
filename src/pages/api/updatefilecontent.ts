import { NextApiRequest, NextApiResponse } from "next";
import {updateFileContent} from '@/app/db/updateFileContent';

const handler =  async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'POST'){
        return res.status(405).json({error: 'Method not allowed, use POST'});
    }
    else{
        const {file_id, content} = req.body;
        try{
            const result = await updateFileContent({file_id, content});
            res.status(200).json(result.rows[0]);
        }
        catch(err: any){
            console.log(err);
            res.status(500).json({error: err.message});
        }
    }
}

export default handler;
