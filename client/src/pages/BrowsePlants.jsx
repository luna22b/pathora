import { useState, useEffect } from "react";
import PlantCard from "../components/PlantCard";
import BrowseSearch from "../components/BrowseSearch";

const BrowsePlants = () => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/plants");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRecords(data.data || []);
        setTotalCount(data.meta?.total || 0);
      } catch (err) {
        console.log("Failed to fetch plants: ", err);
        setError(err.message);
      }
    };

    fetchPlants();
  }, []);

  if (error) return <p>Error loading plants: {error}</p>;

  return (
    <>
      <BrowseSearch records={records} totalCount={totalCount} />
      <PlantCard records={records} />
    </>
  );
};

export default BrowsePlants;
