"use client";

import Alerts from "@/components/alerts";
import SubHead from "@/components/subhead";
import { useRouter } from "next/navigation";
import "@/app/dashboard/labs/lab.scss";
import Link from "next/link";
// import { useQueryClient } from "@tanstack/react-query";

function Labs() {
  const router = useRouter();
  // const queryClient = useQueryClient()
  //query data of the labs if exist we can get the data
  // const userlabs = queryClient.getQueriesData({ queryKey: ["userlabs"] })
  const ChangePath = (route) => {
    router.push(route);
  };
  return (
    <>
      <div className="lab-container">
        <SubHead>
          <b>{" / "}Labs</b>
        </SubHead>
        <Alerts />

        <div className="lab-box">
          <div className="labs">
            <img src="/ubuntu.png" />
            <button onClick={() => ChangePath("labs/ubuntu")}>Dashboard</button>
          </div>
          <div className="labs">
            <img src="/parrotos.png" />
            <button onClick={() => ChangePath("labs/parrot")}>Dashboard</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Labs;
