import "./App.css";
import { Routes, Route } from "react-router-dom";
import CreateProfile from "./pages/CreateProfile";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import CreateProject from "./pages/CreateProject";
import Login from "./pages/Login";
import ExpandProject from "./pages/ExpandProject";
import Discover from "./pages/Discover";
import Messages from "./pages/Messages";
import ExpandProjectVolunteer from "./pages/ExpandProjectVolunteer";
import ExpandProjectDonate from "./pages/ExpandProjectDonate";

function App() {
  return (
    <Routes>
      <Route path="/" element={<CreateProfile />} />
      <Route path="/login" element={<Login />} />
      <Route exact path="/createprofile" element={<CreateProfile />}></Route>
      <Route path="/createprofile" element={<CreateProfile />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/createproject" element={<CreateProject />} />
      <Route path="/expandproject" element={<ExpandProject />} />
      <Route
        path="/expandproject/volunteer"
        element={<ExpandProjectVolunteer />}
      />
      <Route path="/expandproject/donate" element={<ExpandProjectDonate />} />
    </Routes>
  );
}

export default App;
