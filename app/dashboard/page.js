"use client";

import { API } from "@/api/api";
import React from "react";
import "@/app/dashboard/dashboard.scss";
import SubHead from "@/components/subhead";

import { useQuery } from "@tanstack/react-query";

function dashboard() {
  const usernetworks = useQuery({
    queryKey: ["usernetworks"],
    queryFn: () => API.networks(),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  if (usernetworks.isLoading) return "loading .....";
  else if (usernetworks.isError) {
    return <>{usernetworks.error}</>;
  } else {
    console.log(usernetworks.data.data);
    return (
      <div className="dash-container">
        <SubHead />

        <div className="array">
          <div className="header">
            <h1>Overview</h1>
          </div>
          <div className="dashboard-container-list">
            <div className="container">
              <img alt="" src="/Broken.png" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="78"
                height="200"
                viewBox="0 0 78 125"
                fill="none"
              >
                <path
                  d="M77.5 105V19.5C77.5 8.73045 68.7696 0 58 0H13.2292C10.6173 0 8.5 2.11735 8.5 4.72923C8.5 5.87104 8.08691 6.97429 7.33699 7.8353L2.4512 13.4449C-0.757831 17.1294 1.39539 22.9044 6.23325 23.5885L16.9996 25.111C21.9856 25.8161 22.1112 32.9722 17.153 33.8519C15.0398 34.2268 13.5 36.0638 13.5 38.2101V52.9677C13.5 60.1911 17.0407 66.9557 22.9763 71.0722L32.1362 77.4251C39.2229 82.34 41.5982 91.7291 37.7014 99.4228C31.882 110.912 40.231 124.5 53.1103 124.5H58C68.7696 124.5 77.5 115.77 77.5 105Z"
                  fill="#ECECEC"
                  fillOpacity="0.3"
                />
              </svg>
              <div className="dashboard">
                <h3>Instance</h3>
                <span>0 / 1</span>
              </div>
              <div className="instance">
                <div className="circle"> </div>
                <h1>00</h1>
              </div>
            </div>

            <div className="container">
              <img alt="" src="/Broken.png" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="78"
                height="200"
                viewBox="0 0 78 125"
                fill="none"
              >
                <path
                  d="M77.5 105V19.5C77.5 8.73045 68.7696 0 58 0H13.2292C10.6173 0 8.5 2.11735 8.5 4.72923C8.5 5.87104 8.08691 6.97429 7.33699 7.8353L2.4512 13.4449C-0.757831 17.1294 1.39539 22.9044 6.23325 23.5885L16.9996 25.111C21.9856 25.8161 22.1112 32.9722 17.153 33.8519C15.0398 34.2268 13.5 36.0638 13.5 38.2101V52.9677C13.5 60.1911 17.0407 66.9557 22.9763 71.0722L32.1362 77.4251C39.2229 82.34 41.5982 91.7291 37.7014 99.4228C31.882 110.912 40.231 124.5 53.1103 124.5H58C68.7696 124.5 77.5 115.77 77.5 105Z"
                  fill="#ECECEC"
                  fillOpacity="0.3"
                />
              </svg>
              <div className="dashboard">
                <h3>Device</h3>
                <span>0 / 4</span>
              </div>
              <div className="instance">
                <div className="circle"> </div>
                <h1>00</h1>
              </div>
            </div>

            <div className="container">
              <img alt="" src="/Broken.png" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="78"
                height="200"
                viewBox="0 0 78 125"
                fill="none"
              >
                <path
                  d="M77.5 105V19.5C77.5 8.73045 68.7696 0 58 0H13.2292C10.6173 0 8.5 2.11735 8.5 4.72923C8.5 5.87104 8.08691 6.97429 7.33699 7.8353L2.4512 13.4449C-0.757831 17.1294 1.39539 22.9044 6.23325 23.5885L16.9996 25.111C21.9856 25.8161 22.1112 32.9722 17.153 33.8519C15.0398 34.2268 13.5 36.0638 13.5 38.2101V52.9677C13.5 60.1911 17.0407 66.9557 22.9763 71.0722L32.1362 77.4251C39.2229 82.34 41.5982 91.7291 37.7014 99.4228C31.882 110.912 40.231 124.5 53.1103 124.5H58C68.7696 124.5 77.5 115.77 77.5 105Z"
                  fill="#ECECEC"
                  fillOpacity="0.3"
                />
              </svg>
              <div className="dashboard">
                <h3>Domain</h3>
                <span>0 / 5</span>
              </div>
              <div className="instance">
                <div className="circle"> </div>
                <h1>00</h1>
              </div>
            </div>

            <div className="container">
              {/* <div className="circle"></div> */}
              <img alt="" src="/Broken.png" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="78"
                height="200"
                viewBox="0 0 78 125"
                fill="none"
              >
                <path
                  d="M77.5 105V19.5C77.5 8.73045 68.7696 0 58 0H13.2292C10.6173 0 8.5 2.11735 8.5 4.72923C8.5 5.87104 8.08691 6.97429 7.33699 7.8353L2.4512 13.4449C-0.757831 17.1294 1.39539 22.9044 6.23325 23.5885L16.9996 25.111C21.9856 25.8161 22.1112 32.9722 17.153 33.8519C15.0398 34.2268 13.5 36.0638 13.5 38.2101V52.9677C13.5 60.1911 17.0407 66.9557 22.9763 71.0722L32.1362 77.4251C39.2229 82.34 41.5982 91.7291 37.7014 99.4228C31.882 110.912 40.231 124.5 53.1103 124.5H58C68.7696 124.5 77.5 115.77 77.5 105Z"
                  fill="#ECECEC"
                  fillOpacity="0.3"
                />
              </svg>
              <div className="dashboard">
                <h3>Service</h3>
                <span>0 / 10</span>
              </div>
              <div className="instance">
                <div className="circle"> </div>
                <h1>00</h1>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="activity">
        <h1>Activity</h1>
        <div className="week">
        <span>Day</span>
        <span>Week</span>
        <span>Month</span>
      </div>
      </div> */}
        <div className="whole">
          <div className="logs">
            <h1>logs</h1>
            <div className="view">
              <span>viewall</span>
            </div>
          </div>
          <div className="info">
            <div className="hurry">
              <button className="btn1">info</button>
            </div>
          </div>
          <div className="con">
            <span>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit
            </span>
            <div className="mern">
              <span>1 minute ago</span>
            </div>
          </div>

          <div className="info">
            <div className="hurry">
              <button className="btn2">success</button>
            </div>
          </div>
          <div className="con">
            <span>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit
            </span>
            <div className="mern">
              <span>1 minute ago</span>
            </div>
          </div>

          <div className="info">
            <div className="hurry">
              <button className="btn3">Warning</button>
            </div>
          </div>
          <div className="con">
            <span>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit
            </span>
            <div className="mern">
              <span>1 minute ago</span>
            </div>
          </div>

          <div className="info">
            <div className="hurry">
              <button className="btn4">Error</button>
            </div>
          </div>
          <div className="con">
            <span>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit
            </span>
            <div className="mern">
              <span>1 minute ago</span>
            </div>
          </div>

          <div className="info">
            <div className="hurry">
              <button className="btn5">Error</button>
            </div>
          </div>
          <div className="con">
            <span>
              Lorem ipsum dolor, sit amet consectetur adipisicing elit
            </span>
            <div className="mern">
              <span>1 minute ago</span>
            </div>
          </div>
        </div>

        <div className="display">
          <h1>How to Setup</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis,
            id temporibus et eveniet dolorum dolores maxime quod pariatur quo
            totam, magnam inventore neque nostrum eius distinctio doloremque ea,
            nam optio accusantium quia odio ratione alias perspiciatis
            voluptatibus. Repellendus cum architecto officiis eligendi hic
            voluptas commodi, mollitia repudiandae assumenda soluta unde? Modi
            dicta mollitia exercitationem officiis perferendis dolorem. Aperiam
            exercitationem autem soluta corporis non eveniet, delectus, pariatur
            iusto natus accusantium odit iste omnis. Laudantium magni iure
            nobis, cupiditate temporibus ad nemo. Adipisci minus deserunt
            dignissimos sed eligendi nulla incidunt dolores, consequuntur
            perspiciatis sit accusamus cumque deleniti, reiciendis rem, sapiente
            magni quod!
          </p>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis,
            id temporibus et eveniet dolorum dolores maxime quod pariatur quo
            totam, magnam inventore neque nostrum eius distinctio doloremque ea,
            nam optio accusantium quia odio ratione alias perspiciatis
            voluptatibus. Repellendus cum architecto officiis eligendi hic
            voluptas commodi, mollitia repudiandae assumenda soluta unde? Modi
            dicta mollitia exercitationem officiis perferendis dolorem. Aperiam
            exercitationem autem soluta corporis non eveniet, delectus, pariatur
            iusto natus accusantium odit iste omnis. Laudantium magni iure
            nobis, cupiditate temporibus ad nemo. Adipisci minus deserunt
            dignissimos sed eligendi nulla incidunt dolores, consequuntur
            perspiciatis sit accusamus cumque deleniti, reiciendis rem, sapiente
            magni quod!
          </p>

          <span>
            refer docs for detail setup <b>click here</b>
          </span>
        </div>
      </div>
    );
  }
}

export default dashboard;
