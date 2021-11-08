import dynamic from "next/dynamic";
import "../styles/globals.css";
import type { AppProps } from "next/app";

const ZokratesProvider = dynamic(() => import("../contexts/ZokratesContext"), {
  ssr: false,
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ZokratesProvider>
      <Component {...pageProps} />
    </ZokratesProvider>
  );
}

export default MyApp;
