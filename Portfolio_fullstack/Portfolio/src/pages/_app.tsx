import '@/styles/globals.css'
import '@/styles/intro.css';
import '@/styles/about.css';
import '@/styles/projects.css';
import '@/styles/contact.css';
import '@/styles/footer.css';
import '@/styles/experience.css';
import type { AppProps } from 'next/app'
import dynamic from "next/dynamic";
import { useEffect } from 'react';




function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const savedTheme = localStorage.getItem("themeMode") || "dark";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);
  
  return <Component {...pageProps} />
}
export default dynamic (() => Promise.resolve(App), {ssr: false})

