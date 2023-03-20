const PostForm = () => {
  return (
    <form className="relative ">
      <h2 className="font-semibold">New Post</h2>
      <div className="flex mt-2 shadow-app-bottom pb-4 gap-2">
        <div className="w-24 bg-gray-800 h-24 grid place-content-center text-teal-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </div>
        <div className="grow">
          <textarea
            placeholder="Write a caption..."
            className="w-full h-full bg-transparent resize-none outline-none placeholder-gray-500 text-gray-300 px-2 py-2 max-h-24 "
          />
        </div>
        <button
          disabled={true}
          type="submit"
          className="top-0 absolute right-0 text-teal-500 hover:text-teal-400 disabled:text-gray-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default PostForm;
