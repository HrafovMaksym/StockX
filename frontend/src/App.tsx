import React, { ReactPortal, useMemo } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ResetPage from "./pages/ResetPassword";
import HeaderLayout from "./layout/HeaderLayout";
import FullItem from "./pages/FullItem";
import FoundItems from "./components/FoundItems";
import { useAppSelector } from "./redux/hook";

import "./scss/styles.scss";
type ComponentType = React.FC;
function App() {
  const userToken = useMemo(() => localStorage.getItem("token"), []);
  const searchInputValue = useAppSelector(
    (state) => state.searchSlice.searchValue,
  );

  const renderMainContent = (Component: ComponentType) =>
    searchInputValue.length > 0 ? (
      <div className="mt-6 flex items-center justify-center">
        <FoundItems />
      </div>
    ) : (
      <Component />
    );

  return (
    <Routes>
      <Route path="/" element={<HeaderLayout />}>
        <Route path="" element={renderMainContent(Home)} />
        <Route path=":id" element={renderMainContent(FullItem)} />
      </Route>

      <Route
        path="/auth"
        element={userToken ? <Navigate to="/profile" /> : <Auth />}
      />
      <Route path="/profile" element={<Profile />} />
      <Route path="/resetPassword/:token" element={<ResetPage />} />
    </Routes>
  );
}

export default App;
