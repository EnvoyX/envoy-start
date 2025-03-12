import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";
import { client } from "@/sanity/lib/client";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
import { StartupTypeCard } from "@/components/StartupCard";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const query = (await searchParams).query;

  const posts = await client.fetch(STARTUPS_QUERY);
  // console.log(JSON.stringify(posts, null, 2));
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">Connect with Enterpreneurs</h1>
        <p className="sub-heading !max-w-3xl">
          Submit Ideas, Vote, and Get Noticed!
        </p>
        <SearchForm query={query}></SearchForm>
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query ? `Search results for ${query}` : "All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {posts?.length > 0 ? (
            posts.map((post: StartupTypeCard) => (
              <StartupCard key={post?._id} post={post} />
            ))
          ) : (
            <p className="no-result">No startups found</p>
          )}
        </ul>
      </section>
    </>
  );
}
