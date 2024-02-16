import { useEffect, useState } from "react";
import {
	addSubscription,
	getAllSubscribedPosts,
	getAllSubscriptions,
	updateSubscription,
} from "../../Managers/SubscriptionManager";
import { Button } from "reactstrap";

export const SubscriptionButton = ({
	post,
	user,
	subscriptions,
	setSubscriptions,
	subscribedPosts,
	setSubscribedPosts,
	setFilteredSubscribedPosts,
}) => {
	const [isSubscribedToAuthor, setIsSubscribedToAuthor] = useState(false);
	const [subscription, setSubscription] = useState({
		id: 0,
		subscriberUserProfileId: 0,
		providerUserProfileId: 0,
		beginDateTime: "",
		endDateTime: "",
	});

	const handleSubscriptionClick = (e) => {
		e.preventDefault();
		if (e.target.id.startsWith("add-subscription")) {
			const subscriptionToSendToApi = {
				subscriberUserProfileId: parseInt(user.id),
				providerUserProfileId: post.userProfileId,
				beginDateTime: new Date(),
			};

			return addSubscription(subscriptionToSendToApi)
				.then(() => getAllSubscriptions().then((res) => setSubscriptions(res)))
				.then(() => hasSubscription())
				.then(() =>
					getAllSubscribedPosts(user.id).then((res) => {
						setFilteredSubscribedPosts(res);
						setSubscribedPosts(res);
					})
				);
		}
		if (e.target.id.startsWith("remove-subscription")) {
			const subscriptionToSendToApi = { ...subscription };
			subscriptionToSendToApi.endDateTime = new Date();
			return updateSubscription(subscriptionToSendToApi)
				.then(() => getAllSubscriptions().then((res) => setSubscriptions(res)))
				.then(() => hasSubscription())
				.then(() =>
					getAllSubscribedPosts(user.id).then((res) => {
						setFilteredSubscribedPosts(res);
						setSubscribedPosts(res);
					})
				);
		}
	};

	const setSubscriptionState = (obj) => {
		setIsSubscribedToAuthor(true);
		setSubscription(obj);
	};
	const hasSubscription = () => {
		if (subscriptions && subscriptions.length > 0) {
			let matchingSubscription = subscriptions.find(
				(subscription) =>
					subscription.subscriberUserProfileId == user.id &&
					subscription.providerUserProfileId == post.userProfileId
			);

			return matchingSubscription
				? setSubscriptionState(matchingSubscription)
				: setIsSubscribedToAuthor(false);
		}
	};
	useEffect(() => {
		hasSubscription();
	}, [subscriptions]);

	if (parseInt(user.id) !== post.userProfileId && !isSubscribedToAuthor) {
		return (
			<Button
				outline
				color='success'
				size='sm'
				id={`add-subscription--${post.id}`}
				onClick={(e) => handleSubscriptionClick(e)}
			>
				Subscribe
			</Button>
		);
	} else if (parseInt(user.id) !== post.userProfileId && isSubscribedToAuthor) {
		return (
			<Button
				outline
				color='danger'
				size='sm'
				id={`remove-subscription--${post.id}--${subscription.id}`}
				onClick={(e) => handleSubscriptionClick(e)}
			>
				Unsubscribe
			</Button>
		);
	}
};
