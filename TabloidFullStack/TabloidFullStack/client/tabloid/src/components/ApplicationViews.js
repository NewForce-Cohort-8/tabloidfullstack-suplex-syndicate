import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { TagList } from "./tags/TagList.js";
import { AddTag } from "./tags/AddTag.js";
import { CategoryList } from "./categories/CategoryList.js";
import PostList from "./Posts/PostList.js";
import PostDetails from "./Posts/PostDetails.js";
import { PostForm } from "./Posts/PostForm.js";

export default function ApplicationViews() {
	return (
		<Routes>
			<Route path='/' element={<Hello />} />
			<Route path='/Tags' element={<TagList />} />
			<Route path='/Tags/Add' element={<AddTag />} />
			<Route path="/post" element={<PostList />} />

			<Route path="/post/:id" element={<PostDetails />} />
			<Route path="/postForm/" element={<PostForm />} />
			<Route path="/Categories" element={<CategoryList />} />

		</Routes>
	);
}
