"use client";

import { useState } from "react";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Icon Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            width: "55px",
            height: "55px",
            borderRadius: "50%",
            backgroundColor: "#111",
            color: "white",
            fontSize: "26px",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            boxShadow:
              "rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(150, 150, 150, 0.2) 0px 0px 0px 1px",
          }}
        >
          💬
        </button>
      )}

      {/* Chat Iframe */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: 9999,
          }}
        >
          {/* Close button */}
          <button
            onClick={() => setOpen(false)}
            style={{
              position: "absolute",
              top: "-12px",
              right: "-12px",
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              background: "#000",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "16px",
              boxShadow:
                "rgba(0, 0, 0, 0.2) 0px 5px 10px, rgba(150, 150, 150, 0.2) 0px 0px 0px 1px",
            }}
          >
            ✕
          </button>

          <iframe
            src="https://automatic.chat/chats/cmj9mpin4000r5t02wkrgm7cz"
            width="350px"
            height="500px"
            style={{
              borderRadius: "20px",
              border: "none",
              background: "white",
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(150, 150, 150, 0.2) 0px 0px 0px 1px",
            }}
          ></iframe>
        </div>
      )}
    </>
  );
}
