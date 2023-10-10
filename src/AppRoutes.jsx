import { Route, Routes } from "react-router-dom"
import { Conoce, Identifica, Reporta, Trivia } from "./pages"

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/conoce" element={<Conoce />} />
        <Route path="/" element={<Identifica />} />
        <Route path="/trivia" element={<Trivia />} />
        <Route path="/reporta" element={<Reporta />} />
    </Routes>
  )
}
