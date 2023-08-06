import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";

export default function Alertresponce(props) {
  return (
    <div className="alert-msg-box">
      <Alert severity={props.type} variant="filled">
        <AlertTitle>{props.title}</AlertTitle>
        {props.message}
      </Alert>
    </div>
  );
}
