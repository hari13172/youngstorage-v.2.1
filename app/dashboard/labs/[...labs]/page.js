"use client";

import Button from "@/components/button";
import SubHead from "@/components/subhead";
import React, { useState, useEffect } from "react";
import "@/app/dashboard/labs/[...labs]/labs.scss";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { API } from "@/api/api";
import Link from "next/link";
import { mqtt, mqttport } from "@/api/config";

export default function Ubuntu({ params }) {
  const queryClient = useQueryClient();

  const user = queryClient.getQueriesData({ queryKey: ["user"] });
  const username = user[0][1].data?.data?.username;
  console.log("username data:", username)

  const [terminalMessages, setTerminalMessages] = useState([]);
  const host = "(labs💻️youngstorage)$";
  const [deploy, setDeploy] = useState(false)

  //connect mqtt server
  useEffect(() => {
    // prompt.innerHTML =" host"
    var client = new Paho.MQTT.Client(
      mqtt,
      mqttport,
      "/ws",
      "myclientid_" + parseInt(Math.random() * 100, 10)
    );
    // Set callback functions for connection and message reception
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;

    // Connect to the MQTT broker
    client.connect({
      onSuccess: onConnect,
    });

    // Callback function for successful connection
    function onConnect() {
      setTerminalMessages((a) => ([...a, "server pong 🏓", host]))
      // Subscribe to the desired topic
      client.subscribe(`/topic/${username}`);
    }

    // Callback function for connection loss
    function onConnectionLost(responseObject) {
      if (responseObject.errorCode !== 0) {
        setTerminalMessages((a) => ([...a, "server ping..⭕", host]))
        console.log("Connection lost: " + responseObject.errorMessage);
        // Attempt reconnection here
        setTimeout(function () {
          setTerminalMessages((a) => ([...a, "Reconnecting..."]))
          client.connect({
            onSuccess: onConnect,
          });
        }, 5000); // 5 seconds delay before attempting reconnection
      }
    }

    // Callback function for incoming messages
    function onMessageArrived(message) {
      let data = JSON.parse(message.payloadString)
      if (data) {
        setTerminalMessages((a) => ([...a, data?.message]))
        if (data?.isFinished) {
          setTerminalMessages((a) => ([...a, host]))
          queryClient.invalidateQueries("userlabs");
        }
      }
    }
    // Clean up the MQTT connection when the component is unmounted
    return () => {
      client.disconnect();
    };

  }, [username]);

  //this code is to deploy the container
  const DeployAndRedeploy = useMutation({
    mutationFn: () => {
      setTerminalstate(true)
      return API.deploySpawn()
    },
    onSuccess: () => {

    },
  });

  //this code is to upthe vscode option in web
  const UpVSCode = useMutation({
    mutationFn: () => API.upvscode(),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries("userlabs");
    },
  });

  const handleClick = async (state) => {
    alert(state);
    if (state == "deploy" || state == "redeploy") {
    }
  };

  const handleCopyClick = (event) => {
    const container = event.target.parentElement; // Assuming the copy icon is a child of the container element
    const contentToCopy = container.textContent;

    // Create a temporary textarea element to copy the content
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = contentToCopy;
    document.body.appendChild(tempTextArea);

    // Select and copy the content
    tempTextArea.select();
    document.execCommand("copy");

    // Remove the temporary textarea from the DOM
    document.body.removeChild(tempTextArea);
  };

  const labsdata = useQuery({
    queryKey: ["labsdata"],
    queryFn: () => API.deploy(),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const [Terminalstate, setTerminalstate] = useState(true);

  if (labsdata.isLoading) return "loading .....";
  else if (labsdata.isError) {
    return <>{labsdata.error}</>;
  } else {
    let labdata = labsdata.data.data?.data;
    return (
      <div className="ubuntu-container">
        <SubHead>
          {" / "}
          <Link href="/dashboard/labs">Labs</Link>
          <b>
            {params.labs.map((a) => (
              <React.Fragment key={a}>
                {" / "} {a}
              </React.Fragment>
            ))}
          </b>
        </SubHead>

        <div className="flex">
          <div className="ubuntu">
            <img alt="" src="/pro.png" width="80px" />
            <div className="alter">
              <h1>ubuntu labs</h1>
              <span>LTE 22.04 version with root access</span>
              <div className="button">
                <button className="bn1">not running</button>
                <button className="bn2">offline</button>
                <button className="bn3">public</button>
              </div>
            </div>
          </div>
          <div className="button">
            {labdata.length > 0 && (
              <Button
                value="code"
                color="btn-info"
                onClick={() => UpVSCode.mutate()}
              >
                <Terminal />
              </Button>
            )}
            {labdata.length > 0 || (
              <Button
                value="deploy"
                color="btn-success"
                onClick={() => DeployAndRedeploy.mutate()}
              >
                <Retry />
              </Button>
            )}

            {labdata.length > 0 && (
              <Button
                value="Redeplay"
                color="btn-warning"
                onClick={() => DeployAndRedeploy.mutate()}
              >
                <Play />
              </Button>
            )}

            {labdata.length > 0 && (
              <Button
                value="stop"
                color="btn-error"
                onClick={() => handleClick("stop")}
              >
                <Stop />
              </Button>
            )}
          </div>
        </div>

        {/* if container deploy na this content will show */}
        {labdata.length > 0 ? (
          <div className="content">
            <div className="left">
              <h3>read me</h3>
              <p>
                Lorem ipsum dolor sit amet consectetur. Viverra vitae porttitor
                convallis amet rutrum id amet. Etiam in eu ac dignissim. Turpis
                nunc volutpat sed est erat feugiat. Suscipit scelerisque
                habitant pharetra congue amet adipiscing orci. Ut laoreet neque
                amet consectetur interdum. <br />
                At vehicula pellentesque mattis consectetur a venenatis urna
                turpis. venenatis urna turpis.
                <br />
                Viverra vitae porttitor convallis amet rutrum id amet. Etiam in
                eu ac dignissim. Turpis nunc volutpat sed est erat feugiat.
                Suscipit
              </p>
            </div>
            <div className="right">
              <h3>Lab information</h3>

              <div className="prop">
                <h4>Ip address</h4>
                <span>
                  {labdata[0]?.wgipAddress}
                  <CopySvg handleCopyClick={handleCopyClick} />
                </span>
              </div>
              <div className="prop">
                <h4>UserName</h4>
                <span>
                  {labdata[0]?.username}
                  <CopySvg handleCopyClick={handleCopyClick} />
                </span>
              </div>
              <div className="prop">
                <h4>Password</h4>
                <span>
                  {labdata[0]?.password}
                  <CopySvg handleCopyClick={handleCopyClick} />
                </span>
              </div>
              <div className="prop">
                <h4>SSH</h4>
                <span>
                  {`${labdata[0]?.username}@${labdata[0]?.wgipAddress}`}
                  <CopySvg handleCopyClick={handleCopyClick} />
                </span>
              </div>
              <div className="prop">
                <h4>code-server</h4>
                <span>
                  {labdata[0]?.vsCode
                    ? labdata[0]?.vsCode
                    : "please click the code"}
                  <CopySvg handleCopyClick={handleCopyClick} />
                </span>
              </div>
              <div className="prop">
                <h4>Password</h4>
                <span>
                  {labdata[0]?.vsPassword
                    ? labdata[0]?.vsPassword
                    : "************"}
                  <CopySvg handleCopyClick={handleCopyClick} />
                </span>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        {/* terminal */}
        <div className="terminal-main-box">
          <div className="terminal-container">
            <h1>Terminal</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className={`${Terminalstate && "active"}`}
              onClick={() => setTerminalstate((a) => !a)}
            >
              <path
                d="M12 2C9.34784 2 6.8043 3.05357 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 13.3132 2.25866 14.6136 2.7612 15.8268C3.26375 17.0401 4.00035 18.1425 4.92893 19.0711C5.85752 19.9997 6.95991 20.7362 8.17317 21.2388C9.38642 21.7413 10.6868 22 12 22C13.3132 22 14.6136 21.7413 15.8268 21.2388C17.0401 20.7362 18.1425 19.9997 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C18.1425 4.00035 17.0401 3.26375 15.8268 2.7612C14.6136 2.25866 13.3132 2 12 2ZM12 4C14.1217 4 16.1566 4.84285 17.6569 6.34315C19.1571 7.84344 20 9.87827 20 12C20 14.1217 19.1571 16.1566 17.6569 17.6569C16.1566 19.1571 14.1217 20 12 20C9.87827 20 7.84344 19.1571 6.34315 17.6569C4.84285 16.1566 4 14.1217 4 12C4 9.87827 4.84285 7.84344 6.34315 6.34315C7.84344 4.84285 9.87827 4 12 4ZM7 10L12 15L17 10L7 10Z"
                fill="black"
              />
            </svg>
          </div>
          <div className={`new ${Terminalstate && "active"}`}>
            <div className="prompt" id="prompt">
              {host}
              {terminalMessages?.map((a,i) => <div key={a+i}>{a}</div>)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const CopySvg = ({ handleCopyClick }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="22"
      viewBox="0 0 19 22"
      fill="none"
      onClick={handleCopyClick}
    >
      <path
        d="M17 20H6V6H17M17 4H6C5.46957 4 4.96086 4.21071 4.58579 4.58579C4.21071 4.96086 4 5.46957 4 6V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H17C17.5304 22 18.0391 21.7893 18.4142 21.4142C18.7893 21.0391 19 20.5304 19 20V6C19 5.46957 18.7893 4.96086 18.4142 4.58579C18.0391 4.21071 17.5304 4 17 4ZM14 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V16H2V2H14V0Z"
        fill="black"
      />
    </svg>
  );
};

const Terminal = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="19"
      viewBox="0 0 21 19"
      fill="none"
    >
      <path
        d="M18.3335 16.3333V4.33334H2.3335V16.3333H18.3335ZM18.3335 0.333344C18.8639 0.333344 19.3726 0.544057 19.7477 0.91913C20.1228 1.2942 20.3335 1.80291 20.3335 2.33334V16.3333C20.3335 16.8638 20.1228 17.3725 19.7477 17.7476C19.3726 18.1226 18.8639 18.3333 18.3335 18.3333H2.3335C1.80306 18.3333 1.29436 18.1226 0.919282 17.7476C0.54421 17.3725 0.333496 16.8638 0.333496 16.3333V2.33334C0.333496 1.22334 1.2335 0.333344 2.3335 0.333344H18.3335ZM11.3335 14.3333V12.3333H16.3335V14.3333H11.3335ZM7.9135 10.3333L3.9035 6.33334H6.7335L10.0335 9.63334C10.4235 10.0233 10.4235 10.6633 10.0335 11.0533L6.7535 14.3333H3.9235L7.9135 10.3333Z"
        fill="white"
      />
    </svg>
  );
};

const Retry = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="24"
      viewBox="0 0 19 24"
      fill="none"
    >
      <path
        d="M0.666504 0.333344V23.6667L18.9998 12L0.666504 0.333344Z"
        fill="white"
      />
    </svg>
  );
};
const Play = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="18"
      viewBox="0 0 22 18"
      fill="none"
    >
      <path
        d="M12.8335 5H11.3335V10L15.6135 12.54L16.3335 11.33L12.8335 9.25V5ZM12.3335 0C9.94655 0 7.65736 0.948211 5.96953 2.63604C4.28171 4.32387 3.3335 6.61305 3.3335 9H0.333496L4.2935 13.03L8.3335 9H5.3335C5.3335 7.14348 6.07099 5.36301 7.38375 4.05025C8.6965 2.7375 10.477 2 12.3335 2C14.19 2 15.9705 2.7375 17.2832 4.05025C18.596 5.36301 19.3335 7.14348 19.3335 9C19.3335 10.8565 18.596 12.637 17.2832 13.9497C15.9705 15.2625 14.19 16 12.3335 16C10.4035 16 8.6535 15.21 7.3935 13.94L5.9735 15.36C7.6035 17 9.8335 18 12.3335 18C14.7204 18 17.0096 17.0518 18.6975 15.364C20.3853 13.6761 21.3335 11.3869 21.3335 9C21.3335 6.61305 20.3853 4.32387 18.6975 2.63604C17.0096 0.948211 14.7204 0 12.3335 0Z"
        fill="white"
      />
    </svg>
  );
};

const Stop = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="19"
      height="18"
      viewBox="0 0 19 18"
      fill="none"
    >
      <path
        d="M5.6035 0L0.333496 5.27V12.73L5.6035 18H13.0635L18.3335 12.73V5.27L13.0635 0M5.7435 4L9.3335 7.59L12.9235 4L14.3335 5.41L10.7435 9L14.3335 12.59L12.9235 14L9.3335 10.41L5.7435 14L4.3335 12.59L7.9235 9L4.3335 5.41"
        fill="white"
      />
    </svg>
  );
};
