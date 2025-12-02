// pages/blog/[slug].tsx
import { GetStaticPaths, GetStaticProps } from 'next';
import { fetchGraphQL } from '../../lib/graphql';

const SLUGS_QUERY = `
  query {
    posts(first: 100) {
      nodes {
        slug
      }
    }
  }
`;

const POST_QUERY = `
  query Post($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      title
      content
      date
    }
  }
`;

export const getStaticPaths: GetStaticPaths = async () => {
  const data = await fetchGraphQL(SLUGS_QUERY);
  const paths =
    data?.posts?.nodes?.map((p: any) => ({ params: { slug: p.slug } })) || [];
  return { paths, fallback: 'blocking' };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const data = await fetchGraphQL(POST_QUERY, { slug });
  if (!data?.post) return { notFound: true };
  return { props: { post: data.post }, revalidate: 60 };
};

export default function Post({ post }: any) {
  return (
    <main>
      <h1 dangerouslySetInnerHTML={{ __html: post.title }} />
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </main>
  );
}
