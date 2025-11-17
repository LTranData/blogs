import React from "react";
import Layout from "@theme/Layout";
import { Linkedin, Phone, Mail, Globe, Github } from "lucide-react";

export default function LamTranResume() {
  return (
    <Layout title="Lam Tran Resume" description="Lam Tran Resume">
      <div className="resume-container">
        {/* Header Section */}
        <header className="resume-header">
          <h1 className="resume-title">Lam Tran</h1>
          <div className="contact-info">
            <div className="contact-item">
              <Linkedin size={16} className="contact-icon" />
              <span>
                <strong>LinkedIn:&nbsp;</strong>
              </span>
              <a
                href="https://www.linkedin.com/in/ltrandata"
                className="contact-link"
                target="_blank"
              >
                ltrandata
              </a>
            </div>
            <div className="contact-item">
              <Phone size={16} className="contact-icon" />
              <span>
                <strong>Phone:&nbsp;</strong>
              </span>
              <a
                href="tel:+84962007024"
                className="contact-link"
                target="_blank"
              >
                (+84) 962007024
              </a>
            </div>
            <div className="contact-item">
              <Mail size={16} className="contact-icon" />
              <span>
                <strong>Email:&nbsp;</strong>
              </span>
              <a
                href="mailto:lamtran.data@gmail.com"
                className="contact-link"
                target="_blank"
              >
                lamtran.data@gmail.com
              </a>
            </div>
            <div className="contact-item">
              <Globe size={16} className="contact-icon" />
              <span>
                <strong>Blog:&nbsp;</strong>
              </span>
              <a
                href="https://lam-tran.dev"
                className="contact-link"
                target="_blank"
              >
                lam-tran.dev
              </a>
            </div>
            <div className="contact-item">
              <Github size={16} className="contact-icon" />
              <span>
                <strong>GitHub:&nbsp;</strong>
              </span>
              <a
                href="https://github.com/LTranData"
                className="contact-link"
                target="_blank"
              >
                LTranData
              </a>
            </div>
          </div>
        </header>

        {/* Skills Section */}
        <section className="resume-section">
          <h2 className="resume-section-title">Skills</h2>
          <ul className="list-disc list-inside pl-4">
            <li>
              <strong>Confident:</strong> Python, SQL, Spark, Polars, Snowflake,
              AWS, Databricks, Kafka
            </li>
            <li>
              <strong>Familiar:</strong> Java, Scala, Dbt, Hadoop, Airflow,
              MySQL, Postgres, MongoDB, Docker, Impala, StreamSets, GitLab CI,
              Web Development (ReactJS, Spring Boot), Kubernetes, Helm
            </li>
          </ul>
        </section>

        {/* Experience Section */}
        <section className="resume-section">
          <h2 className="resume-section-title">Experience</h2>

          {/* Lead Data Engineer - Techcombank */}
          <div className="experience-item">
            <div className="experience-header">
              <div className="job-title">
                Lead Data Engineer -{" "}
                <a
                  href="https://techcombank.com/"
                  className="contact-link"
                  target="_blank"
                >
                  Techcombank
                </a>
              </div>
              <div className="job-date">Feb 2025 - Present</div>
            </div>
            {/* <ul className="list-disc list-inside pl-4">
              <li>Lead data team of project</li>
            </ul> */}
          </div>

          {/* Data Architect - FPT Software (Parent Title) */}
          <div className="experience-item">
            <div className="experience-header">
              <div className="job-title">
                Data Architect -{" "}
                <a
                  href="https://fptsoftware.com/"
                  className="contact-link"
                  target="_blank"
                >
                  FPT Software
                </a>
              </div>
              <div className="job-date">Mar 2023 - Feb 2025</div>
            </div>
            {/* Sub-entries for FPT Software */}
            <div className="pl-4">
              <div className="experience-item">
                <div className="job-subtitle">
                  Senior Staff Software Engineer (L5) -{" "}
                  <a
                    href="https://www.episource.com/"
                    className="contact-link"
                    target="_blank"
                  >
                    Episource
                  </a>
                </div>
                <ul className="list-disc list-inside pl-4">
                  <li>
                    Own Salesforce to Snowflake sync pipeline for hundreds of
                    tables, ensuring data latency SLA of ~100%. Reduce 30% cost
                    with S3 mid-layer and increase speed multiple times with
                    parallel asynchronous Salesforce API calls.
                  </li>
                  <li>
                    Develop a data validation script. Introduce multithread
                    processing with Polars and asynchronous HTTP calls for
                    Salesforce data retrieval, which reduces the time taken for
                    data quality checks by 84% compared to the legacy tool.
                  </li>
                  <li>
                    Shared ownership of Standard Data Pipeline for Unified Data
                    Platform on Snowflake cloud that serves as a centralized hub
                    that brings together information from various sources,
                    support business entities such as Claims, Members,
                    Providers, MMR, MOR,… for Medicare, Medicaid membership and
                    risk calculation. Ingest and transform files from external
                    clients into the data platform, and provide data for various
                    value streams within the enterprise. Implement the testing
                    framework to ensure functional testing and data quality
                    end-to-end.
                  </li>
                  <li>
                    Lead Enterprise Pipeline teams and guide the teams toward
                    goals and objectives.
                  </li>
                </ul>
              </div>
              <div className="experience-item">
                <div className="job-subtitle">
                  Data Architect -{" "}
                  <a
                    href="https://www.sysmex.com/en-us/"
                    className="contact-link"
                    target="_blank"
                  >
                    Sysmex
                  </a>
                </div>
                <ul className="list-disc list-inside pl-4">
                  <li>
                    Redesign Analyzer Statistics and Rule Validation micro-batch
                    jobs workflow from using Glue (Spark) to Lambda (Polars) and
                    reduce processing time for each job from 8-10 minutes to
                    seconds, reducing cost at least 10 times.
                  </li>
                  <li>
                    Restructure the source code of Lambda micro-batch jobs and
                    daily Glue jobs so that code is well organized and modular
                    aligned with Sonar rules, resulting in better code quality
                    and easier for writing UTs, achieving ~90% UT coverage in
                    both projects.
                  </li>
                  <li>
                    Lead the development of the data project and data
                    engineering teams.
                  </li>
                </ul>
              </div>
              <div className="experience-item">
                <div className="job-subtitle">Data Core Team contribution</div>
                <ul className="list-disc list-inside pl-4">
                  <li>
                    Main technical content creator of 5 data workshops at BU
                    level.
                  </li>
                  <li>
                    Main interviewer of several technical interviews for
                    headcount preparation OKR.
                  </li>
                  <li>
                    Contribute to team international certifications and build
                    training roadmap for mentees.
                  </li>
                  <li>Architecture design for bidding on customer projects.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Big Data Engineer - Giaohangtietkiem */}
          <div className="experience-item">
            <div className="experience-header">
              <div className="job-title">
                Big Data Engineer -{" "}
                <a
                  href="https://ghtk.vn/"
                  className="contact-link"
                  target="_blank"
                >
                  Giaohangtietkiem
                </a>
              </div>
              <div className="job-date">Dec 2020 - Mar 2023</div>
            </div>
            <ul className="list-disc list-inside pl-4">
              <li>
                Develop an ingestion pipeline to stream data from Kafka topics
                to HDFS using Spark Streaming and Sqoop, sync up around 1000
                tables with 5TB daily data velocity, ensuring data quality for
                near real time reports.
              </li>
              <li>
                Install, customize, and maintain a Spark Thrift Server v3.3.0 to
                work with the Cloudera platform, integrate with other services
                (Kerberos, Ranger, Kudu), and act as a SQL engine on Hadoop for
                complex ETL jobs with complex datatypes. Tune the server and
                make it run 40% faster than the old version (v2.4.3).
              </li>
              <li>
                Design data marts for each business major, speed up the whole
                system hours every day (A pick, deliver, return packages mart
                which is used in 20+ reports). Use Dbt (Data build tool) as a
                data transformation tool in our data warehouse and Airflow as a
                scheduling tool integrating with Dbt.
              </li>
              <li>
                Customize Dbt to work with Impala through a kerberized JDBC
                connection since it is not officially adopted at that time.
                Create data tools for work such as a web application to show all
                Impala queries for easier monitoring, RESTful client using
                SPNEGO protocol for making requests to kerberized Ranger,…
              </li>
            </ul>
          </div>

          {/* Big Data Engineer - Viettel Group */}
          <div className="experience-item">
            <div className="experience-header">
              <div className="job-title">
                Big Data Engineer -{" "}
                <a
                  href="https://viettel.com.vn/en/"
                  className="contact-link"
                  target="_blank"
                >
                  Viettel Group
                </a>
              </div>
              <div className="job-date">Mar 2019 - Dec 2020</div>
            </div>
            <ul className="list-disc list-inside pl-4">
              <li>
                Create several ETL jobs using SparkSQL, Spark, Pentaho, and Nifi
                to provide, ingest and aggregate data for each request from
                other subsidiary companies of Viettel Group, and help other
                businesses operate smoothly.
              </li>
              <li>
                Maintain and add more formulas to compute telecom subscription
                charges for prepaid and postpaid pipelines which process
                billions of VND per day, trace down bugs if there is abnormal
                revenue in the daily report.
              </li>
            </ul>
          </div>
        </section>

        {/* Education Section */}
        <section className="resume-section">
          <h2 className="resume-section-title">Education</h2>
          <div className="experience-item">
            <div className="job-title">
              Hanoi University of Science and Technology
            </div>
            <div>Talent Program of Electronics and Telecommunication</div>
          </div>
        </section>

        {/* Licenses & Certifications Section */}
        <section className="resume-section">
          <h2 className="resume-section-title">Licenses & Certifications</h2>
          <ul className="list-disc list-inside pl-4">
            <li>
              <a
                href="https://www.credly.com/badges/2fe47770-22a6-4a16-8849-3f4c5a170fae/public_url"
                className="contact-link"
                target="_blank"
              >
                AWS Certified Solutions Architect Associate
              </a>{" "}
              - AWS
            </li>
            <li>
              <a
                href="https://achieve.snowflake.com/572af38a-0a3d-4fbf-959a-1e1dcf36a113"
                className="contact-link"
                target="_blank"
              >
                SnowPro® Core Certification
              </a>{" "}
              - Snowflake
            </li>
            <li>
              <a
                href="https://drive.google.com/drive/folders/13atT3XJHUXPt1VtOLpvlfT1QWYzO96to"
                className="contact-link"
                target="_blank"
              >
                Machine Learning, Deep Learning Specialization
              </a>{" "}
              - Coursera
            </li>
            <li>
              <a
                href="https://drive.google.com/file/d/1-sYPRJ3qkZg1RsLHVX3RKDYjLHxDMCkL/view"
                className="contact-link"
                target="_blank"
              >
                CEFR C1 547 points
              </a>{" "}
              - British Council
            </li>
          </ul>
        </section>

        {/* Awards Section */}
        <section className="resume-section">
          <h2 className="resume-section-title">Awards</h2>
          <ul className="list-disc list-inside pl-4">
            <li>
              <a
                href="https://drive.google.com/drive/folders/1YHRa_-dvxgsQIK_ijl2IJ9ZRXm_8dFRy?usp=drive_link"
                className="contact-link"
                target="_blank"
              >
                Best Performance Employee
              </a>{" "}
              - FPT Software
            </li>
            <li>
              <a
                href="https://drive.google.com/drive/folders/1-Qpz7qo9QAt4jQMxDz9KiNF7GGQNDAd-"
                className="contact-link"
                target="_blank"
              >
                Employee Of The Year
              </a>{" "}
              - FPT Software
            </li>
            <li>
              <a
                href="https://drive.google.com/drive/u/0/folders/1dFgQq63pYim6DKk1tR_KlXkriN0C6s-a"
                className="contact-link"
                target="_blank"
              >
                Best Employee Of The Quarter
              </a>{" "}
              - Techcombank
            </li>
          </ul>
        </section>
      </div>
    </Layout>
  );
}
