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

export const Post = ({ post, subscriptions, setSubscriptions }) => {
	const [postTags, setPostTags] = useState([]);
	const user = JSON.parse(localStorage.getItem("userProfile"));
	const getTags = () => {
		return getPostTags(post.id).then((tags) => setPostTags(tags));
	};
	const hasSubscription = () => {
		if (subscriptions && subscriptions.length > 0) {
			return subscriptions.find(
				(subscription) =>
					subscription.subscriberUserProfileId == user.id &&
					subscription.providerUserProfileId == post.userProfileId
			);
		} else {
			return false;
		}
	};

	const handleSubscriptionClick = (e) => {
		e.preventDefault();
		if (e.target.id.startsWith("add-subscription")) {
			const subscriptionToSendToApi = {
				subscriberUserProfileId: parseInt(user.id),
				providerUserProfileId: post.userProfileId,
				beginDateTime: new Date(),
			};

			return addSubscription(subscriptionToSendToApi).then((res) =>
				getAllSubscriptions((res) => setSubscriptions(res))
			);
		}
	};

	useEffect(() => {
		getTags();
	}, [post]);

	const navigate = useNavigate();
	const [date] = post.publishDateTime.split("T");
	const [year, month, day] = date.split("-");
	const formattedDate = `${month}/${day}/${year}`;
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
						{!hasSubscription() ? (
							<Button
								outline
								color='success'
								size='sm'
								id={`add-subscription--${post.id}`}
								onClick={(e) => handleSubscriptionClick(e)}
							>
								Subscribe
							</Button>
						) : (
							<Button
								outline
								color='danger'
								size='sm'
								id={`remove-subscription--${post.id}`}
							>
								Unsubscribe
							</Button>
						)}
					</div>
					<div>@{post?.userProfile?.displayName}</div>
				</Col>
				<Col className='text-end'>{formattedDate}</Col>
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
				) : (
					""
				)}
			</CardFooter>
		</Card>
	);
};
