import { BrowserRouter, Route, Routes } from "react-router-dom";
import Top from "./Top.tsx";
import Floor from "./Floor.tsx";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Top />} />
        <Route path="/floor/:towerId" element={<Floor />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
