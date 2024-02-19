import { useEffect, useState } from "react"
import { deletePost, getPost } from "../../Managers/PostManager"
import { Form, useNavigate, useParams } from "react-router-dom"
import { Button, Container } from "reactstrap";

export const DeletePost = () => {

    const [post, setPost] = useState();
    const { postId } = useParams();
	const user = JSON.parse(localStorage.getItem("userProfile"));
	const navigate = useNavigate();
   
    const getThisPost = () => {
		return getPost(postId).then((post) => setPost(post));
	};


    const handleDelete = (e) => {
        e.preventDefault();
        deletePost(postId).then(() => 
            navigate(`/my-posts`));
    };
    useEffect(() => {
        getPost(postId).then((res) => setPost(res));
    }, [postId]);
    
    // if (user.id == post.userProfileId ){
    

    return (
        <Container>
            <Form>
                <h3>
                    Delete Post {postId}?
                </h3>
                <Button
					color='danger'					
					onClick={(e) => handleDelete(e)}
				>
					Confirm Delete
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