import React, { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import MainNavBar from "../Constants/Components/MainNavbar";
import PagesLoading from "../Components/Common/LoadingSpinner/PagesLoading";

export default function ClientLayout() {
  const location = useLocation();
  const hideNavBarOnAuthPage =
    location.pathname === "/auth" || location.pathname === "/not-found";

  return (
    <>
      {!hideNavBarOnAuthPage && <MainNavBar isAdmin={false} />}
      <main>
        <Suspense fallback={<PagesLoading />}>
          <Outlet />
        </Suspense>
      </main>
      {/* <Footer /> */}
    </>
  );
}
