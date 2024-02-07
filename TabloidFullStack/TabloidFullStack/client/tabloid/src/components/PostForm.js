import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { addPost } from "../Managers/PostManager"

export const PostForm = () => {
    const [newPost, setNewPost] = useState( 
        {
            title: '',
            content: '', 
            imageLocation: '', 
            createDateTime: Date.now(), 
            publishDateTime: '', 
            IsApproved: true, 
            CategoryId: 1, 
            userProfileId: 1

        }
    )

    const navigate = useNavigate()

    const clickTheSaveButton = (e) => {
        e.preventDefault()

        const newPostToSendToAPI = {
            Title: newPost.title,
            Content: newPost.content, 
            ImageLocation: newPost.imageLocation, 
            CreateDateTime: new Date().toISOString, 
            PublishDateTime: '', 
            IsApproved: true, 
            CategoryId: 1, 
            UserProfileId: 1  
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