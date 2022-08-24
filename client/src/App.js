import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import TimeLine from "./Components/TimeLine";
import Cards from "./Components/Cards";
import VideoSection from "./Components/VideoSection";
import AboutUS from "./Components/AboutUS";
import TimelineSection from "./Components/TimelineSection";
import HomePage from "./Pages/HomePage";
import HomeCarousel from "./Components/HomeCarousel";
import Navbar from "./Components/Navbar";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/SignIn";
import SecretTokenFile from "./Components/SecretToken";
import ValidatorDashboard from "./Components/ValidatorDashboard";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/homecarosuel" exact element={<HomeCarousel />} />
          <Route path="/Navbar" exact element={<Navbar />} />
          <Route path="/timeline" exact element={<TimeLine />} />
          <Route path="/cards" exact element={<Cards />} />
          <Route path="/videoSection" exact element={<VideoSection />} />
          <Route path="/aboutUs" exact element={<AboutUS />} />
          <Route path="/timelineSection" exact element={<TimelineSection />} />
          <Route path="/SignIn" exact element={<SignIn />} />
          <Route path="/SignUp" exact element={<SignUp />} />
          <Route path="/SecretTokenFile" exact element={<SecretTokenFile />} />
          <Route path="/Validator-Dashboard" exact element={<ValidatorDashboard />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
