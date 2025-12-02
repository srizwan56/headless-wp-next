import Link from 'next/link';
import { GetStaticProps } from 'next';
import { fetchGraphQL } from '../../lib/graphql';
import { POSTS_QUERY } from '../../lib/queries';

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchGraphQL(POSTS_QUERY);
  return { props: { posts: data.posts.nodes }, revalidate: 60 };
};

export default function Blog({ posts }: any) {
  return (
    <main>
      <h1>Blog</h1>
      <ul>
        {posts.map((p: any) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`}>{p.title}</Link>
            <div dangerouslySetInnerHTML={{ __html: p.excerpt }} />
          </li>
        ))}
      </ul>
    </main>
  );
}
