import { Post } from "./Post.js";
import { Container } from "reactstrap";

export const PostList = ({
	filteredPosts,
	subscriptions,
	setPosts,
	setSubscriptions,
	setSubscribedPosts,
	setFilteredPosts,
	setFilteredSubscribedPosts,
	setUnapprovedPosts,
	setViewUnapproved,
}) => {
	return (
		<Container fluid className='d-flex flex-column align-items-center'>
			{filteredPosts.map((post) => (
				<Post
					key={post.id}
					post={post}
					subscriptions={subscriptions}
					setPosts={setPosts}
					setSubscriptions={setSubscriptions}
					setSubscribedPosts={setSubscribedPosts}
					setFilteredPosts={setFilteredPosts}
					setFilteredSubscribedPosts={setFilteredSubscribedPosts}
					setUnapprovedPosts={setUnapprovedPosts}
					setViewUnapproved={setViewUnapproved}
				/>
			))}
		</Container>
	);
};
