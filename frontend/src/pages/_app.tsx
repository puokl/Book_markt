import Layout from "@/components/Layout/Layout";
import { AuthContextProvider } from "@/context/AuthContext";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "@/chakra/theme";
import Provider from "@/Provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider>
        <ChakraProvider>
          <AuthContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AuthContextProvider>
        </ChakraProvider>
      </Provider>
    </>
  );
}
