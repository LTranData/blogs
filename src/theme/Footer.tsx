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
            I am a highly motivated and passionate data engineer. I often work
            with Python, Scala, and Java and use the latest big data
            technologies to solve problems, making tools to improve my and
            others' work productivity.
              <a target="_blank" rel="noreferrer noopener" href="https://www.buymeacoffee.com/lamtran" style={{
                display: "block",
                marginTop: 10
              }}>
                <img style={{
                  height: 50,
                  width: 50,
                }} src="/img/donate.jpg" />
              </a>
          </div>
          <div style={{ marginLeft: 30, minWidth: 162 }}>
            <img
              src="/img/avatar.jpg"
              style={{
                height: 130,
                width: 136,
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
