const postTagApiUrl = "https://localhost:5001/api/PostTag";

export const getPostTags = (postId) => {
	return fetch(`${postTagApiUrl}/GetTagsByPost/${postId}`).then((res) =>
		res.json()
	);
};

export const addPostTag = (postTag) => {
	return fetch(postTagApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(postTag),
	});
};

export const getPostTagbyTagIdAndPostId = (tagId, postId) => {
	return fetch(
		`${postTagApiUrl}/GetByTagIdAndPostId/post-${postId}/tag-${tagId}`
	).then((res) => res.json());
};

export const deletePostTag = (id) => {
	return fetch(`${postTagApiUrl}/${id}`, { method: "DELETE" });
};
