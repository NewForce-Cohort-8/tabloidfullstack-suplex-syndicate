import React from "react";
import { Card, CardImg, CardBody } from "reactstrap";
import { Link } from "react-router-dom";


export const Post = ({ post }) => {
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