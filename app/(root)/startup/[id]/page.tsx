import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import { Startup } from "@/sanity/types";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post: Startup = await client.fetch(STARTUP_BY_ID_QUERY, { id });
  if (!post) return notFound();
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag bg-indigo-400 !text-white">
          {formatDate(post?._createdAt)}
        </p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>
      <section className="section_container">
        <Image
          src={post.image}
          width={300}
          height={300}
          alt="thumbnail"
          className="w-full h-auto rounded-xl"
        />
      </section>
    </>
  );
};

export default page;
