import { useNavigate, useParams } from "react-router-dom";
import { getPost, updatePost } from "../../Managers/PostManager";
import { useEffect, useState } from "react";
import {
	Button,
	Container,
	Form,
	FormGroup,
	Input,
	InputGroup,
	Label,
} from "reactstrap";
import { getAllCategories } from "../../Managers/CategoryManager";

export const EditPost = () => {
	const { postId } = useParams();
	const navigate = useNavigate();
	const [categories, setCategories] = useState([]);
	const [post, setPost] = useState({
		id: 0,
		userProfileId: 0,
		title: "",
		content: "",
		imageLocation: "",
		createDateTime: "",
		publishDateTime: "",
		isApproved: false,
		categoryId: 0,
	});

	const getThisPost = () => {
		return getPost(postId).then((post) => setPost(post));
	};

	const getCategories = () => {
		return getAllCategories().then((categories) => setCategories(categories));
	};

	const handleOnChange = (e) => {
		const copy = { ...post };
		copy[e.target.name] = e.target.value;
		setPost(copy);
	};

	const handleUpdate = (e) => {
		e.preventDefault();
		const postToSendToApi = {
			id: post.id,
			userProfileId: post.userProfileId,
			title: post.title,
			content: post.content,
			imageLocation: post.imageLocation,
			createDateTime: post.createDateTime,
			publishDateTime: post.publishDateTime,
			isApproved: post.isApproved,
			categoryId: post.categoryId,
		};
		postToSendToApi.publishDateTime = post.publishDateTime
			? post.publishDateTime
			: null;

		return updatePost(postToSendToApi).then((res) =>
			navigate(`/post/${postId}`)
		);
	};
	useEffect(() => {
		getThisPost();
		getCategories();
	}, [postId]);

	return (
		<Container>
			<h3 className='my-4'>Edit your post below</h3>
			<Form>
				<FormGroup className='mb-4'>
					<Label for='title'>Title</Label>
					<Input
						id='title'
						name='title'
						type='text'
						value={post.title}
						onChange={(e) => handleOnChange(e)}
					/>
				</FormGroup>
				<FormGroup className='mb-4'>
					<Label for='content'>Content</Label>
					<Input
						id='content'
						name='content'
						type='textarea'
						value={post.content}
						onChange={(e) => handleOnChange(e)}
					/>
				</FormGroup>
				<FormGroup className='mb-4'>
					<Label for='category'>Category</Label>
					<Input
						id='category'
						name='categoryId'
						type='select'
						value={post.categoryId}
						onChange={(e) => handleOnChange(e)}
					>
						{categories.map((category) => {
							return (
								<option value={category.id} key={category.id}>
									{category.name}
								</option>
							);
						})}
					</Input>
				</FormGroup>
				<FormGroup className='mb-4'>
					<Label for='imageLocation'>ImageLocation</Label>
					<Input
						id='imageLocation'
						name='imageLocation'
						type='text'
						value={post.imageLocation}
						onChange={(e) => handleOnChange(e)}
					/>
				</FormGroup>
				<FormGroup className='mb-4'>
					<Label for='publishDateTime'>PublishDateTime</Label>
					<Input
						id='publishDateTime'
						name='publishDateTime'
						type='datetime-local'
						value={post.publishDateTime}
						onChange={(e) => handleOnChange(e)}
					/>
				</FormGroup>
				<Button
					color='primary'
					className='me-2'
					onClick={(e) => {handleUpdate(e); navigate("/post");}}
				>
					Save
				</Button>
				<Button
					outline
					color='secondary'
					onClick={(e) => {
						e.preventDefault();
						navigate("/post");
					}}
				>
					Cancel
				</Button>
			</Form>
		</Container>
	);
};
