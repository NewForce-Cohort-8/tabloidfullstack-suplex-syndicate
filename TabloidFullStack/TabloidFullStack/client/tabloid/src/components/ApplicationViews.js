import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { TagList } from "./tags/TagList.js";
import { AddTag } from "./tags/AddTag.js";
import { DeleteTag } from "./tags/DeleteTag.js";
import PostList from "./PostList";
import { CategoryList } from "./categories/CategoryList.js";
import PostDetails from "./PostDetails.js";
import { EditTag } from "./tags/EditTag.js";
import UserProfileList from "./UserProfile/UserProfileList";
import UserProfile from "./UserProfile/UserProfile.js";


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
			{ user.userTypeId == 1? <Route path="/UserProfiles/:id" element={<UserProfile />} />:""}
		</Routes>
	);
}
