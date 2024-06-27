import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AnimeProvider } from "./contexts/AnimeContext";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import PrivateRoute from "./auth/PrivateRoute";
import AnimeHome from "./components/AnimeHome";
import AnimePage from "./components/AnimePage";

function App() {
  return (
    <AnimeProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<AnimeHome />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/anime/:id" element={<AnimePage />} />
        </Routes>
      </Router>
    </AnimeProvider>
  );
}

export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import AnimePage from "./AnimePage";
// import Login from "./Login";
// import Signup from "./Signup";
// import PrivateRoute from "./PrivateRoute";
// import "./App.css";
// import AnimeHome from "./AnimeHome";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<Login setIsAuthenticated={false} />} />
//         <Route path="/signup" element={<Signup setIsAuthenticated={false} />} />
//         <PrivateRoute path="/" element={<AnimeHome />} />
//         <PrivateRoute path="/anime/:id" element={<AnimePage />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;
