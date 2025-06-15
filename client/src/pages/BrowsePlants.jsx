import { useState, useEffect } from "react";
import PlantCard from "../components/PlantCard";

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

  return <PlantCard records={records} />;
};

export default BrowsePlants;
