import OriginalFooter from "@theme-original/Footer";
import React from "react";

function Footer(props) {
  return (
    <div className="footer-wrapper footer--dark">
      <div className="container margin-vert--lg">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div style={{ maxWidth: 650 }}>
            I am a highly motivated and passionate data engineer. You'll mostly
            find me doing some engineering stuff in the big data ecosystem. I
            often work with Python, Scala, and Java and use the latest big data
            technologies to solve problems, making tools to improve mine and
            others work productivity.
          </div>
          <div style={{ marginLeft: 30, minWidth: 169 }}>
            <img
              src="/blogs/img/avatar.jpg"
              style={{
                height: 154,
                width: 139,
              }}
            />
            <p style={{ fontSize: "0.8em", marginTop: "1em" }}>
              Lam Tran
              <br />
              Data Engineer
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <OriginalFooter {...props} />
      </div>
    </div>
  );
}

export default Footer;
