import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const auth = useAuth();

  const navigate = useNavigate();

  return (
    <div className="text-color" style={{ height: "100%" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: "100%",
        }}
      >
        <div style={{ width: "50%", maxWidth: "1000px", height: "100%", backgroundColor: "white" }}>
          <div style={{ padding: "10px" }}>
            <button
              onClick={() => {
                fetch("http://localhost:3000/api/party", {
                  method: "GET",
                })
                  .then((res) => res.json())
                  .then((res) => {
                    console.log(res);
                  })
                  .catch((err) => console.log(err));
              }}
            >
              Create Party
            </button>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              padding: "5px 5px",
            }}
          >
            <div
              style={{
                width: "200px",
                height: "80px",
                backgroundColor: "red",
                borderRadius: "5px",
                margin: "5px",
                cursor: "pointer",
              }}
              onClick={() => navigate("/dashboard")}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <div>pal party 1</div>
                <div style={{ display: "flex" }}>
                  <div style={{ padding: "1px" }}>
                    <img
                      style={{ width: "15px", height: "15px", borderRadius: "50%" }}
                      src={auth.user?.img}
                    />
                  </div>
                  <div style={{ padding: "1px" }}>
                    <img
                      style={{ width: "15px", height: "15px", borderRadius: "50%" }}
                      src={auth.user?.img}
                    />
                  </div>
                  <div style={{ padding: "1px" }}>
                    <img
                      style={{ width: "15px", height: "15px", borderRadius: "50%" }}
                      src={auth.user?.img}
                    />
                  </div>
                  <div style={{ padding: "1px" }}>
                    <img
                      style={{ width: "15px", height: "15px", borderRadius: "50%" }}
                      src={auth.user?.img}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              style={{
                width: "200px",
                height: "80px",
                backgroundColor: "red",
                borderRadius: "5px",
                margin: "5px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <div>pal party 1</div>
                <div style={{ display: "flex" }}>
                  <div style={{ padding: "1px" }}>
                    <img
                      style={{ width: "15px", height: "15px", borderRadius: "50%" }}
                      src={auth.user?.img}
                    />
                  </div>
                  <div style={{ padding: "1px" }}>
                    <img
                      style={{ width: "15px", height: "15px", borderRadius: "50%" }}
                      src={auth.user?.img}
                    />
                  </div>
                  <div style={{ padding: "1px" }}>
                    <img
                      style={{ width: "15px", height: "15px", borderRadius: "50%" }}
                      src={auth.user?.img}
                    />
                  </div>
                  <div style={{ padding: "1px" }}>
                    <img
                      style={{ width: "15px", height: "15px", borderRadius: "50%" }}
                      src={auth.user?.img}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
