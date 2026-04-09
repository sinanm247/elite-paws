import { Route, Routes } from "react-router-dom";

export default function AppRouter({ routes, location }) {
  return (
    <Routes location={location}>
      {routes.map(
        ({ path, element }) => {
          return (
            <Route
              key={path}
              path={path}
              element={element}
            />
          );
        }
      )}
    </Routes>
  );
}
