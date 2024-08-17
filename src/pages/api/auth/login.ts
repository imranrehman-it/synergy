import pool from "@/app/db/db";
import { NextApiRequest, NextApiResponse } from "next";
import { createUser } from "@/app/db/createUser";
import { getUserData } from "@/app/db/getUserData";
import { createFile } from "@/app/db/createFile";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    let client;
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method not allowed, use POST' });
        }

        const { id, name, email, image } = req.body;
        client = await pool.connect();

        const user = await client.query(`SELECT * FROM users WHERE id = $1`, [id]);

        if (user.rows.length > 0) {
            const data = await getUserData(id);
            res.status(200).json(data);
        } else {
            const content = '<H1>Welcome to Synergy!</H1>';
            const newUser = await createUser({ id, name, email, image });
            const file = await createFile({ user_id: id, title: 'New File', content: content, description: 'A new file created for you' });
            const data = { user: newUser, files: [file] };
            res.status(200).json(data);
        }
    } catch (err: any) {
        console.log(err);
        res.status(500).json({ error: err.message });
    } finally {
        if (client) {
            client.release();
        }
    }
};

export default handler;