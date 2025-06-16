import BrowseSearch from "./BrowseSearch";
import LoadingSpinner from "./LoadingSpinner";

const PlantCard = ({ records }) => {
  return (
    <>
      {records.length === 0 ? (
        <div className="flex justify-center items-center min-h-[50vh] -mt-35">
          <LoadingSpinner />
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {records.map((plant) => (
              <div
                key={plant.id}
                className="shadow-xl hover:shadow-[0_6px_16px_rgba(0,0,0,0.25)] transition-shadow duration-300 mb-2 h-96 w-[90vw] md:w-[45vw] lg:w-[30vw] max-w-sm mx-auto mt-2 rounded-2xl flex flex-col cursor-pointer"
              >
                <div>
                  <img
                    src={plant.image_url}
                    alt={plant.common_name || "Image of plant"}
                    className="h-48 rounded-t-2xl w-full object-cover shadow"
                  />
                </div>
                <div className="mt-5 ml-5 flex-1 flex flex-col justify-between pr-5 pb-3">
                  <p className="font-semibold text-md">
                    {plant.common_name || "Unknown Name"}
                  </p>
                  <p className="text-sm italic text-[#737373]">
                    {plant.scientific_name || "Unknown Name"}
                  </p>
                  <p className="text-sm text-[#737373]">
                    {plant.genus || "Unknown Name"} ·{" "}
                    {plant.family || "Unknown Name"}
                  </p>
                  {plant.family_common_name && (
                    <div className="text-xs font-bold border border-[#ccc] rounded-2xl flex justify-center w-25 p-0.5 mt-8">
                      {plant.family_common_name}
                    </div>
                  )}
                  <div className="text-xs mb-2 mt-auto text-[#737373] border-t border-t-[#eee] pt-1">
                    <span>Synonyms: </span>
                    <span>{plant.synonyms?.[0] || "None available"}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PlantCard;
