"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

function Signout() {
  const router = useRouter();
  useEffect(() => {
    (() => {
      var cookies = document.cookie.split(";");

      for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
      }
      router.push("/");
    })();
  }, []);
  return <div>Signout user</div>;
}
  
export default Signout;
