// src/Page/Home/Home.js
import React, { useEffect, Suspense, lazy } from "react";
import FutureBoxes from "../../assets/Boxes/FutureBoxes";
import Header from "../Header/Header";
import Hero from "../Hero/Hero";
import Carousel from "../Carousel/Carousel";
import NewFutureBox from "../FutureBox/NewFutureBox";
import Footer from "../Footer/Footer";
import './Home.css';

// Lazy load StylesLoader
//const StylesLoader = lazy(() => import('../../assets/StylesLoader'));

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      <Header />
      <Hero />
      <Carousel />
      <NewFutureBox />
      <FutureBoxes />
      <Footer />
      {/* Load StylesLoader after Home page   <Suspense fallback={null}>
        <StylesLoader />
      </Suspense>*/}
      
    </div>
  )
}

export default Home;
