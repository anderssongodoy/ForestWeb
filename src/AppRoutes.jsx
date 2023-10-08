import { Route, Routes } from "react-router-dom"
import { Conoce, Identifica } from "./pages"
import { Topbar } from "./components/Topbar"

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Topbar />}>
        <Route path="" element={<Conoce />} />
        <Route path="/identifica" element={<Identifica />} />
      </Route>
    </Routes>
  )
}
