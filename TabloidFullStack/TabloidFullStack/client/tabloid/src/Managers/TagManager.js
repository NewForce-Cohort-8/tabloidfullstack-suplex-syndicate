const tagApiUrl = "https://localhost:5001/api/Tag";

export const getAllTags = () => {
	return fetch(tagApiUrl).then((res) => res.json());
};
