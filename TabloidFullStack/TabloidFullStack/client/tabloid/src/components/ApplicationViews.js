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


export default function ApplicationViews() {
	const user= JSON.parse(localStorage.getItem("userProfile"));
	return (
		<Routes>
			<Route path='/' element={<Hello />} />
			<Route path='/Tags' element={<TagList />} />
			<Route path='/Tags/Add' element={<AddTag />} />
			<Route path='/Tags/Delete/:id' element={<DeleteTag />} />
			<Route path='/Tags/Edit/:id' element={<EditTag />} />
			<Route path='/post' element={<PostList />} />
			<Route path='/post/:id' element={<PostDetails />} />
			<Route path='/Categories' element={<CategoryList />} />
			{ user.userTypeId == 1? <Route path="/UserProfiles" element={<UserProfileList />} />:""}
			<Route path="/post" element={<PostList />} />

			<Route path="/post/:id" element={<PostDetails />} />
			<Route path="/postForm/" element={<PostForm />} />

		</Routes>
	);
}
