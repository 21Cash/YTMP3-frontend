import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Homepage from "./Components/Homepage/Homepage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to={"/Homepage"} />} />
        <Route path="/Homepage" element={<Homepage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
