const commentApiUrl = "https://localhost:5001/api/Comment/";

export const getPostComments = (postId) => {
	return fetch(`${commentApiUrl}${postId}`).then((res) => res.json());
};

export const getCommentById = (id) => {
	return fetch(`${commentApiUrl}GetById/${id}`).then((res) => res.json());
};

export const addComment = (comment) => {
	return fetch(commentApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(comment),
	});
};

export const deleteComment = (id) => {
	return fetch(`${commentApiUrl}${id}`, { method: "DELETE" });
};

export const updateComment = (comment) => {
	return fetch(`${commentApiUrl}${comment.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(comment),
	});
};
