import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import '@/styles/globals.css'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }) {

  const [user, setUser] = useState({ value: null });
  const [key, setKey] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const myuser = JSON.parse(localStorage.getItem('myuser'));
    if (myuser) {
      setUser({ value: myuser.token, email: myuser.email });
    }
    setKey(Math.random());
  }, [router.query])

  const logout = () => {
    localStorage.removeItem('myuser');
    setUser({ value: null });
    setKey(Math.random());
    router.push('/signin');
  }



  return <>
    {key && <Navbar key={key} user={user} logout={logout} />}
    <Component {...pageProps} />
    <Footer />
  </>
}
