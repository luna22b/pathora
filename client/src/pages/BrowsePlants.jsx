import { useState, useEffect } from "react";

const BrowsePlants = () => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/plants");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRecords(data.data || []);
      } catch (err) {
        console.log("Failed to fetch plants: ", err);
        setError(err.message);
      }
    };

    fetchPlants();
  }, []);

  if (error) return <p>Error loading plants: {error}</p>;

  return (
    <div>
      {records.length === 0 ? (
        <div>Loading plants...</div>
      ) : (
        records.map((plant) => (
          <div key={plant.id}>
            <div>{plant.common_name}</div>
          </div>
        ))
      )}
    </div>
  );
};

export default BrowsePlants;
