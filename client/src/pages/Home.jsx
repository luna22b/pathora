import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import authStore from "../store/authStore";
import StatCard from "../components/StatCard";
import ReminderCard from "../components/ReminderCard";

const Home = () => {
  const isAuthenticated = authStore((state) => state.isAuthenticated);
  const username = authStore((state) => state.user?.username);

  return (
    <>
      {isAuthenticated ? (
        <div className="flex flex-col items-center text-center font-[Inter]">
          <div className="text-center mt-10 font-bold font-[Inter] text-2xl">
            Welcome Back, {username}! 🌿 <br />
          </div>
          <span className="mt-2 text-md w-[80vw] text-[#737373]">
            Ready to start your plant identification journey?
          </span>

          <StatCard />
          <ReminderCard />
        </div>
      ) : (
        <>
          <Hero />
          <AboutSection />
        </>
      )}
    </>
  );
};

export default Home;
