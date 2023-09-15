import useUser from "@/hooks/useUser";

const Dashboard = () => {
  const user = useUser();

  return (
    <>
      <p>{JSON.stringify(user)}</p>
      <p>Dashboard page</p>
    </>
  );
};

export default Dashboard;
