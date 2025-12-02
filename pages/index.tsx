import { GetStaticProps } from 'next';
import { fetchGraphQL } from '../lib/graphql';
import { HOME_PAGE } from '../lib/queries';

export const getStaticProps: GetStaticProps = async () => {
  const data = await fetchGraphQL(HOME_PAGE);
  return { props: { page: data.pageBy || null }, revalidate: 60 };
};

export default function Home({ page }: any) {
  if(!page) return <main><h1>Home</h1><p>No content</p></main>;
  return (
    <main>
      <h1 dangerouslySetInnerHTML={{ __html: page.title }} />
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </main>
  );
}
