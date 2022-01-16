import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react"
import Nav from "../components/nav";
import Footer from "../components/footer";
import { initializeApp, getApps, getApp } from "firebase/app";
import { Web3ReactProvider } from "@web3-react/core";
import { getProvider } from "../utils/web3";
import { SEO } from '../components/seo'
import "@fontsource/syne"

declare global {
  interface Window {
    ethereum: any;
  }
}
// const analytics = getAnalytics(app);


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
};

const firebaseApp = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
// getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const styles = {
  global: (props: any) => ({
    body: {
      color: 'gray.900',
      bg: 'brand.darkslategray',
    },
  }),
};


const dronieTheme = {
  colors: {
    brand: {
      100: "#FFC8DD",
      900: "#FF006E", // winter sky
      800: "#FFBE0B", // mango
      700: "#8338EC", // blue violet
      purple: "#3A0CA3",
      aquamarine: "#80FFDB",
      darkslategray: "#222429",
      gradienta: "linear-gradient(90deg, #FDBB2D 0%, #3A1C71 100%);",
      flickrPink: "#f72585ff",
      fonta: "Syne"
    },
  },
  components: {
    Input: {
      baseStyle: {
        color: 'gray.200',
      },
    },
    TextArea: {
      baseStyle: {
        color: 'gray.200',
      },
      color: 'gray.200',
    },
    Button: {
      baseStyle: {
        color: 'gray.800',
        background: 'purple.400',
        backgroundColor: 'purple.400',
        _hover: {
          background: 'purple.600',
          backgroundColor: 'purple.600',
        },
        _active: {
          background: 'purple.600',
          backgroundColor: 'purple.600',
        }
      },
      variants: {
        primary: {
          color: "gray.800"
        },
        bright: {
          backgroundColor: "linear-gradient(to right, #eaafc8, #654ea3)",
        }
      },
    },
    MenuItem: {
      color: 'gray.800',
      _hover: {
        background: 'purple.600',
        backgroundColor: 'purple.600',
      },
      _active: {
        background: 'purple.600',
        backgroundColor: 'purple.600',
      },
      _focus: {
        background: 'purple.600',
        backgroundColor: 'purple.600',
      },
      baseStyle: {
        color: 'purple.800',
        _hover: {
          background: 'purple.600',
          backgroundColor: 'purple.600',
        },
        _active: {
          background: 'purple.600',
          backgroundColor: 'purple.600',
        },
        _focus: {
          background: 'purple.600',
          backgroundColor: 'purple.600',
        }
      }
    },
    Text: {
      baseStyle: {
        color: 'gray.800',
      },
      variants: {
        primary: {
          color: "gray.800"
        },
      },
    }
  },
  styles,
  fonts: {
    heading: "Syne",
    body: "Syne",
  },
}

const theme = extendTheme(dronieTheme)

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Web3ReactProvider getLibrary={getProvider}>
      <ChakraProvider theme={theme}>
        <SEO />
        <Nav />
        <Component {...pageProps} />
        <Footer />
      </ChakraProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
