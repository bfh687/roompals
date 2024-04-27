import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import EditProfileModalPopup from "../components/EditProfileModalPopup";
import { useAuth } from "../contexts/AuthContext";

const ProfilePage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const auth = useAuth();
  const [user, setUser] = useState({});
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      await fetch(`http://localhost:3000/api${location.pathname}`, {
        method: "GET",
      })
        .then((res) => res.json())
        .then((res) => setUser(res))
        .catch((err) => console.log(err));
    };

    loadUser();
  }, [location.pathname]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        marginTop: "25px",
      }}
    >
      <div
        style={{
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          backgroundColor: "#141616",
          width: "1200px",
          maxWidth: "90%",
          overflow: "visible",
        }}
      >
        <div>
          <img
            src={user.img2}
            style={{
              height: "200px",
              maxWidth: "1200px",
              width: "100%",
              objectFit: "cover",
              objectPosition: "center",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ paddingLeft: "25px", display: "flex" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ marginTop: "-87.5px" }}>
                <img
                  src={user.img}
                  style={{
                    height: "175px",
                    width: "175px",
                    borderRadius: "10%",
                    backgroundColor: "#141616",
                    boxShadow: "3px 3px 5px 5px rgba(0, 0, 0, 0.3)",
                  }}
                />
              </div>
              {user.user_id == auth.user?.user_id && (
                <div
                  style={{
                    backgroundColor: "#1b1d1e",
                    height: "25px",
                    borderRadius: "5px",
                    display: "flex",
                    marginTop: "5px",
                    padding: "2px",
                    justifyContent: "center",
                    boxShadow: "3px 3px 5px 2px rgba(0, 0, 0, 0.3)",
                    cursor: "pointer",
                  }}
                  className="text-color"
                  onClick={() => setShowEditProfileModal(true)}
                >
                  Edit Profile
                </div>
              )}
              <div style={{ paddingLeft: "10px", paddingTop: "5px" }} className="text-color">
                <div style={{ fontWeight: "bold" }}>{user.name}</div>
                <div style={{ fontSize: "small" }}>@{user.username}</div>
              </div>
            </div>
            <div style={{ width: "100%" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ display: "flex" }}>
                  <div
                    style={{ marginLeft: "25px", marginTop: "10px" }}
                    className="flex-column text-color"
                  >
                    <div className="flex">
                      <div className="bar-filled xp-bar-filled-color" />
                      <div className="bar-empty xp-bar-empty-color" />
                    </div>
                    <div className="flex">
                      <div className="bar-filled health-bar-filled-color" />
                      <div className="bar-empty health-bar-empty-color" />
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      backgroundColor: "#1b1d1e",
                      width: "50px",
                      height: "50px",
                      marginTop: "14px",
                      marginLeft: "20px",
                      borderRadius: "5px",
                      boxShadow: "3px 3px 5px 2px rgba(0, 0, 0, 0.3)",
                    }}
                  ></div>
                  <div
                    style={{
                      backgroundColor: "#1b1d1e",
                      width: "50px",
                      height: "50px",
                      marginTop: "14px",
                      marginLeft: "20px",
                      borderRadius: "5px",
                      boxShadow: "3px 3px 5px 2px rgba(0, 0, 0, 0.3)",
                    }}
                  ></div>
                  <div
                    style={{
                      backgroundColor: "#1b1d1e",
                      width: "50px",
                      height: "50px",
                      marginTop: "14px",
                      marginRight: "25px",
                      marginLeft: "20px",
                      borderRadius: "5px",
                      boxShadow: "3px 3px 5px 2px rgba(0, 0, 0, 0.3)",
                    }}
                  ></div>
                </div>
              </div>
              <div
                style={{
                  height: "500px",
                  backgroundColor: "#1b1d1e",

                  boxShadow: "3px 3px 5px 2px rgba(0, 0, 0, 0.3)",
                  margin: "25px 25px",
                  borderRadius: "5px",
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {showEditProfileModal && (
        <EditProfileModalPopup
          user={user}
          onSave={(updatedUser) => {
            setUser(updatedUser);
            navigate(`/user/${updatedUser.username}`);
            auth.refresh();
          }}
          onClickOutside={() => setShowEditProfileModal(false)}
        />
      )}
    </div>
  );
};

export default ProfilePage;
