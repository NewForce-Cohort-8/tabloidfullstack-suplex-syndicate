import { Container } from "reactstrap";
import { SearchByTag } from "./SearchByTag";
import { useEffect, useState } from "react";
import { getAllPosts, getPost } from "../../Managers/PostManager";
import { PostList } from "./PostList";

export const PostContainer = () => {
	const [posts, setPosts] = useState([]);
	const [filteredPosts, setFilteredPosts] = useState([]);
	const [searchTerms, setSearchTerms] = useState("");

	const getPosts = () => {
		return getAllPosts().then((allPosts) => setPosts(allPosts));
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

	return (
		<Container>
			<SearchByTag setSearchTerms={setSearchTerms} />
			<PostList filteredPosts={filteredPosts} />
		</Container>
	);
};
