const categoryApiUrl = "https://localhost:5001/api/Category";

export const getAllCategories = () => {
	return fetch(categoryApiUrl).then((res) => {
		return res.json();
	  });
};

export const getCategoryById = (id) => {
	return fetch(`${categoryApiUrl}/${id}`).then((res) => res.json());
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

export const deleteCategory = (id) => {
	return fetch(`${categoryApiUrl}/${id}`, { method: "DELETE" });
};

export const updateCategory = (category) => {
	return fetch(`${categoryApiUrl}/${category.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(category),
	});
};
