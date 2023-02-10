import Footer from "./components/Footer";
import Home from "./pages/Home";
import Register from "./pages/Register";
import SinglePost from "./pages/SinglePost";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./pages/ProtectedRoute";
import Settings from "./pages/Settings";
import Write from "./pages/Write";
import TopBar from "./components/TopBar";

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route
          path="/write"
          element={
            <ProtectedRoute>
              <Write />
            </ProtectedRoute>
          }
        ></Route>
        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        ></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/posts/:postId" element={<SinglePost />}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
