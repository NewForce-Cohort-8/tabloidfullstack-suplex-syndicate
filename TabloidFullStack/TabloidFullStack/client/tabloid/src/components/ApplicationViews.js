import React from "react";
import { Route, Routes } from "react-router-dom";
import Hello from "./Hello";
import { CategoryList } from "./categories/CategoryList";

export default function ApplicationViews() {

 return(
      <Routes>
        <Route path="/" element={<Hello />} />
         <Route path="/Categories" element={<CategoryList />} />
      </Routes>
   );
 
}