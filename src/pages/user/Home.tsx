import useUser from "@/hooks/useUser";

const Home = () => {
  const user = useUser();

  return (
    <>
      <p>{JSON.stringify(user)}</p>
      <p>Home page</p>
    </>
  );
};

export default Home;
