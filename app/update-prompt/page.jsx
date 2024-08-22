"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const UpdatePrompt = () => {
  const router = useRouter();
  const [post, setPost] = useState({ prompt: "", tag: "" });
  const [submitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [promptId, setPromptId] = useState(null);

  useEffect(() => {
    // Use the useEffect to set promptId on the client-side
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get("id");
    setPromptId(id);

    if (id) {
      const getPromptDetails = async () => {
        const response = await fetch(`/api/prompt/${id}`);
        const data = await response.json();

        setPost({
          prompt: data.prompt,
          tag: data.tag,
        });

        setLoading(false);
      };

      getPromptDetails();
    } else {
      setLoading(false);
    }
  }, []);

  const updatePrompt = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!promptId) {
      alert("Missing PromptId!");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`/api/prompt/${promptId}`, {
        method: "PATCH",
        body: JSON.stringify({
          prompt: post.prompt,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Form
      type="Edit"
      post={post}
      setPost={setPost}
      submitting={submitting}
      handleSubmit={updatePrompt}
    />
  );
};

export default UpdatePrompt;