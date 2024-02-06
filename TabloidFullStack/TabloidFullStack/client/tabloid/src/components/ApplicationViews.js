import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { TagList } from "./tags/TagList.js";

export default function ApplicationViews() {
	return (
		<Routes>
			<Route path='/' element={<Hello />} />
			<Route path='/Tags' element={<TagList />} />
		</Routes>
	);
}
