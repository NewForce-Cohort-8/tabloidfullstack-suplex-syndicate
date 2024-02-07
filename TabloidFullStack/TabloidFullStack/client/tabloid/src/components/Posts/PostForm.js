import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { addPost } from "../../Managers/PostManager"
import { getAllCategories } from "../../Managers/CategoryManager";

export const PostForm = () => {

    const localTabloidUser = localStorage.getItem("userProfile");
    const tabloidUserObject = JSON.parse(localTabloidUser)
    const [categories, setCategories] = useState([])
    const navigate = useNavigate()

    const getCategories = () => {
        getAllCategories().then(allCategories => setCategories(allCategories));
    }

    // useEffect(() => {
    //     getCategories()
    // }, [])

    const [newPost, setNewPost] = useState( 
        {
            title: '',
            content: '', 
            imageLocation: '', 
            createDateTime: Date.now(), 
            publishDateTime: Date.now(), 
            IsApproved: true, 
            CategoryId: 1, 
            userProfileId: tabloidUserObject.id

        }
    )

    const clickTheSaveButton = (e) => {
        e.preventDefault()

        const newPostToSendToAPI = {
            Title: newPost.title,
            Content: newPost.content, 
            ImageLocation: newPost.imageLocation,
            IsApproved: true, 
            CategoryId: 1,
            UserProfileId: tabloidUserObject.id
        }

        return addPost(newPostToSendToAPI)
        .then(navigate("/post"))
    }

    return(
        <>
        <form className="post-form">
            <h2 className="post-form-title">Create a New Post</h2>
        
            <fieldset>
                <div className="form-group">
                <label htmlFor="title">Title: </label>
                    <input 
                    type="text"
                    id="title"
                    value={newPost.title}
                    onChange={
                        (event) => {
                            const copy = { ...newPost }
                            copy.title = event.target.value
                            setNewPost(copy)
                        }
                    } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="content">Content: </label>
                    <input 
                    type="text"
                    id="content"
                    value={newPost.content}
                    onChange={
                        (event) => {
                            const copy = { ...newPost }
                            copy.content = event.target.value
                            setNewPost(copy)
                        }
                    } />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                <label htmlFor="imageLocation">Location of Your Image: </label>
                    <input 
                    type="text"
                    id="imageLocation"
                    value={newPost.imageLocation}
                    onChange={
                        (event) => {
                            const copy = { ...newPost }
                            copy.imageLocation = event.target.value
                            setNewPost(copy)
                        }
                    } />
                </div>
            </fieldset>

            <button
            onClick={(clickEvent) => clickTheSaveButton(clickEvent)} className="btn btn-primary">Submit Post
            </button>
        </form>
        </>
    )

}