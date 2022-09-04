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
          <div style={{ flexGrow: 1, maxWidth: 650 }}>
            I believe each of us was designed to do certain things, that we have certain duties. Most significantly, since nature intended us to be social creatures, we have duties to our fellow men.
          </div>
          <div style={{marginLeft: "2em"}}>
            <img
              src="/blogs/img/avatar.jpg"
              style={{
                borderRadius: "50%",
                height: 100,
                width: 100,
              }}
            />
            <p style={{fontSize: "0.8em", marginTop: "1em"}}>Data Engineer <br/>@ Giaohangtietkiem</p>
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
