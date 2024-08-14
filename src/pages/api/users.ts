import pool from '../../app/db/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT * FROM users');
    const users = result.rows;
    client.release();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: 'Error connecting to database' });
  }
}