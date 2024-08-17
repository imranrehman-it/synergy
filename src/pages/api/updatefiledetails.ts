import { NextApiRequest, NextApiResponse } from "next";
import updateFileDetails from '@/app/db/updateFileDetails';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method !== 'POST'){
        res.status(405).json({error: 'Method not allowed, use POST'});
    }
    else{
        const {file_id, title, description} = req.body;
        try{
            const result = await updateFileDetails({file_id, title, description});
            res.status(200).json(result);
        }
        catch(err: any){
            console.log(err);
            res.status(500).json({error: err.message});
    }
};
};

export default handler;