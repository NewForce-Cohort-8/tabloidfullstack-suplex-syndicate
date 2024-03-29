import React, { useEffect, useContext, useState } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";
import { getPost } from "../../Managers/PostManager";
import { useParams } from "react-router-dom";
import { Post } from "./Post";

const PostDetails = () => {
	const [post, setPost] = useState();
	const { id } = useParams();

	useEffect(() => {
		getPost(id).then(setPost);
	}, [id]);

	if (!post) {
		return null;
	}

	return (
		<div className='container'>
			<div className='row justify-content-center'>
				<div className='col-sm-12 col-lg-6'>
					<Post post={post} />
				</div>
			</div>
		</div>
	);
};

export default PostDetails;
