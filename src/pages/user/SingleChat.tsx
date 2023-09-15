import useUser from "@/hooks/useUser";

const SingleChat = () => {
  const user = useUser();

  return (
    <>
      <p>{JSON.stringify(user)}</p>
      <p>SingleChat page</p>
    </>
  );
};

export default SingleChat;
