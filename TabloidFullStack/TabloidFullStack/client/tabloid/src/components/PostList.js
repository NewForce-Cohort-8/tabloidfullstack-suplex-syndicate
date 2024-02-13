import React, { useState, useEffect } from "react";
import { getAllPosts } from "../Managers/PostManager";
import { Post } from "./Post.js";
import { Container } from "reactstrap";

export const PostList = ({ filteredPosts }) => {
	return (
		<Container fluid className='d-flex flex-column align-items-center'>
			{filteredPosts.map((post) => (
				<Post key={post.id} post={post} />
			))}
		</Container>
	);
};