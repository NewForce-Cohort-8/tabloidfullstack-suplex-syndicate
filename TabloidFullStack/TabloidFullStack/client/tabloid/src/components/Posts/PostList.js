import { Post } from "./Post.js";
import { Container } from "reactstrap";

export const PostList = ({
	filteredPosts,
	subscriptions,
	setSubscriptions,
	setSubscribedPosts,
	setFilteredSubscribedPosts,
}) => {
	return (
		<Container fluid className='d-flex flex-column align-items-center'>
			{filteredPosts.map((post) => (
				<Post
					key={post.id}
					post={post}
					subscriptions={subscriptions}
					setSubscriptions={setSubscriptions}
					setSubscribedPosts={setSubscribedPosts}
					setFilteredSubscribedPosts={setFilteredSubscribedPosts}
				/>
			))}
		</Container>
	);
};
