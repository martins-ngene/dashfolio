"use client";
import { createClient } from "@/utils/supabase/client";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { Card } from "./card";

interface ArticlePropsI {
  title: string;
  description: string;
  article_id: string;
  link_to_article: string;
  created_at: string;
}

export default function Articles({ articles }: any) {
  const [data, setData] = useState(articles);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel("realtime changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "articles",
        },
        (payload) => {
          
          if (payload.eventType === "INSERT") {
            // Add the new item to the list
            setData((prevItems: ArticlePropsI[]) => [
              ...prevItems,
              payload.new as ArticlePropsI,
            ]);
          } else if (payload.eventType === "UPDATE") {
            // Update the modified item in the list
            setData((prevItems: ArticlePropsI[]) =>
              prevItems.map((item) =>
                item.article_id === payload.new.article_id
                  ? (payload.new as ArticlePropsI)
                  : item
              )
            );
          } else if (payload.eventType === "DELETE") {
            // Remove the deleted item from the list
            setData((prevItems: ArticlePropsI[]) =>
              prevItems.filter(
                (item) => item.article_id !== payload.old.article_id
              )
            );
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, data, setData]);

  const handleDelete = async (article_id: string) => {
    const { error } = await supabase
      .from("articles")
      .delete()
      .eq("article_id", article_id);

    if (error) {
      console.log("Couldn't Delete Item", error.message);
    }

    console.log("Item deleted successfully!");
  };

  return (
    <React.Fragment>
      {data &&
        data.map((article: ArticlePropsI) => {
          const formattedDate = dayjs(article.created_at).format("MM-DD-YYYY");
          const time = dayjs(article.created_at).format("h:mm A");
          return (
            <Card key={article.article_id} as="article">
              {/* <Card.Title href={article.link_to_article}>
                {article.title}
              </Card.Title> */}
              {/* <p>{article.article_id}</p> */}
              <Card.Eyebrow as="time" dateTime={article.created_at} decorate>
                {time}, {formattedDate}
              </Card.Eyebrow>
              <Card.Description>{article.description}</Card.Description>
              <div className="w-full flex items-center justify-between ">
                <Card.Cta>Read article</Card.Cta>{" "}
                <button onClick={() => handleDelete(article.article_id)}>
                  delete
                </button>
              </div>
            </Card>
          );
        })}
    </React.Fragment>
  );
}
