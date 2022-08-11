
import "./App.css";
import { BrowserRouter as Router,Route , Routes } from 'react-router-dom';
import TimeLine from "./Components/TimeLine";
import Cards from "./Components/Cards";
import VideoSection from "./Components/VideoSection";
import AboutUS from "./Components/AboutUS";
import TimelineSection from "./Components/TimelineSection";
import HomePage from "./Pages/HomePage";
import HomeCarousel from "./Components/HomeCarousel";
import Navbar from "./Components/Navbar";

function App() {
  return (
    <>
        <Router>
              <Routes>
                <Route path="/" exact element={<HomePage/>}/>
                <Route path="/homecarosuel" exact element={<HomeCarousel/>}/>
                <Route path="/Navbar" exact element={<Navbar/>}/>
                <Route path="/timeline" exact element={<TimeLine/>}/>
                <Route path="/cards" exact element={<Cards/>}/>
                <Route path="/videoSection" exact element={<VideoSection/>}/>
                <Route path="/aboutUs" exact element={<AboutUS/>}/>
                <Route path="/timelineSection" exact element={<TimelineSection/>}/>
              </Routes>
         </Router> 

    </>
  );
}

export default App;
