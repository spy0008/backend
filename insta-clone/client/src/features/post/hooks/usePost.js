import { getFeed } from "../services/post.api";
import { useContext } from "react";
import { PostContext } from "../post.context";

export const usePost = () => {
  const context = useContext(PostContext);

  const { loading, post, feed, setLoading, setPost, setFeed } = context;

  const handleGetFeed = async () => {
    try {
      setLoading(true);
      const result = await getFeed();
      if (result.success) {
        setFeed(result.posts);
        return result;
      } else {
        return result.error;
      }
    } catch (error) {
      console.error("Unexpected error:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, feed, post, handleGetFeed };
};
