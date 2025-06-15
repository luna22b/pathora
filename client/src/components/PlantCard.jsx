const PlantCard = ({ records }) => {
  return (
    <div className="flex flex-col gap-3">
      {records.length === 0 ? (
        <div>Loading...</div>
      ) : (
        records.map((plant) => (
          <div
            key={plant.id}
            className="shadow-xl mb-2 h-96 w-85 mx-auto mt-2 rounded-2xl"
          >
            <div>
              <img
                src={plant.default_image?.original_url}
                alt={plant.common_name || "Plant image"}
                className="h-48 rounded-t-2xl w-85 object-cover"
              />
            </div>
            <div className="mt-5 ml-5">
              <p className="font-semibold text-md">
                {plant.common_name || "Unknown Name"}
              </p>
              <p className="text-sm italic text-[#737373]">
                {plant.scientific_name || "Unknown Name"}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PlantCard;
