import { formatDate } from "@/lib/utils";
import { client } from "@/sanity/lib/client";
import { STARTUP_BY_ID_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import markdownit from "markdown-it";
import View from "@/components/View";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;
  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });
  const md = markdownit();
  const parsedContent = md.render(post?.pitch || "");
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
        <div className="flex justify-center">
          <Image
            src={post.image || ""}
            width={300}
            height={300}
            alt="thumbnail"
            className="w-full h-auto rounded-xl !max-w-3xl"
          />
        </div>
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex gap-2 items-center mb-3"
            >
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              ></Image>
              <div>
                <p className="text-20-medium">{post.author.name}</p>
                <p className="text-16-medium !text-black-300">
                  @{post.author.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>
          <h3 className="text-30-bold">Pitch Details</h3>
          {parsedContent ? (
            <article
              dangerouslySetInnerHTML={{ __html: parsedContent }}
              className="prose max-w-4xl font-work-sans break-all"
            />
          ) : (
            <p className="no-result">No details provided</p>
          )}
        </div>
        <hr className="divider" />
        {/* TODO : EDITOR SELECTED STARTUPS */}
        <View id={id}></View>
      </section>
    </>
  );
};

export default page;
