import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { TagList } from "./tags/TagList.js";
import { AddTag } from "./tags/AddTag.js";
import PostList from "./PostList";
import { CategoryList } from "./categories/CategoryList.js";
import PostDetails from "./PostDetails.js";
import UserProfileList from "./UserProfile/UserProfileList";


export default function ApplicationViews() {
	return (
		<Routes>
			<Route path='/' element={<Hello />} />
			<Route path='/Tags' element={<TagList />} />
			<Route path='/Tags/Add' element={<AddTag />} />
			<Route path='/post' element={<PostList />} />
			<Route path='/post/:id' element={<PostDetails />} />
			<Route path='/Categories' element={<CategoryList />} />
			<Route path='/posts' element={<PostList />} />
			<Route path="/UserProfiles" element={<UserProfileList />} />
		</Routes>
	);
}
