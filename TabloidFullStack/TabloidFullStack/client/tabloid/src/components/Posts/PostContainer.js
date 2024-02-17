import { Container } from "reactstrap";
import { SearchByTag } from "./SearchByTag";
import { useEffect, useState } from "react";
import { getAllPosts, getPost } from "../../Managers/PostManager";
import { PostList } from "./PostList";
import {
	getAllSubscribedPosts,
	getAllSubscriptions,
} from "../../Managers/SubscriptionManager";
import { SubscribedPostsList } from "../subscriptions/SubscribedPostsList";
import Hello from "../Hello";
import { EditPost } from "./EditPost";

export const PostContainer = () => {
	const [posts, setPosts] = useState([]);
	const [subscribedPosts, setSubscribedPosts] = useState([]);
	const [filteredPosts, setFilteredPosts] = useState([]);
	const [filteredSubscribedPosts, setFilteredSubscribedPosts] = useState([]);
	const [searchTerms, setSearchTerms] = useState("");
	const [subscriptions, setSubscriptions] = useState([]);
	const user = JSON.parse(localStorage.getItem("userProfile"));
	const getPosts = () => {
		return getAllPosts().then((allPosts) => setPosts(allPosts));
	};
	const getSubscriptions = () => {
		return getAllSubscriptions().then((subscriptions) =>
			setSubscriptions(subscriptions)
		);
	};

	const getSubscribedPosts = () => {
		return getAllSubscribedPosts(user.id).then((posts) =>
			setSubscribedPosts(posts)
		);
	};
	useEffect(() => {
		getSubscriptions();
	}, []);

	useEffect(() => {
		getSubscribedPosts();
		getAllSubscribedPosts(user.id).then((posts) =>
			setFilteredSubscribedPosts(posts)
		);
	}, [user.id]);

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

	if (window.location.pathname === "/") {
		if (!subscribedPosts.length) {
			return <Hello />;
		} else {
			return (
				<Container fluid className='d-flex flex-column align-items-center my-2'>
					<h2>Posts by authors you are subscribed to</h2>
					<SearchByTag setSearchTerms={setSearchTerms} />
					<SubscribedPostsList
						searchTerms={searchTerms}
						subscriptions={subscriptions}
						setSubscriptions={setSubscriptions}
						subscribedPosts={subscribedPosts}
						setSubscribedPosts={setSubscribedPosts}
						filteredSubscribedPosts={filteredSubscribedPosts}
						setFilteredSubscribedPosts={setFilteredSubscribedPosts}
					/>
				</Container>
			);
		}
	}
	if (window.location.pathname === "/post") {
		return (
			<Container>
				<SearchByTag setSearchTerms={setSearchTerms} />
				<PostList
					filteredPosts={filteredPosts}
					subscriptions={subscriptions}
					setSubscriptions={setSubscriptions}
					setSubscribedPosts={setSubscribedPosts}
					setFilteredSubscribedPosts={setFilteredSubscribedPosts}
				/>
			</Container>
		);
	}
};
