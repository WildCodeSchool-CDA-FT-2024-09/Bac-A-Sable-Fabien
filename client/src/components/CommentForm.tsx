import { useState } from "react";
import {
  useCreateNewCommentMutation,
  namedOperations,
} from "../generated/graphql-types";

const CommentForm = ({ repoId }: { repoId: string }) => {
  const [name, setName] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [createNewComment] = useCreateNewCommentMutation({
    refetchQueries: [namedOperations.Query.GetCommentsOfRepo],
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createNewComment({
      variables: {
        data: {
          repoId,
          name,
          comment,
        },
      },
    });

    setName("");
    setComment("");
  };

  return (
    <div className="bg-darkgrey text-white p-4 rounded-md">
      <h3 className="text-xl font-bold mb-2">💬 Post a comment</h3>
      <form id="addCommentForm" action="get" onSubmit={handleSubmit}>
        <div className="relative mb-6">
          <label
            className="flex items-center mb-2 text-sm font-medium"
            htmlFor="name"
          >
            Name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className="block w-full h-11 px-5 py-2.5 leading-7 text-base font-normal shadow-xs bg-lightgrey text-black border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none"
            placeholder="Type your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex gap-x-6 mb-6">
          <div className="w-full relative">
            <label
              className="flex items-center mb-2 text-sm font-medium"
              htmlFor="comment"
            >
              Comment
            </label>
            <textarea
              name="comment"
              id="comment"
              className="w-full px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-black bg-lightgrey border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none"
              placeholder="Your comment..."
              required
              rows={5}
              cols={10}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
        </div>
        <button className="w-52 h-12 shadow-sm rounded-md bg-black hover:bg-gray-800 transition-all duration-300 text-white text-base font-semibold leading-7">
          Add
        </button>
      </form>
    </div>
  );
};

export default CommentForm;
