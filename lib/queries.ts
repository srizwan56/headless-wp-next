// lib/queries.ts
export const POSTS_QUERY = `
query AllPosts($first: Int = 10){
  posts(first: $first){
    nodes {
      title
      slug
      excerpt
      date
      featuredImage { node { sourceUrl altText } }
    }
  }
}
`;

export const POST_BY_SLUG = `
query PostBySlug($slug: ID!){
  post(id: $slug, idType: SLUG) {
    title
    content
    date
    featuredImage { node { sourceUrl altText } }
  }
}
`;

export const HOME_PAGE = `
query Home {
  pageBy(uri: "home") {
    title
    content
  }
}
`;
