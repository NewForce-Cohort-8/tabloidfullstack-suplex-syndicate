import { useEffect, useState } from "react";
import { getAllSubscribedPosts } from "../../Managers/SubscriptionManager";
import { Container } from "reactstrap";
import { Post } from "../Posts/Post";

export const SubscribedPostsList = ({
	searchTerms,
	subscriptions,
	setSubscriptions,
}) => {
	const [subscribedPosts, setSubscribedPosts] = useState([]);
	const [filteredSubscribedPosts, setFilteredSubscribedPosts] = useState([]);
	const user = JSON.parse(localStorage.getItem("userProfile"));
	const getSubscribedPosts = () => {
		return getAllSubscribedPosts(user.id).then((posts) =>
			setSubscribedPosts(posts)
		);
	};

	useEffect(() => {
		getSubscribedPosts();
		getAllSubscribedPosts(user.id).then((posts) =>
			setFilteredSubscribedPosts(posts)
		);
	}, [user.id]);
	useEffect(() => {
		if (searchTerms) {
			const searchedPosts = subscribedPosts.filter((post) => {
				return post.tags.find((tag) => {
					return tag.name.toLowerCase().startsWith(searchTerms.toLowerCase());
				});
			});
			setFilteredSubscribedPosts(searchedPosts);
		} else if (!searchTerms) {
			setFilteredSubscribedPosts(subscribedPosts);
		}
	}, [searchTerms]);

	return (
		<Container fluid className='d-flex flex-column align-items-center'>
			{filteredSubscribedPosts.map((post) => (
				<Post
					key={post.id}
					post={post}
					subscriptions={subscriptions}
					setSubscriptions={setSubscriptions}
				/>
			))}
		</Container>
	);
};
