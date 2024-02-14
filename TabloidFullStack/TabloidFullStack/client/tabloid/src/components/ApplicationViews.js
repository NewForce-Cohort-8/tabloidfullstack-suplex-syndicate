import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { TagList } from "./tags/TagList.js";
import { AddTag } from "./tags/AddTag.js";
import { DeleteTag } from "./tags/DeleteTag.js";
import { CategoryList } from "./categories/CategoryList.js";
import PostList from "./Posts/PostList.js";
import PostDetails from "./Posts/PostDetails.js";
import { PostForm } from "./Posts/PostForm.js";
import { EditTag } from "./tags/EditTag.js";
import UserProfileList from "./UserProfile/UserProfileList";
import { CommentList } from "./comments/CommentList.js";

import { AddComment } from "./comments/AddComment.js";
import { DeleteComment } from "./comments/DeleteComment.js";
import { EditComment } from "./comments/EditComment.js";
import { CommentDetails } from "./comments/CommentDetails.js";
import UserProfile from "./UserProfile/UserProfile.js";
import { UserPosts } from "./Posts/UserPosts.js";


export default function ApplicationViews() {
	const user = JSON.parse(localStorage.getItem("userProfile"));
	return (
		<Routes>
			<Route path='/' element={<Hello />} />
			<Route path='/Tags' element={<TagList />} />
			<Route path='/Tags/Add' element={<AddTag />} />
			<Route path='/Tags/Delete/:id' element={<DeleteTag />} />
			<Route path='/Tags/Edit/:id' element={<EditTag />} />
			<Route path='/post' element={<PostList />} />
			<Route path='/post/:id' element={<PostDetails />} />
			<Route path='/Post/:postId/Comments' element={<CommentList />} />
			<Route path='/Post/:postId/Comments/Add' element={<AddComment />} />
			<Route
				path='/Post/:postId/Comments/Delete/:commentId'
				element={<DeleteComment />}
			/>
      <Route
				path='/Post/:postId/Comments/Edit/:commentId'
				element={<EditComment />}
			/>
      <Route
				path='/Post/:postId/Comments/:commentId'
				element={<CommentDetails />}
			/>
			<Route path='/Categories' element={<CategoryList />} />
			{ user && user.userTypeId == 1? <Route path="/UserProfiles" element={<UserProfileList />} />:""}
			<Route path="/post" element={<PostList />} />

			<Route path="/post/:id" element={<PostDetails />} />
			<Route path="/postForm/" element={<PostForm />} />
			<Route path="/my-posts" element={<UserPosts /> } />

			{ user && user.userTypeId == 1? <Route path="/UserProfiles/:id" element={<UserProfile />} />:""}
		</Routes>
	);
}
