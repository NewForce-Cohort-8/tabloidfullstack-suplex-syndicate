import { Container } from "reactstrap";
import { SearchByTag } from "./SearchByTag";
import { useEffect, useState } from "react";
import { getAllPosts, getPost } from "../../Managers/PostManager";
import { PostList } from "./PostList";
import { getAllSubscriptions } from "../../Managers/SubscriptionManager";
import { SubscribedPostsList } from "../subscriptions/SubscribedPostsList";

export const PostContainer = () => {
	const [posts, setPosts] = useState([]);
	const [filteredPosts, setFilteredPosts] = useState([]);
	const [searchTerms, setSearchTerms] = useState("");
	const [subscriptions, setSubscriptions] = useState([]);

	const getPosts = () => {
		return getAllPosts().then((allPosts) => setPosts(allPosts));
	};
	const getSubscriptions = () => {
		return getAllSubscriptions().then((subscriptions) =>
			setSubscriptions(subscriptions)
		);
	};
	useEffect(() => {
		getPosts();
		getAllPosts().then((posts) => setFilteredPosts(posts));
	}, []);
	useEffect(() => {
		if (searchTerms) {
			const searchedPosts = posts.filter((post) => {
				return post.tags.find((tag) => {
					return tag.name.toLowerCase().startsWith(searchTerms.toLowerCase());
				});
			});
			setFilteredPosts(searchedPosts);
		} else if (!searchTerms) {
			setFilteredPosts(posts);
		}
	}, [searchTerms]);

	useEffect(() => {
		getSubscriptions();
	}, []);
	if (window.location.pathname === "/") {
		return (
			<Container fluid className='d-flex flex-column align-items-center my-2'>
				<h2>Posts by authors you are subscribed to</h2>
				<SearchByTag setSearchTerms={setSearchTerms} />
				<SubscribedPostsList
					searchTerms={searchTerms}
					subscriptions={subscriptions}
					setSubscriptions={setSubscriptions}
				/>
			</Container>
		);
	} else {
		return (
			<Container>
				<SearchByTag setSearchTerms={setSearchTerms} />
				<PostList
					filteredPosts={filteredPosts}
					subscriptions={subscriptions}
					setSubscriptions={setSubscriptions}
				/>
			</Container>
		);
	}
};
