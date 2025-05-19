

import React, { useEffect, useState } from "react";
import axios from "axios";

function JobList({ userId }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId) return; 

    axios
      .get(`http://localhost:9090/jobs/available/user/${userId}`)
      .then((response) => {
      
        setJobs(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load jobs");
        setLoading(false);
      });
  }, [userId]);

  const handleApply = (jobId) => {
    console.log(`Applying for job ID: ${jobId}`);
   
  };

  if (loading) return <p>Loading jobs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Available Jobs to Apply</h2>
      {jobs.length === 0 ? (
        <p>No jobs Available</p>
      ) : (
        <ul>
          {jobs.map((job) => (
            <li key={job.job_id} style={{ marginBottom: "10px" }}>
              <strong>{job.title || "No title"}</strong> - {job.location || "No location"} - {job.salary || "Salary not specified"}{" "}
              <button onClick={() => handleApply(job.job_id)}>Apply</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default JobList;
