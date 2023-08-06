"use client";

import Alerts from "@/components/alerts";
import SubHead from "@/components/subhead";
import { useEffect, useState } from "react";
import "@/app/dashboard/networks/network.scss";
import { API } from "@/api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import Badge from "@/components/badge";
// import DeviceList from "@/components/DeviceList";

export default function Network() {
  const queryClient = useQueryClient();

  const [addDevice, SetAdd] = useState(false);
  const [peerAcccess, setPeerAccess] = useState({
    status: false,
    publicKey: "",
    title: "",
  });
  const networks = useQuery({
    queryKey: ["networks"],
    queryFn: () => API.networks(),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const wgpeerdata = useQuery({
    queryKey: ["wgperrdata"],
    queryFn: () => API.getwgpeer(),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const [isPeer, serIsPeer] = useState(false);

  useEffect(() => {
    if (isPeer) {
      const intervalId = setInterval(() => {
        queryClient.invalidateQueries("networks");
        queryClient.invalidateQueries("wgperrdata");
      }, 5000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [isPeer]);

  if (networks.isLoading && wgpeerdata.isLoading) return "loading .....";
  else if (networks.isError && wgpeerdata.isError) {
    return (
      <>
        {networks.error}
        {wgpeerdata.error}
      </>
    );
  } else {
    const handleClick = () => {
      SetAdd(true);
    };
    if (
      networks.data?.data?.data.length &&
      wgpeerdata.data?.data?.data.length
    ) {
      if (!isPeer) {
        serIsPeer(true);
      }
      let network = networks.data.data?.data[0];
      let device = [...network?.labPeer].concat(...network?.peerList);
      let wgpeer = wgpeerdata.data?.data?.data;
      return (
        <>
          <div className="net">
            <div className="network-container">
              <div className="network">
                <SubHead>
                  <b>{" / "} Networks</b>
                </SubHead>
                <Alerts />
                {network ? (
                  <div className="device">
                    <div className="man">
                      <div className="crumbs">
                        <button
                          className="button"
                          onClick={() => handleClick()}
                        >
                          add device
                        </button>
                        <button className="button1">
                          {device.length} / {network?.maxPeer + 1}
                        </button>
                      </div>

                      <div className="ions">
                        <img alt="" src="/grid2.png" />
                        <img alt="" src="/alignleft.png" />
                      </div>
                    </div>
                    <hr />
                    <div className="devices-list">
                      {device?.map((a) => {
                        let current = wgpeer?.filter(
                          (e) => a?.publicKey == e?.peer
                        );
                        let time = current[0]["latest handshake"].split(":");
                        let filltime = "";
                        // this is for the get the time status for peer online and ofline
                        let peerstate = false;
                        if (time.length > 2) {
                          if (time.length == 4) {
                            filltime = `${time[0]} day ago`;
                          } else if (time.length == 3) {
                            filltime = `${time[0]} hours ago`;
                          }
                          peerstate = false;
                        } else if (time.length == 1 && time[0] != "") {
                          filltime = `${time[0]} seconds ago`;
                          peerstate = true;
                        } else if (time.length == 2) {
                          filltime = `${time[0]} minutes ${time[1]} seconds ago`;
                          peerstate = parseInt(time[0]) <= 2;
                          if (parseInt(time[0]) == 2 && parseInt(time[1]) > 2) {
                            peerstate = false;
                          }
                        }
                        return (
                          <div className="device-box" key={a.ipAddress}>
                            <div className="flex">
                              <h3>{a.deviceName}</h3>
                              <Badge
                                value={`${peerstate ? "online" : "offline"}`}
                                color={`btn-${peerstate ? "success" : "error"}`}
                              ></Badge>
                            </div>
                            <div className="lab">
                              <span>{a.deviceType}</span>
                              <h6>{GetCreatedTime(a?.createdAt)}</h6>
                            </div>
                            <div className="must"></div>
                            <div className="address">
                              <span>IP Address</span>
                              <span>{a.ipAddress}</span>
                            </div>
                            <div className="address">
                              <span>endpoint</span>
                              <span>
                                {current[0]?.endpoint
                                  ? current[0]?.endpoint
                                  : "⌛"}
                              </span>
                            </div>
                            <div className="address">
                              <span>latest handshake</span>
                              <span>{filltime ? filltime : "🚫"}</span>
                            </div>
                            <div className="address">
                              <span>transfer</span>
                              <span>
                                {current[0]?.transfer?.received
                                  ? current[0]?.transfer?.received
                                  : "0"}{" "}
                                received ,{" "}
                                {current[0]?.transfer?.sent
                                  ? current[0]?.transfer?.sent
                                  : "0"}{" "}
                                sent
                              </span>
                            </div>
                            <div className="png">
                              <div
                                onClick={() =>
                                  setPeerAccess((i) => ({
                                    ...i,
                                    status: true,
                                    publicKey: a?.publicKey,
                                    title: "png",
                                  }))
                                }
                              >
                                <img
                                  alt=""
                                  src="/qr.png"
                                  width={20}
                                  height={20}
                                />
                                <span>scan</span>
                              </div>
                              <div
                                onClick={() =>
                                  setPeerAccess((i) => ({
                                    ...i,
                                    status: true,
                                    publicKey: a?.publicKey,
                                    title: "download",
                                  }))
                                }
                              >
                                <img
                                  alt=""
                                  src="/download.png"
                                  width={20}
                                  height={20}
                                />
                                <span>download</span>
                              </div>
                              <div
                                onClick={() =>
                                  setPeerAccess((i) => ({
                                    ...i,
                                    status: true,
                                    publicKey: a?.publicKey,
                                    title: "conf",
                                  }))
                                }
                              >
                                <img
                                  alt=""
                                  src="/information.png"
                                  width={20}
                                  height={20}
                                />
                                <span>info</span>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ) : (
                  <>
                    <h1>first build the lab</h1>
                    <Link href="/dashboard/labs">labs</Link>
                  </>
                )}
              </div>
            </div>
            {addDevice && <Popup setAdd={SetAdd} />}
            {peerAcccess.status && (
              <PeerDataGet {...peerAcccess} setPeerAccess={setPeerAccess} />
            )}
          </div>
        </>
      );
    } else {
      return (
        <>
          <div className="net">
            <div className="network-container">
              <div className="network">
                <SubHead>
                  <b>{" / "} Networks</b>
                </SubHead>
                <Alerts />
                <>
                  <h1>first build the lab</h1>
                  <Link href="/dashboard/labs">labs</Link>
                </>
              </div>
            </div>
          </div>
        </>
      );
    }
  }
}

const Popup = (props) => {
  const queryClient = useQueryClient();

  const [devicedata, setDevicedata] = useState({
    deviceName: "",
    deviceType: "",
  });

  const addPeer = useMutation({
    mutationFn: (body) => {
      return API.addpeer(body);
    },
    onSuccess: (res) => {
      // Invalidate and refetch
      queryClient.invalidateQueries("networks");
    },
    onError: (error) => {
      console.log("value error:", error);
    },
  });

  const AddnewDevice = () => {
    if (devicedata.deviceName && devicedata.deviceType) {
      addPeer.mutate(devicedata);
    } else {
      alert("please add the device details");
    }
  };

  return (
    <div className="pop-container">
      <div className="add-devices-box">
        <div className="pop">
          <span>Add new device to the network</span>
          <img alt="" src="/Close.png" onClick={() => props.setAdd(false)} />
        </div>

        <div className="whole">
          <div className="box">
            <div className="label">
              <label>Device name</label>
              <input
                type="text"
                placeholder="Test Device"
                name="deviceName"
                value={devicedata.deviceName}
                onChange={(e) => {
                  setDevicedata((a) => ({
                    ...a,
                    [e.target.name]: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="box">
            <div className="label">
              <label>Device type</label>
              <input
                type="text"
                placeholder="Desktop | Mobile | tab"
                name="deviceType"
                value={devicedata.deviceType}
                onChange={(e) => {
                  setDevicedata((a) => ({
                    ...a,
                    [e.target.name]: e.target.value,
                  }));
                }}
              />
            </div>
          </div>
          <div className="button">
            <button className="button3" onClick={() => props.setAdd(false)}>
              cancel
            </button>
            <button className="button4" onClick={AddnewDevice}>
              add device
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const PeerDataGet = (props) => {
  console.log("peerdata:", props);
  const [data, setData] = useState("");
  useEffect(() => {
    (async () => {
      if (props.title == "png") {
        const res = await API.wgpeer(props.publicKey, props.title, {
          responseType: "arraybuffer",
        });
        if (res.status == 200) {
          const blob = new Blob([res.data], { type: "image/png" });
          const url = window.URL.createObjectURL(blob);
          setData(url);
        }
      } else if (props.title == "conf") {
        const res = await API.wgpeer(props.publicKey, props.title);

        if (res.status == 200) {
          const blob = new Blob([res.data], { type: "text/plain" });
          const url = window.URL.createObjectURL(blob);
          setData({ data: res.data.split("\n"), url });
        }
      }
    })();
  }, []);
  return (
    <div className="pop-container">
      <span
        onClick={() => {
          props.setPeerAccess({ status: false, publicKey: "", title: "" });
        }}
        className="timesclose"
      >
        &times;
      </span>

      {props.title == "png" ? (
        <>QR CODE</>
      ) : props.title == "conf" ? (
        <>Configuration file</>
      ) : (
        ""
      )}
      {props.title == "png" && data && <img src={data} />}
      <pre>
        {props.title == "conf" && data && (
          <>
            {data?.data?.map((a, i) => (
              <div key={a + i}>{a}</div>
            ))}
            <a href={data?.url} download="wg0.conf">
              download
            </a>
          </>
        )}
      </pre>
    </div>
  );
};

const GetCreatedTime = (time) => {
  // Replace 1691151014 with your Unix timestamp
  const unixTimestamp = parseInt(time);

  // Convert Unix timestamp to milliseconds
  const timestampInMilliseconds = unixTimestamp * 1000;

  // Create Date objects for the given timestamp and the current time
  const givenDate = new Date(timestampInMilliseconds);
  const currentDate = new Date();

  // Calculate the time difference in milliseconds
  const timeDifference = currentDate - givenDate;

  // Define time units in milliseconds
  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const month = 30 * day;
  const year = 365 * day;

  // Determine the appropriate time unit and value
  let timeAgo;
  if (timeDifference < minute) {
    timeAgo = `${Math.floor(timeDifference / 1000)} seconds ago`;
  } else if (timeDifference < hour) {
    timeAgo = `${Math.floor(timeDifference / minute)} minutes ago`;
  } else if (timeDifference < day) {
    timeAgo = `${Math.floor(timeDifference / hour)} hours ago`;
  } else if (timeDifference < month) {
    timeAgo = `${Math.floor(timeDifference / day)} days ago`;
  } else if (timeDifference < year) {
    timeAgo = `${Math.floor(timeDifference / month)} months ago`;
  } else {
    timeAgo = `${Math.floor(timeDifference / year)} years ago`;
  }

  return timeAgo;
};
