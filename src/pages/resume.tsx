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
                    Owned and re-engineered the Salesforce to Snowflake
                    ingestion pipeline. Cut processing cost by 30% compare to
                    legacy ones while improving the pipeline’s robustness and
                    reducing processing time by multiple times.
                  </li>
                  <li>
                    Developed a custom data validation framework using
                    asynchronous HTTP calls for Salesforce data retrieval and
                    Polars for data quality checks, resulting in 2 times faster
                    than the existing framework.
                  </li>
                  <li>
                    Drove the delivery of Standard Data Pipeline on
                    enterprise-grade Snowflake data platform, designed data
                    models for business entities such as Claims, Members,
                    Providers, MMR, MOR,… for risk calculation, directly
                    enabling high-stakes Medicaid and Medicare analytics across
                    the organization.
                  </li>
                  <li>
                    Led high-impact engineering teams in the design and
                    deployment of enterprise-grade pipelines toward strategic
                    objectives.
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
                    Re-architected a high-performance migration of micro-batch
                    workflows from AWS Glue (Spark) to Lambda (Polars), slashing
                    job latency from 10 minutes to sub-second and reducing cloud
                    costs by 90%.
                  </li>
                  <li>
                    Systematized a modular, high quality codebase for Lambda and
                    Glue pipelines, aligning with Sonar standards to achieve
                    ~95% unit test coverage and significantly improving
                    maintainability.
                  </li>
                  <li>
                    Steered the technical roadmap and execution for data
                    engineering teams, ensuring high-velocity delivery.
                  </li>
                </ul>
              </div>
              <div className="experience-item">
                <div className="job-subtitle">Data Core Team contribution</div>
                <ul className="list-disc list-inside pl-4">
                  <li>
                    Exposed technical competency by delivering 5 data workshops
                    at Business Unit level.
                  </li>
                  <li>Conducted 30+ technical interviews.</li>
                  <li>
                    Formalized the technical onboarding and training roadmap for
                    associate engineers, accelerating time-to-productivity for
                    new hires.
                  </li>
                  <li>
                    Architected technical solutions for high-stakes client
                    proposals.
                  </li>
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
                Owned high-velocity ingestion pipelines streaming 5TB of daily
                data from Kafka to HDFS via Spark Streaming, ensuring data
                integrity for critical near-real-time reporting across 1,000+
                tables.
              </li>
              <li>
                Engineered a high-performance analytical SQL engine by deploying
                a customized Spark Thrift Server v3.3.0 on Cloudera data
                platform, achieving a 40% performance increase over legacy
                versions while hardening security through Kerberos and Ranger
                integrations.
              </li>
              <li>
                Designed data marts for each business major, speeding up the
                whole system by hours every day (A pick, deliver, return
                packages mart which is used in 20+ reports). Use Dbt (Data build
                tool) as a data transformation tool in our data warehouse and
                Airflow as a scheduling tool integrating with Dbt.
              </li>
              <li>
                Bridged open source gaps, including a customized dbt-impala
                adapter through a Kerberized JDBC connection, since it was not
                officially adopted at that time. Engineered tools such as a web
                application to show all Impala queries for easier monitoring, a
                RESTful client using SPNEGO protocol for making requests to
                Kerberized Ranger,…
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
                Owned and maintained prepaid and postpaid data pipelines that
                process billions of VND per day, trace down bugs if there is
                abnormal revenue in the daily report.
              </li>
              <li>
                Orchestrated several ETL jobs using SparkSQL, Spark, Pentaho,
                and Nifi to streamline cross-subsidiary data integration,
                enabling seamless operational continuity across Viettel Group.
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
