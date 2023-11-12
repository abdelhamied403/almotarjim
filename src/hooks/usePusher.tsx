import Pusher from "pusher-js";

const pusher = new Pusher(import.meta.env.VITE_API_PUSHER_APP_KEY, {
  cluster: import.meta.env.VITE_API_PUSHER_APP_CLUSTER,
  forceTLS: true,
});

const usePusher = () => {
  return pusher;
};

export default usePusher;
