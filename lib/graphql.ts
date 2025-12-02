// lib/graphql.ts
import { GraphQLClient } from 'graphql-request';

const endpoint = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL!;
export const client = new GraphQLClient(endpoint);

export async function fetchGraphQL<T = any>(query: string, variables = {}) {
  return client.request<T>(query, variables);
}
