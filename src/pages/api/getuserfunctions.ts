import { NextApiRequest, NextApiResponse } from "next";
import getUserFunction from "@/app/db/getUserFunctions";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method != 'POST'){
        return res.status(405).json({error: 'Method not allowed, use POST'});
    }
    else{
        try{
            const {user_id} = req.body;
            const result = await getUserFunction(user_id);
            res.status(200).json(result);
        }catch(err: any){
            console.log(err);
            res.status(500).json({error: err.message});
        }
    }
}

export default handler;