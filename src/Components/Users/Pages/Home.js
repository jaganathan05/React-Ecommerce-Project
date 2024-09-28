import React from 'react';
import Header from '../Layouts/Header';
import Slider from '../Layouts/Slider';
import ProductList from './AllProducts';
import NavBar from '../Layouts/NavBar'; 


const Home = () => {
  const categories = {
    "Top Wear": ["T-Shirts", "Shirts"],
    "Bottom Wear": ["Jeans", "Trackpants"],
    "Accessories": ["Bags", "Belts", "Watches"],
    "Inner & Sleep Wear": ["Nightwear"]
  };

  return (
    <div>
      <Header />
      <NavBar categories={categories} />
      <Slider />
      <ProductList />
    </div>
  );
};

export default Home;
