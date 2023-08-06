"use client";

import Alerts from "@/components/alerts";
import Button from "@/components/button";
import SubHead from "@/components/subhead";
import React, { useState } from "react";
import Dropdown from "@/components/dropdown";
import "@/app/dashboard/domains/domain.scss";
import { API } from "@/api/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Badge from "@/components/badge";

const options = [
  { label: ".youngstorage.in", value: "youngstorage.in" },
  { label: ".youngstorage.tech", value: "youngstorage.tech" },
];

function Domains() {
  const [selectedOption, setSelectedOption] = useState(options[0].value);
  const [domainname, setDomainname] = useState("");
  const queryClient = useQueryClient();
  const networks = useQuery({
    queryKey: ["networks"],
    queryFn: () => API.networks(),
    refetchOnWindowFocus: false,
    retry: 1,
    cacheTime: 50000,
  });

  const adddomain = useMutation({
    mutationFn: (body) => API.addomain(body),
    onSuccess: (res) => {
      // Invalidate and refetch
      queryClient.invalidateQueries("networks");
    },
    onError: (error) => {
      console.log("value error:", error);
    },
  });

  const AddDomain = () => {
    if (selectedOption && domainname) {
      adddomain.mutate({
        domainName: `${domainname}.${selectedOption}`,
      });
    } else {
      alert("type your domain name");
    }
  };

  if (networks.isLoading) return "loading .....";
  else if (networks.isError) {
    return <>{networks.error}</>;
  } else {
    let domains = networks.data.data;
    return (
      <div className="domain-container">
        {/* components for headers */}
        <SubHead>
          <b>{" / "} Domains</b>
        </SubHead>
        <Alerts />

        {domains ? (
          <>
            <div className="domain">
              <img alt="" src="/Website.png" />
              <span>Reserve your domain</span>
            </div>
            <div className="get-domains">
              <input
                type="text"
                placeholder="Type your Domain name"
                value={domainname}
                onChange={(e) => setDomainname(e.target.value)}
              />
              <Dropdown
                className="drop"
                options={options}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
              />
              <Button value="Get Domain" onClick={AddDomain}></Button>
            </div>

            <div className="domain-add-list">
              <div className="adjust">
                <div className="any">
                  <div className="flex">
                    <h3>
                      Add your <b>Domains</b>
                    </h3>
                    <Button
                      value={`${domains.currentDomain} / ${domains.maxDomain}`}
                    ></Button>
                  </div>
                  <div className="adjustment">
                    <img alt="" src="/grid2.png" width="30px" height="50px" />
                    <img
                      alt=""
                      src="/alignleft.png"
                      width="30px"
                      height="50px"
                    />
                  </div>
                </div>
              </div>
              <hr />

              {/* card to display in prompt */}
              <div className="domains-list">
                {domains?.domainList?.map((a) => (
                  <div className="dot" key={a.domainName}>
                    <div className="gap">
                      <span>{a.domainName}</span>
                      <Badge value="not mapped" color="btn-error" />
                    </div>
                    <div className="min">
                      <span>1 min ago</span>
                    </div>
                    <div className="lottie">
                        <lord-icon
                          src="https://cdn.lordicon.com/jmkrnisz.json"
                          trigger="hover"
                          colors="primary:#121331"
                          style={{width:30 , height:30}}
                        ></lord-icon>
                      </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        ) : (
          <>
            <h1>first build the lab</h1>
            <Link href="/dashboard/labs">labs</Link>
          </>
        )}
      </div>
    );
  }
}

export default Domains;
