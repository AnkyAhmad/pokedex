import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Details from "~/pages/Details";
import Home from "~/pages/Home";

export default function AppRoute() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:name" element={<Details />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
