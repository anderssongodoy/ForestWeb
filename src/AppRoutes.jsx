import { Route, Routes } from "react-router-dom"
import { Conoce, Identifica } from "./pages"

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/conoce" element={<Conoce />} />
        <Route path="/" element={<Identifica />} />
    </Routes>
  )
}
