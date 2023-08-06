import Button from "@/components/button";
import { Link } from "@mui/material";

export default function Home() {
  return (
    <>
      home
      <Button value=" ">
        <Link href="/dashboard" style={{ all: "unset" }}>
          dashboard
        </Link>
      </Button>
    </>
  );
}
