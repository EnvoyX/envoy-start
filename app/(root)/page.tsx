import Image from "next/image";
import SearchForm from "../../components/SearchForm";
import StartupCard from "@/components/StartupCard";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query: string }>;
}) {
  const query = (await searchParams).query;
  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: { _id: 1, name: "Andi" },
      _id: 1,
      description: "This is Description",
      image:
        "https://plus.unsplash.com/premium_photo-1740992237716-2bb9f560cc6b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
      category: "Robot",
      title: "We Robot",
    },
  ];
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
            posts.map((post: StartupCardType, index: number) => (
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
