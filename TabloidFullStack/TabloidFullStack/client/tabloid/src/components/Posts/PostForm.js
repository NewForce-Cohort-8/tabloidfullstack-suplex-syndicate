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

    useEffect(() => {
        getCategories()
    }, [])


    const [newPost, setNewPost] = useState( 
        {
            title: '',
            content: '', 
            imageLocation: '', 
            createDateTime: Date.now(), 
            publishDateTime: '', 
            IsApproved: true, 
            categoryId: 0, 
            userProfileId: tabloidUserObject.id

        }
    )

    
    const clickTheSaveButton = (e) => {
        e.preventDefault()
        
        const newPostToSendToAPI = {
            Title: newPost.title,
            Content: newPost.content, 
            ImageLocation: newPost.imageLocation,
            PublishDateTime: newPost.publishDateTime,
            IsApproved: true, 
            CategoryId: newPost.categoryId,
            UserProfileId: tabloidUserObject.id
        }
        
        return addPost(newPostToSendToAPI)
        .then((res) => res.json())
            .then((post) => {
                navigate(`/post/${post.id}`)})
    };    
    
    const selectList = (event) => {
        const copy = {
            ...newPost
        }
        copy.categoryId = event.target.value
        setNewPost(copy)
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
                    <label htmlFor="category-select">Select Category: </label>
                    <select id="type" 
                        value={newPost.categoryId}
                    onChange={
                        event => selectList(event)
                    }>
                    <option value="0">Select a category</option>
                    {
                    categories.map(category => {
                        return <option value={category.id} key={
                            category.id
                        }>
                            {
                            category.name
                        }</option>
                })
                } </select>                
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
            <fieldset>
                <div className="form-group">
                <label htmlFor="publishDateTime">PublishDateTime: </label>
                    <input 
                    type="datetime-local"
                    id="publishDateTime"
                    value={newPost.publishDateTime}
                    onChange={
                        (event) => {
                            const copy = { ...newPost }
                            copy.publishDateTime = event.target.value
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