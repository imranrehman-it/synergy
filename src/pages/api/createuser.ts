import pool from '../../app/db/db';
import { NextApiRequest, NextApiResponse } from 'next';

interface User {
  id: string;
  name: string;
  email: string;
  image: string;
}

async function preCheck(reqBody: User){
  if(!reqBody.id || !reqBody.name || !reqBody.email || !reqBody.image){
    throw new Error('Missing required fields');
  }
  const client = await pool.connect();
  const result = await client.query(`SELECT * FROM users WHERE id = '${reqBody.id}'`);
  if(result.rows.length > 0){
    throw new Error('User already exists');
  }

}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed, use POST' });
  }
  else{
    try {
      const {id, name, email, image} = req.body;
      await preCheck(req.body);
      const client = await pool.connect();
      const result = await client.query(`INSERT INTO users (id, name, email, image) VALUES ('${id}', '${name}', '${email}', '${image}')`);
      res.status(200).json({ message: `User ${name} added` });
      client.release();
    } catch (err: any) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  }
}



