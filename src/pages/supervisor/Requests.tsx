import useUser from "@/hooks/useUser";

const Requests = () => {
  const user = useUser();

  return (
    <>
      <p>{JSON.stringify(user)}</p>
      <p>Requests page</p>
    </>
  );
};

export default Requests;
