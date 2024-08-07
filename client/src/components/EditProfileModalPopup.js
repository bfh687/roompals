import React, { useEffect, useRef, useState } from "react";
import useOnClickOutside from "../hooks/useOnClickOutside";
import { ActiveScreen } from "./generic/ActiveScreen";
import TextField from "./tasklist/modal/TextField";

const EditProfileModalPopup = ({ user, onSave, onClickOutside }) => {
  const modalRef = useRef();
  useOnClickOutside(modalRef, () => {
    onClickOutside();
    updateUser();
  });

  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key !== "Escape") return;
      onClickOutside();
      updateUser();
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [img, setImg] = useState(user.img);
  const [img2, setImg2] = useState(user.img2);

  const updateUser = async () => {
    Object.assign(user, { name, username, img, img2 });

    await fetch(`http://localhost:3000/api/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          onSave(user);
          onClickOutside();
        } else {
          console.log(res.message);
        }
      })
      .catch((err) => console.log(err));
  };

  const save = () => {
    updateUser();
  };

  return (
    <div>
      <div className="task-modal" ref={modalRef}>
        <div
          className="center"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "25px",
            paddingRight: "25px",
            paddingLeft: "25px",
            paddingBottom: "12px",
          }}
        >
          <div
            style={{
              fontWeight: "bold",
            }}
            className="text-color"
          >
            Edit Profile
          </div>
          <div className="center">
            <div className="task-modal-cancel text-color" onClick={() => onClickOutside()}>
              Cancel
            </div>
            <button
              className="task-modal-save"
              onClick={() => {
                save();
              }}
            >
              Save
            </button>
          </div>
        </div>
        <div>
          <div style={{ paddingBottom: "24px" }}>
            <TextField caption="Name" text={name} onTextChange={setName} />
            <TextField caption="Username" text={username} onTextChange={setUsername} />
            <div style={{ display: "flex" }}>
              <div style={{ width: "100%" }}>
                <TextField caption="Profile Picture" text={img} onTextChange={setImg} />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  marginTop: "auto",
                  background: "transparent",
                }}
              >
                <img
                  style={{
                    background: "transparent",
                    minWidth: "32px",
                    height: "32px",
                    marginRight: "25px",
                    borderRadius: "3px",
                    backgroundColor: "white",
                  }}
                  src={img}
                />
              </div>
            </div>
            <TextField caption="Profile Header" text={img2} onTextChange={setImg2} />
          </div>
        </div>
      </div>
      <ActiveScreen />
    </div>
  );
};

export default EditProfileModalPopup;
