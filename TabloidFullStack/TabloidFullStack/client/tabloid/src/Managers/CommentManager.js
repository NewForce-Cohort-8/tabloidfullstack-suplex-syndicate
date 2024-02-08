const commentApiUrl = "https://localhost:5001/api/Comment/";

export const getPostComments = (postId) => {
	return fetch(`${commentApiUrl}${postId}`).then((res) => res.json());
};
