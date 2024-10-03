const Comments = () => {
  const fakeComments = [
    {
      id: 1,
      name: "Zen",
      postedAt: "2024-09-30",
      comment:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa eaque, inventore quam aliquid error ducimus dolorem quasi quaerat sint, laborum maiores? Dolorum hic odio iure deleniti accusamus assumenda ipsa laboriosam?",
    },
    {
      id: 2,
      name: "Noisette",
      postedAt: "2024-09-10",
      comment: "deleniti accusamus assumenda ipsa laboriosam?",
    },
    {
      id: 3,
      name: "Pedro",
      postedAt: "2024-10-03",
      comment:
        "laborum maiores? Dolorum hic odio iure deleniti accusamus assumenda ipsa laboriosam?",
    },
  ];

  return (
    <div>
      {fakeComments && (
        <div>
          <h3 className="text-2xl font-bold mb-2">Comments</h3>
          {fakeComments.map((comment) => (
            <div key={comment.id} className="bg-slate-200 rounded-md p-2 mb-2">
              <p>
                Name: <span className="font-bold">{comment.name}</span>
              </p>
              <p className="border-b border-slate-300 text-sm">
                Date: <span className="font-bold">{comment.postedAt}</span>
              </p>
              <div>{comment.comment}</div>
            </div>
          ))}
        </div>
      )}
      <div className="bg-gray-600 text-white p-4 rounded-md">
        <h3 className="text-xl font-bold mb-2">💬 Post a comment</h3>
        <form id="addCommentForm" action="get">
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
              placeholder="Zen"
              value=""
              required=""
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
                type="text"
                name="comment"
                id="comment"
                className="w-full px-5 py-2.5 leading-7 text-base font-normal shadow-xs text-black bg-lightgrey border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none"
                placeholder=""
                required=""
                rows="5"
                cols="10"
              ></textarea>
            </div>
          </div>
          <button className="w-52 h-12 shadow-sm rounded-md bg-black hover:bg-gray-800 transition-all duration-300 text-white text-base font-semibold leading-7">
            Add
          </button>
        </form>
      </div>
    </div>
  );
};

export default Comments;
