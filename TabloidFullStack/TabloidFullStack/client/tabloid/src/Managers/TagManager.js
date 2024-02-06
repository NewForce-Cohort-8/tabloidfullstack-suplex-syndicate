const tagApiUrl = "https://localhost:5001/api/Tag";

export const getAllTags = () => {
	return fetch(tagApiUrl).then((res) => res.json());
};

export const addTag = (tag) => {
	return fetch(tagApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(tag),
	});
};
