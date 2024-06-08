import {createClient} from '@sanity/client'

export const client = createClient({
    projectId: process.env.PROJECT_ID,
    dataset: process.env.DATASET_NAME,
    useCdn: false,
    apiVersion: '2023-05-03',
     token: process.env.SANITY_TOKEN
  })