import LanguageProvider from "./providers/LanguageProvider";
import MainRouter from "./router/MainRouter";

const App = () => {
  return (
    <>
      <LanguageProvider defaultLocale="en">
        <MainRouter></MainRouter>
      </LanguageProvider>
    </>
  );
};

export default App;
