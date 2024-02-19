import { useEffect, useState } from "react"
import { deletePost, getPost } from "../../Managers/PostManager"
import { Form, useNavigate, useParams, useSubmit } from "react-router-dom"
import { Button, Card, Container } from "reactstrap";
import { deletePostTag, getPostTags } from "../../Managers/PostTagManager";

export const DeletePost = () => {

    const [post, setPost] = useState({
        title: ''
    });
    const { postId } = useParams();
	const user = JSON.parse(localStorage.getItem("userProfile"));
	const navigate = useNavigate();
    const [postTags, setPostTags] = useState([])

    const getTags = () => {
		return getPostTags(postId).then((tags) => setPostTags(tags));
	};

    
    const handleDelete = (e) => {
        e.preventDefault();
        deletePost(postId).then((res) => {
            if (postTags.length){
                return postTags.forEach(tag => {deletePostTag(tag)
        });
            }
                
        })
        
        .then(() =>
         
        navigate(`/post`));
    };
    useEffect(() => {
        getPost (postId).then((res) => setPost(res));
    }, [postId]);
    
    useEffect(() => {
        getTags();
    }, [post]);
   
    // if (user.id == post.userProfileId ){
    

    return (
        <Container>
            <Card>
                <h3>
                    Delete Post {postId}, Title: "{post.title}"?
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
						navigate(`/post/${post.id}`);
					}}
				>
					Cancel
				</Button>

            </Card>
        </Container>

    );    
};