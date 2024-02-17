import { useEffect, useState } from "react";
import { getAllSubscribedPosts } from "../../Managers/SubscriptionManager";
import { Container } from "reactstrap";
import { Post } from "../Posts/Post";

export const SubscribedPostsList = ({
	subscriptions,
	setSubscriptions,
	subscribedPosts,
	setSubscribedPosts,
	filteredSubscribedPosts,
	setFilteredSubscribedPosts,
}) => {
	return (
		<Container fluid className='d-flex flex-column align-items-center'>
			{filteredSubscribedPosts.map((post) => (
				<Post
					key={post.id}
					post={post}
					subscriptions={subscriptions}
					setSubscriptions={setSubscriptions}
					subscribedPosts={subscribedPosts}
					setSubscribedPosts={setSubscribedPosts}
					setFilteredSubscribedPosts={setFilteredSubscribedPosts}
				/>
			))}
		</Container>
	);
};
