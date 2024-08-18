import { NextApiRequest, NextApiResponse } from "next";
import createFunction from "@/app/db/createFunction";

const hander = async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method != 'POST'){
        return res.status(405).json({error: 'Method not allowed, use POST'});
    }
    else{
        try{
            const {value, template, user_id} = req.body;
            const result = await createFunction({value, template, user_id});
            res.status(200).json(result.rows[0]);

        }catch(err: any){
            console.log(err);
            res.status(500).json({error: err.message});
        }
    }
}

export default hander;