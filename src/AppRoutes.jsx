import { Route, Routes } from "react-router-dom"
import { Citizien, Identifica, Report, Reporta, Specialist, Trivia, Video } from "./pages"

export const AppRoutes = () => {
  return (
    <Routes>
        <Route path="" element={<Identifica />} />
        <Route path="reporta" element={<Reporta />} />
        <Route path="trivia" element={<Trivia />} />
        <Route path="citizien" element={<Citizien />} />
        <Route path="specialist" element={<Specialist />} />
        <Route path="report" element={<Report />} />
        <Route path="video" element={<Video />} /> 
    </Routes>
  )
}
