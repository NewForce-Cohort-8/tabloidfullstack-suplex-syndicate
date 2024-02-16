const subscriptionApiUrl = "https://localhost:5001/api/Subscription";

export const getAllSubscriptions = () => {
	return fetch(subscriptionApiUrl).then((res) => res.json());
};

export const getAllSubscribedPosts = (userId) => {
	return fetch(`${subscriptionApiUrl}/GetSubscribedPosts/${userId}`).then(
		(res) => res.json()
	);
};

export const getSingleProviderSubscription = (subscriberId, providerId) => {
	return fetch(`${subscriptionApiUrl}/${subscriberId}/${providerId}`).then(
		(res) => res.json()
	);
};

export const addSubscription = (subscription) => {
	return fetch(subscriptionApiUrl, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(subscription),
	});
};

export const updateSubscription = (subscription) => {
	return fetch(`${subscriptionApiUrl}/${subscription.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(subscription),
	});
};
