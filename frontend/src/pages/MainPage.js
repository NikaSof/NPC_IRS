import React, { useState, useEffect } from "react";
import ChartExample from "../components/Chart";

const Main = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);

  const user_token = localStorage.token;

  useEffect(() => {
    const request = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user_token}`,
      }
    };

    fetch(`http://localhost:5000/api/education`, request)
      .then(response => response.json())
      .then(data => {
        setEducation(data.rows); 
      })
      .catch(error => console.error("Failed to fetch education data:", error))
      .finally(() => setLoading(false));
  }, []);

  const prepareChartData = (educationData) => {
    const institutionsMap = {};

    educationData.forEach(edu => {
      const institution = edu.institution;
      if (institutionsMap[institution]) {
        institutionsMap[institution] += 1;
      } else {
        institutionsMap[institution] = 1;
      }
    });

    const chartData = Object.keys(institutionsMap).map(institution => ({
      institution,
      count: institutionsMap[institution],
    }));

    return chartData;
  };

  const chartData = prepareChartData(education);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ChartExample universitiesData={chartData} />
      )}
    </div>
  );
};

export default Main;
