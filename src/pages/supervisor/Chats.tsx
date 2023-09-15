import useUser from "@/hooks/useUser";

const Chats = () => {
  const user = useUser();

  return (
    <>
      <p>{JSON.stringify(user)}</p>
      <p>Chats page</p>
    </>
  );
};

export default Chats;
