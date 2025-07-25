import Hero from '../components/Hero';
import AboutSection from '../components/AboutSection';
import authStore from '../store/authStore';
import StatCard from '../components/StatCard';
import ReminderCard from '../components/ReminderCard';

const Home = () => {
  const isAuthenticated = authStore((state) => state.isAuthenticated);
  const username = authStore((state) => state.user?.username);

  return (
    <>
      {isAuthenticated ? (
        <div className="flex flex-col items-center text-center font-[Inter]">
          <div className="mt-10 text-center font-[Inter] text-2xl font-bold">
            Welcome Back, {username}! 🌿 <br />
          </div>
          <span className="text-md mt-2 w-[80vw] text-[#737373]">
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
