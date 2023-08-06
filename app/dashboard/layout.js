"use client";

import { API } from "@/api/api";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Navbar from "@/components/nav";
import "@/app/dashboard/layout.scss";

function Dashboardmenu({ children }) {
  const router = useRouter();
  const user = useQuery({
    queryKey: ["user"],
    queryFn: () => API.user(),
    refetchOnWindowFocus: false,
    retry: 1,
    cacheTime: 50000,
    onError: (error) => {
      if (error.data?.detail === "Invalid token") {
        return router.push("/auth/signin");
      }
    },
  });

  if (user.isLoading) return "loading .....";
  else if (user.isError) {
    return (
      <>
        {user.error.data?.detail === "Invalid token" &&
          "Invalid token - user need Authorization Token Please Login"}
      </>
    );
  } else {
    console.log("user data",user.data.data);
    return (
      <div className="dashboard-container-main-app">
        <Navbar />
        <div className="dashboard-dynamic-content">{children}</div>
      </div>
    );
  }
}

export default Dashboardmenu;
