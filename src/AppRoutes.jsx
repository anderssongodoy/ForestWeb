import { Route, Routes } from "react-router-dom"
import { Conoce, Identifica } from "./pages"

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="" element={<Conoce />} />
        <Route path="/identifica" element={<Identifica />} />
    </Routes>
  )
}
