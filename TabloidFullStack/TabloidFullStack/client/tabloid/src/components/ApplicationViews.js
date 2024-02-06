import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { TagList } from "./tags/TagList.js";
import { AddTag } from "./tags/AddTag.js";
import PostList from "./PostList";
import { CategoryList } from "./categories/CategoryList.js";
import PostDetails from "./PostDetails.js";



export default function ApplicationViews() {
	return (
		<Routes>
			<Route path='/' element={<Hello />} />
			<Route path='/Tags' element={<TagList />} />
			<Route path='/Tags/Add' element={<AddTag />} />
      <Route path="/posts" element={<PostList />} />
      <Route path="/posts/:id" element={<PostDetails />} /> 
      <Route path="/Categories" element={<CategoryList />} />
		</Routes>
	);
}
