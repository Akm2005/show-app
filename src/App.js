import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ShowDetails from "./components/ShowDetails";
import Home from "./components/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/show/:id" element={<ShowDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
