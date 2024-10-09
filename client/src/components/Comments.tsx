import { useQuery, gql, useMutation } from "@apollo/client";
import { Comment } from "../types/commentType";
import CommentForm from "./CommentForm";

const GET_REPO_COMMENTS = gql`
  query GetCommentsOfRepo($repoId: String!) {
    getCommentsOfRepo(repoId: $repoId) {
      id
      repoId
      name
      comment
    }
  }
`;

const DELETE_COMMENT = gql`
  mutation DeleteComment($deleteCommentId: Float!) {
    deleteComment(id: $deleteCommentId)
  }
`;

const GET_COMMENTS_OF_REPO = gql`
  query GetCommentsOfRepo($repoId: String!) {
    getCommentsOfRepo(repoId: $repoId) {
      id
      repoId
      name
      comment
    }
  }
`;

const Comments = ({ repoId }: { repoId: string }) => {
  const { loading, error, data } = useQuery(GET_REPO_COMMENTS, {
    variables: { repoId },
  });
  const [deleteComment] = useMutation(DELETE_COMMENT, {
    refetchQueries: [GET_COMMENTS_OF_REPO, "getCommentsOfRepo"],
  });

  const handleDeleteComment = (id: number) => {
    deleteComment({
      variables: { deleteCommentId: parseInt(id) },
      // onCompleted: (data) => {
      //   console.log(data);
      // },
    });
  };

  if (loading) return <p>🥁 Loading...</p>;
  if (error) return <p>☠️ Error: {error.message}</p>;

  return (
    <div>
      {data.getCommentsOfRepo.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold mb-2">Comments</h3>
          {data.getCommentsOfRepo.map((comment: Comment) => (
            <div key={comment.id} className="bg-gray-200 rounded-md p-2 mb-2">
              <button
                onClick={() => handleDeleteComment(comment.id)}
                className="float-end hover:bg-red-300 rounded px-1 ml-2 text-sm font-normal"
              >
                🗑️
              </button>
              <p>
                Name: <span className="font-bold">{comment.name}</span>
              </p>
              <p className="border-b border-slate-300 text-sm">
                Date:{" "}
                <span className="font-bold">{/* {comment.postedAt} */}</span>
              </p>
              <div>{comment.comment}</div>
            </div>
          ))}
        </div>
      )}
      <CommentForm repoId={repoId} />
    </div>
  );
};

export default Comments;
