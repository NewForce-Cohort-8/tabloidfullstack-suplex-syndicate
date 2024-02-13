import { Container } from "reactstrap";
import { SearchByTag } from "./SearchByTag";
import PostList from "../PostList";

export const PostContainer = () => {
	const [posts, setPosts] = useState([]);
	const [filteredPosts, setFilteredPosts] = useState([]);
	const [searchTerms, setSearchTerms] = useState("");

	const getPosts = () => {
		getAllPosts().then((allPosts) => setPosts(allPosts));
	};

	useEffect(() => {
		getPosts();
		if (searchTerms) {
			const searchedPosts = posts.filter((post) => {
				return post.tags.find((tag) => {
					return tag.name.toLowerCase().startsWith(searchTerms.toLowerCase());
				});
			});
			setFilteredPosts(searchedPosts);
		} else {
			setFilteredPosts(posts);
		}
	}, [searchTerms]);

	return (
		<Container>
			<SearchByTag setSearchTerms={setSearchTerms} />
			<PostList />
		</Container>
	);
};
