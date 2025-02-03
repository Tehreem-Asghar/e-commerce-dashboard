import { createClient } from '@sanity/client';

const sanityClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // Project ID from .env
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET, // Dataset name
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION, // API version
  useCdn: false, // CDN ko production ke liye enable rakhein
  token:process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
 
});

export default sanityClient;
