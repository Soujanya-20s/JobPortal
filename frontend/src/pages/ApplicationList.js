import React, { useEffect, useState } from "react";
import axios from "axios";

function AppliedJobs({ userId }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    async function fetchApplications() {
      try {
        const res = await axios.get(`http://localhost:9090/applications/user/${userId}`);
        setApplications(res.data);
      } catch (err) {
        console.error("Error fetching applied jobs", err);
      } finally {
        setLoading(false);
      }
    }

    fetchApplications();
  }, [userId]);

  if (loading) {
    return <p>Loading applied jobs...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Applied Jobs</h2>
      {applications.length === 0 ? (
        <p>You have not applied to any jobs yet.</p>
      ) : (
        applications.map((application) => {
          const job = application.job;
          return (
            <div
              key={application.applicationId}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                margin: "15px 0",
                borderRadius: "5px",
              }}
            >
              <h3>{job.title || "No Title"}</h3>
              <p>{job.description || "No description available"}</p>
              <p><strong>Location:</strong> {job.location || "Not specified"}</p>
              <p><strong>Salary:</strong> {job.salary || "Not specified"}</p>
            </div>
          );
        })
      )}
    </div>
  );
}

export default AppliedJobs;
