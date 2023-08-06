"use client";

import Button from "@/components/button";
import "@/app/auth/verify/verify.scss";
import { useRouter } from "next/navigation"; // Correct import

export default function Verify({ searchParams }) {
  const router = useRouter();
  console.log(searchParams);
  return (
    <Check
      email={searchParams?.email}
      username={String(searchParams?.email).split("@")[0]}
      router={router}
    />
  );
}

const Check = ({ email, username,router }) => {
  return (
    <div className="verify-container">
      <div className="verify">
        <div className="lottie">
          <lottie-player
            background="transparent"
            speed="1"
            autoplay
            loop
            src="/mail.json"
            width="30px"
          ></lottie-player>
        </div>
        <div className="test">
          <h1>Please verify your Email address</h1>
          <h4>
            Hii <b>{username}</b>, Check your email and click verify to enjoy
            our services
          </h4>
          <span>
            Email: <b>{email}</b>
          </span>
          
        </div>
      </div>
    </div>
  );
};
