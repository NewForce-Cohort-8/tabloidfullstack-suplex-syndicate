import React from "react";
import { Card, CardImg, CardBody, CardFooter, Button } from "reactstrap";
import { Link, useNavigate } from "react-router-dom";

export const Post = ({ post }) => {
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
			<CardFooter>
				<Button
					outline
					color='primary'
					onClick={(e) => {
						e.preventDefault();
						navigate(`/Post/${post.id}/Comments`);
					}}
				>
					View Comments
				</Button>
			</CardFooter>
		</Card>
	);
};
