const categoryApiUrl = "https://localhost:5001/api/Category";

export const getAllCategories = () => {
	return fetch(categoryApiUrl).then((res) => {
		return res.json();
	  });
};

export const addCategory= (singleCategory) => {
	return fetch(categoryApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(singleCategory),
	});
};
