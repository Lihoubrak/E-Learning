import { BrowserRouter, Route, Routes } from "react-router-dom";
import { publicRoute } from "./Router";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {publicRoute.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.component />}
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}
