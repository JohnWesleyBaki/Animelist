import React, { useState } from "react";
import { account } from "../lib/appwrite";
import { useNavigate } from "react-router-dom";
import { useAnimeContext } from "../contexts/AnimeContext";

const UserInfoButton = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { setUserId } = useAnimeContext();

  const fetchUserInfo = () => {
    account
      .get()
      .then((response) => {
        setUserInfo(response);
        setModalOpen(true);
      })
      .catch((error) => {
        console.error("Error fetching user info:", error);
      });
  };

  const handleLogout = () => {
    account
      .deleteSession("current")
      .then(() => {
        setModalOpen(false);
        navigate("/login");
        setUserId(null);
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
      }}
    >
      <button
        onClick={fetchUserInfo}
        style={{
          borderRadius: "10%",
          width: "100px",
          height: "40px",
          background: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
          transition: "background-color 0.3s",
        }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseLeave={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Profile
      </button>

      {modalOpen && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: "0",
            background: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            zIndex: "9999",
            minWidth: "250px",
            color: "#333",
          }}
        >
          <button
            onClick={() => setModalOpen(false)}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "none",
              border: "none",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            ✖
          </button>

          {userInfo ? (
            <div>
              <p style={{ marginBottom: "10px", fontWeight: "bold" }}>
                Username: {userInfo.name}
              </p>

              <p style={{ marginBottom: "20px" }}>Email: {userInfo.email}</p>
              <button
                onClick={handleLogout}
                style={{
                  borderRadius: "5px",
                  width: "100%",
                  height: "40px",
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                  transition: "background-color 0.3s",
                }}
                onMouseEnter={(e) =>
                  (e.target.style.backgroundColor = "#c82333")
                }
                onMouseLeave={(e) =>
                  (e.target.style.backgroundColor = "#dc3545")
                }
              >
                Logout
              </button>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UserInfoButton;
