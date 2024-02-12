import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AddPostTags } from "./AddPostTags";
import { getPost } from "../../Managers/PostManager";
import { Button, Container } from "reactstrap";
import {
	addPostTag,
	deletePostTag,
	getPostTags,
} from "../../Managers/PostTagManager";
import { getAllTags } from "../../Managers/TagManager";
import { RemovePostTags } from "./RemovePostTags";

export const PostTagsContainer = () => {
	const { postId } = useParams();
	const [post, setPost] = useState([]);
	const [tags, setTags] = useState([]);
	const [filteredTags, setFilteredTags] = useState([]);
	const [filteredTagsToRemove, setFilteredTagsToRemove] = useState([]);
	const navigate = useNavigate();
	const [postTags, setPostTags] = useState([]);
	const user = JSON.parse(localStorage.getItem("userProfile"));
	const getThisPost = () => {
		return getPost(postId).then((post) => setPost(post));
	};
	const getTags = () => {
		return getAllTags().then((tags) => setTags(tags));
	};
	const getTagsForPost = () => {
		return getPostTags(postId).then((tags) => setPostTags(tags));
	};
	const filterTags = () => {
		let res = [];
		res = tags.filter((tag) => {
			return !postTags.find((postTag) => {
				return postTag.tagId == tag.id;
			});
		});
		setFilteredTags(res);
	};

	const filterPostTags = () => {
		let res = [];
		res = tags.filter((tag) => {
			return postTags.find((postTag) => {
				return postTag.tagId == tag.id;
			});
		});
		setFilteredTagsToRemove(res);
	};

	const handleSave = (e) => {
		e.preventDefault();
		const checkboxes = document.querySelectorAll("input");
		checkboxes.forEach((checkbox) => {
			if (checkbox.checked) {
				if (checkbox.id.startsWith("add")) {
					const [, tagId] = checkbox.id.split("--");
					const postTagToAdd = {
						tagId: tagId,
						postId: postId,
					};

					return addPostTag(postTagToAdd).then((createdPostTag) =>
						navigate(`/post/${post.id}`)
					);
				}
				if (checkbox.id.startsWith("delete")) {
					const [, postTagId] = checkbox.id.split("--");
					return deletePostTag(postTagId).then(() =>
						navigate(`/post/${post.id}`)
					);
				}
			}
		});
	};
	useEffect(() => {
		getThisPost();
		getTags();
		getTagsForPost();
	}, []);
	useEffect(() => {
		if (postTags.length !== 0) {
			filterTags();
			filterPostTags();
		} else {
			setFilteredTags(tags);
		}
	}, [postTags, tags]);
	if (user.id == post?.userProfile?.id) {
		return (
			<Container>
				<h3>Manage tags for post: {post.title}</h3>
				<RemovePostTags post={post} tagged={filteredTagsToRemove} />
				<AddPostTags post={post} notTagged={filteredTags} />
				<Button color='primary' className='me-2' onClick={(e) => handleSave(e)}>
					Save
				</Button>
				<Link to={`/post/${post.id}`}>Cancel</Link>
			</Container>
		);
	} else {
		return (
			<Container>
				<h3>Must be the author of this post manage it's tags</h3>
				<Link to={`/post/${post.id}`}>Back to post</Link>
			</Container>
		);
	}
};
