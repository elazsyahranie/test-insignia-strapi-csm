import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./home/home/home";
import AuthPage from "./authPage/authPage";
import "./App.css";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
