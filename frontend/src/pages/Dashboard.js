
import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./StylePage.css"; 

const Dashboard = ({ userId }) => {
  const [jobs, setJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const fileInputRef = useRef(null);
  const [selectedJobId, setSelectedJobId] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9090/jobs/available/user/${userId}`
        );
        setJobs(response.data);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    const fetchAppliedJobs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9090/applications/user/${userId}`
        );
        const appliedJobIds = response.data.map((app) => app.job.jobId);
        setAppliedJobs(appliedJobIds);
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
      }
    };

    fetchJobs();
    fetchAppliedJobs();
  }, [userId]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file || !selectedJobId) return;

    const formData = new FormData();
    formData.append("resume", file); // ✅ FIXED: "file" changed to "resume"
    formData.append("userId", userId);
    formData.append("jobId", selectedJobId);

    try {
      await axios.post("http://localhost:9090/applications/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setAppliedJobs([...appliedJobs, selectedJobId]);
      alert("Application submitted successfully!");
    } catch (error) {
      console.error("Application failed:", error);
      alert("Error applying for job.");
    }
  };

  const handleApplyClick = (jobId) => {
    setSelectedJobId(jobId);
    fileInputRef.current.click(); // Trigger file selection dialog
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Jobs</h2>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".pdf"
        style={{ display: "none" }}
      />

      {jobs.length === 0 ? (
        <p>No jobs available</p>
      ) : (
        jobs.map((job) => (
          <div
            key={job.jobId}
            style={{
              border: "1px solid #ccc",
              padding: "15px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <h3>{job.title}</h3>
            <p>{job.description}</p>
            <p>
              <b>Location:</b> {job.location}
            </p>
            <p>
              <b>Salary:</b> {job.salary}
            </p>
            <button
              onClick={() => handleApplyClick(job.jobId)}
              disabled={appliedJobs.includes(job.jobId)}
            >
              {appliedJobs.includes(job.jobId) ? "Applied" : "Apply"}
            </button>
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
