import { createClerkClient } from '@clerk/clerk-sdk-node';

export default createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
