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
            others' work productivity. I am currently certified with
            <div style={{ marginTop: 10 }}>
              <a
                aria-label="snowpro-core-certification" 
                target="_blank" 
                rel="noreferrer noopener" 
                href="https://achieve.snowflake.com/572af38a-0a3d-4fbf-959a-1e1dcf36a113">
                <img
                  alt="Snowpro Core Certification"
                  loading="lazy"
                  style={{
                    height: 50,
                    width: 50,
                  }} src="/img/COF-C02.png" />
              </a>
              <a
                aria-label="aws-certified-solutions-architect-associate"
                target="_blank" 
                rel="noreferrer noopener" 
                href="https://www.credly.com/badges/2fe47770-22a6-4a16-8849-3f4c5a170fae/public_url">
                <img
                  alt="AWS Certified Solutions Architect - Associate"
                  loading="lazy"
                  style={{
                    height: 50,
                    width: 50,
                    marginLeft: 5
                  }} src="/img/SAA-C03.png" />
              </a>
            </div>
          </div>
          <div style={{ marginLeft: 30, minWidth: 162 }}>
            <img
              alt="avatar"
              loading="lazy"
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
