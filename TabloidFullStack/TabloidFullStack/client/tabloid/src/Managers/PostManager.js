import React from "react";

const baseUrl = "/api/post";

export const getAllPosts = () => {
	return fetch(baseUrl).then((res) => res.json());
};

export const addPost = (singlePost) => {
	return fetch(baseUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(singlePost),
	});
};

export const getPost = (id) => {
	return fetch(`/api/post/${id}`).then((res) => res.json());
};

export const updatePost = (post) => {
	return fetch(`${baseUrl}/${post.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(post),
	});
};
