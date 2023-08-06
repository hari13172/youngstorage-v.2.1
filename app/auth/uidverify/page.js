"use client";

import { API } from "@/api/api";
import React, { useEffect, useState } from "react";

function UidVerify({ searchParams }) {
  if (searchParams?.uid) {
    const [loading, setLoading] = useState(true);
    const [message, setmessage] = useState({ message: "", status: undefined });
    useEffect(() => {
      (async () => {
        const data = await API.userVerify(searchParams?.uid);
        console.log(data);
        if (data) {
          setmessage((a) => ({
            ...a,
            message: data?.message,
            status: data?.status,
          }));
        }
        setLoading(false);
      })();
    }, []);
    return (
      <div>
        {loading
          ? "verifing....."
          : message.status + "success"
          ? message.message
          : "error"+message.message + "error"}
      </div>
    );
  } else {
    return <div>uid not found</div>;
  }
}

export default UidVerify;
