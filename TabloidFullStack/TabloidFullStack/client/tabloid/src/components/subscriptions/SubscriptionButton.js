import { useEffect, useState } from "react";
import {
	addSubscription,
	getAllSubscriptions,
} from "../../Managers/SubscriptionManager";
import { Button } from "reactstrap";

export const SubscriptionButton = ({
	post,
	user,
	subscriptions,
	setSubscriptions,
}) => {
	const [isSubscribedToAuthor, setIsSubscribedToAuthor] = useState(false);

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
				.then(() => hasSubscription());
		}
	};

	const hasSubscription = () => {
		if (subscriptions && subscriptions.length > 0) {
			let matchingSubscription = subscriptions.find(
				(subscription) =>
					subscription.subscriberUserProfileId == user.id &&
					subscription.providerUserProfileId == post.userProfileId
			);
			return matchingSubscription
				? setIsSubscribedToAuthor(true)
				: setIsSubscribedToAuthor(false);
		}
	};
	useEffect(() => {
		hasSubscription();
	}, [subscriptions]);

	if (user.id != post.userProfileId && !isSubscribedToAuthor) {
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
	} else if (user.id != post.userProfileId && isSubscribedToAuthor) {
		return (
			<Button
				outline
				color='danger'
				size='sm'
				id={`remove-subscription--${post.id}`}
			>
				Unsubscribe
			</Button>
		);
	}
};
