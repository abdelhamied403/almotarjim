import { useCallback, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";

import LanguageProvider from "./providers/LanguageProvider";
import MainRouter from "./router/MainRouter";
import AuthService from "./services/auth.service";
import useProfileStore from "./store/profile.slice";

const queryClient = new QueryClient();

const App = () => {
  const { setUser } = useProfileStore();
  const [loading, setLoading] = useState(false);

  const getUser = useCallback(async () => {
    setLoading(true);
    const res = await AuthService.getUser().catch(console.log);
    setLoading(false);
    setUser(res.data);
  }, [setUser]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <>
      <LanguageProvider defaultLocale="en">
        <QueryClientProvider client={queryClient}>
          {loading ? <p>loading...</p> : <MainRouter></MainRouter>}
        </QueryClientProvider>
      </LanguageProvider>
    </>
  );
};

export default App;
