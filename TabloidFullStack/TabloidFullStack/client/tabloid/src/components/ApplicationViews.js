import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { TagList } from "./tags/TagList.js";
import { AddTag } from "./tags/AddTag.js";
import { AddCategory } from "./categories/CategoryForm.js";
import { CategoryList } from "./categories/CategoryList.js";

import PostList from "./PostList";
// import AddCategory from "./categories/CategoryForm.js";

export default function ApplicationViews() {
	return (
		<Routes>
			<Route path='/' element={<Hello />} />
			<Route path='/Tags' element={<TagList />} />
			<Route path='/Tags/Add' element={<AddTag />} />
      <Route path="/Categories" element={<CategoryList />} />
      <Route path="/categories/form" element={<AddCategory />} />
        <Route path="/posts" element={<PostList />} />

		</Routes>
	);
}
