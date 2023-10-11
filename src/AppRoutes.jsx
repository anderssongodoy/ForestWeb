import { Route, Routes } from "react-router-dom"
import { Citizien, Identifica, Reporta, Specialist, Trivia } from "./pages"

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="" element={<Identifica />} />
        <Route path="reporta" element={<Reporta />} />
        <Route path="trivia" element={<Trivia />} />
        <Route path="citizien" element={<Citizien />} />
        <Route path="specialist" element={<Specialist />} />
    </Routes>
  )
}
