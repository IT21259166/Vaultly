
import { Clerk } from '@clerk/clerk-sdk-node';

const clerk = new Clerk({
  secretKey: process.env.CLERK_SECRET_KEY,
});

export default async (req, res) => {
  if (req.method === 'POST') {
    const { email } = req.body;

    try {
      const userList = await clerk.users.getUserList({
        emailAddress: email,
      });

      res.status(200).json({ userExists: userList.length > 0 });
    } catch (error) {
      console.error('Error checking user:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};
