import { useEffect, useState } from "react"
import { getUserPosts } from "../../Managers/PostManager"
import { Card, CardBody, CardImg, CardText, CardTitle, Col, Container, Row, Table } from "reactstrap";
import { Post } from "./Post";

export const UserPosts = () => {
    const [userPosts, setUserPosts] = useState([])

    const localTabloidUser = localStorage.getItem("userProfile")
    const localTabloidUserObject = JSON.parse(localTabloidUser)

    useEffect(() => {
        getUserPosts(localTabloidUserObject.id)
        .then((data) => {
            setUserPosts(data)
        })
        .catch((error) => {
            console.log("Can't fetch user posts:" , error)
        });
    }, [localTabloidUserObject.id]);

    return (<>
    <div className="post-list">
        <div className="row justify-content-center">
            <div className="cards-column">
                {userPosts.map((post) => {
                return  <Post key={post.id} post={post}  /> 
                })}
            </div>
        </div>
    </div>
    </>)


}