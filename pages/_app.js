import Header from '../components/Header'
import Footer from '../components/Footer'
import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import { ToastContainer } from 'react-toastify';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <div>
        <SessionProvider session={session}>
          <ToastContainer position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable={false}
pauseOnHover
theme="light"/>
          <Header/>
          {/* main content of web page which is in index.js*/}
          <Component {...pageProps} />
          <Footer/>
        </SessionProvider>
    </div>
  )
}

export default MyApp
