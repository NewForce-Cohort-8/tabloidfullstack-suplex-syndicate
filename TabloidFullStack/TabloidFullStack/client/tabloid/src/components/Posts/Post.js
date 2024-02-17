import React, { useEffect, useState } from "react";
import {
	Card,
	CardImg,
	CardBody,
	CardFooter,
	Button,
	Col,
	CardHeader,
	CardTitle,
	CardSubtitle,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { PostTagBadge } from "../postTags/PostTagBadge";
import { getPostTags } from "../../Managers/PostTagManager";
import {
	addSubscription,
	getAllSubscriptions,
} from "../../Managers/SubscriptionManager";
import { getAllPosts } from "../../Managers/PostManager";
import { SubscriptionButton } from "../subscriptions/SubscriptionButton";

export const Post = ({
	post,
	subscriptions,
	setSubscriptions,
	subscribedPosts,
	setSubscribedPosts,
	setFilteredSubscribedPosts,
}) => {
	const [postTags, setPostTags] = useState([]);
	const user = JSON.parse(localStorage.getItem("userProfile"));
	const getTags = () => {
		return getPostTags(post.id).then((tags) => setPostTags(tags));
	};

	useEffect(() => {
		getTags();
	}, [post]);

	const navigate = useNavigate();

  // changed previous code to a conditional. Checks to see if publishdate is null. formattedDate starts as null and is reassigned within the conditional so we can conditionally render it in the return. 
  let formattedDate = null
  if(post.publishDateTime){
    const [date] = post?.publishDateTime.split("T");
    const [year, month, day] = date.split("-");
     formattedDate = `${month}/${day}/${year}`;
  }

  
	return (
		<Card
			className='m-4'
			style={{
				width: "40rem",
			}}
		>
			<CardHeader className='d-flex flex-row'>
				<Col>
					<div className='d-flex flex-row'>
						<div className='me-2'>{post?.userProfile?.fullName}</div>
						<SubscriptionButton
							post={post}
							user={user}
							subscriptions={subscriptions}
							setSubscriptions={setSubscriptions}
							subscribedPosts={subscribedPosts}
							setSubscribedPosts={setSubscribedPosts}
							setFilteredSubscribedPosts={setFilteredSubscribedPosts}
						/>
					</div>
					<div>@{post?.userProfile?.displayName}</div>
				</Col>
				{formattedDate ?<Col className='text-end'>{formattedDate}</Col> : ""}
			</CardHeader>
			<CardImg top src={post.imageLocation} alt={post.title} className='mb-2' />
			<CardTitle tag='h5' className='mx-3'>
				<Link to={`/post/${post.id}`}>
					<strong>{post.title}</strong>
				</Link>
			</CardTitle>
			<CardSubtitle className='mx-3'>{post?.category?.name}</CardSubtitle>
			<CardBody>{post.content}</CardBody>
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
					<>
						<Button
							outline
							className='me-2'
							onClick={(e) => {
								e.preventDefault();
								navigate(`/Post/${post.id}/Tags`);
							}}
						>
							Manage Tags
						</Button>
						<Button
							outline
							className='me-2'
							onClick={(e) => {
								e.preventDefault();
								navigate(`/post/edit/${post.id}`);
							}}
						>
							Edit Post
						</Button>
					</>
				) : (
					""
				)}
			</CardFooter>
		</Card>
	);
  return (
    <Card className="m-4">
      <p className="text-left px-2">Posted by: {post.userProfile?.firstName} {post.userProfile?.lastName}</p>
      <p className="text-left px-2">Author Display Name: {post.userProfile?.displayName}</p>
      <p className="text-left px-2">Category: {post.category?.name} 
      <p className="text-left px-2"></p>Published on: {post.publishDateTime}</p>
      <CardImg top src={post.imageLocation} alt={post.title} />
      <CardBody>
        <p>
          <Link to={`/post/${post.id}`}>
          <strong>{post.title}</strong>
          </Link>
        </p>
        <p>{post.content}</p>
      </CardBody>
    </Card>
  );
};
