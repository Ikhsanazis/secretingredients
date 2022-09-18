import React from "react";
import Navigation from "../components/navigation";
import Newrecipe from "../components/newrecipe";
import Popularmenu from "../components/popular";
import Category from "../components/category";
import Searchbar from "../components/searchbar";


export default function Home() {
  
  return (
    <div id="home" className="container">
      <div className="col-lg-4 mx-auto">
        <Searchbar />
        <Newrecipe />
        <Category />
        <Popularmenu  />
      </div>
      <Navigation />
    </div>
  );
}
