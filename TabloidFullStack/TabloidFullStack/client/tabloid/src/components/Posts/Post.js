import React, { useEffect, useState } from "react";
import { Card, CardImg, CardBody, CardFooter, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { PostTagBadge } from "../postTags/PostTagBadge";
import { getPostTags } from "../../Managers/PostTagManager";

export const Post = ({ post }) => {
	const [postTags, setPostTags] = useState([]);
	const user = JSON.parse(localStorage.getItem("userProfile"));
	const getTags = () => {
		return getPostTags(post.id).then((tags) => setPostTags(tags));
	};
	useEffect(() => {
		getTags();
	}, [post]);

	const navigate = useNavigate();
	return (
		<Card className='m-4'>
			<p className='text-left px-2'>
				Posted by: {post.userProfile.firstName} {post.userProfile.lastName}
			</p>
			<p className='text-left px-2'>
				Author Display Name: {post.userProfile.displayName}
			</p>
			<p className='text-left px-2'>
				Category: {post.categoryId} Published on: {post.publishDateTime}
			</p>
			<CardImg top src={post.imageLocation} alt={post.title} />
			<CardBody>
				<p>
					<Link to={`/post/${post.id}`}>
						<strong>{post.title}</strong>
					</Link>
				</p>
				<p>{post.content}</p>
			</CardBody>
			{postTags.length > 0 ? (
				<CardFooter className='d-flex'>
					<h6 className='me-2'>Tags:</h6>
					{postTags.map((postTag) => (
						<PostTagBadge key={postTag.id} postTag={postTag} />
					))}
				</CardFooter>
			) : (
				""
			)}
			<CardFooter>
				<Button
					outline
					color='primary'
					className='me-2'
					onClick={(e) => {
						e.preventDefault();
						navigate(`/Post/${post.id}/Comments`);
					}}
				>
					View Comments
				</Button>
				<Button
					outline
					color='primary'
					className='me-2'
					onClick={(e) => {
						e.preventDefault();
						navigate(`/Post/${post.id}/Comments/Add`);
					}}
				>
					Add Comment
				</Button>
				{user.id == post.userProfile.id ? (
					<Button
						outline
						onClick={(e) => {
							e.preventDefault();
							navigate(`/Post/${post.id}/Tags`);
						}}
					>
						Manage Tags
					</Button>
				) : (
					""
				)}
			</CardFooter>
		</Card>
	);
};
