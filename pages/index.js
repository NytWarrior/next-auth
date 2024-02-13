import Head from 'next/head';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [npassword, setNpassword] = useState('');
  const [cpassword, setCpassword] = useState('');
  const [user, setUser] = useState({ value: null })
  const [image, setImage] = useState({ myFile: null });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('myuser'));
    if (user) {
      setUser(user)
      setEmail(user.email)
      fetchData(user.token)
    } else {
      router.push('/signin');
    }
  }, []);

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };


  const fetchData = async (token) => {
    let data = { token: token };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    let res = await a.json();
    setName(res.name);
    setImage({ myFile: res.profile })
  }
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setImage({ myFile: base64 });
  };

  const handleImageSubmit = async () => {
    let data = { token: user.token, image: image.myFile };

    try {
      let response = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/upload`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      let res = await response.json();
      // Handle response as needed
    } catch (error) {
      console.error('Error updating image:', error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name == 'name') {
      setName(e.target.value);
    }
    else if (e.target.name == 'password') {
      setPassword(e.target.value);
    }
    else if (e.target.name == 'npassword') {
      setNpassword(e.target.value);
    }
    else if (e.target.name == 'cpassword') {
      setCpassword(e.target.value);
    }
  }

  const handleUserSubmit = async () => {
    let data = { token: user.token, name, address, pincode, phone };
    let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updateuser`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })

    let res = await a.json();
  }

  const handlePasswordSubmit = async () => {
    let res;
    if (npassword == cpassword) {
      let data = { token: user.token, password, npassword, cpassword };
      let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/updatepassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      res = await a.json();
    } else {
      res = { success: false }
    }
    setPassword('');
    setNpassword('');
    setCpassword('');
  }
  return (
    <div>
      <Head>
        <title>NextAuth - Live the dream!!</title>
        <meta name='description' content='NextAuth - Live the dream!!' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-5 py-15 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">

            <img alt="profile" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src={image.myFile || 'https://dummyimage.com/400x400'} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="font-bold text-xl">1. Update Your Profile</h2>
              <div className="mx-auto flex my-2">
                <div className="px-2 w-1/2">
                  <div className="mb-4">
                    <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                    <input onChange={handleChange} value={name} type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                </div>
                <div className="px-2 w-1/2">
                  <div className="mb-4">
                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email (cannot be updated)</label>
                    {user && user.value ? <input value={user.email} type="text" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly />
                      : <input onChange={handleChange} value={email} type="text" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    }
                  </div>
                </div>
              </div>
              <button onClick={handleUserSubmit} className='m-2 text-white bg-indigo-500 border-0 mb-5 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm'>Submit</button>

              <h2 className="font-bold text-xl">2. Update your Password</h2>
              <div className="mx-auto flex my-2">
                <div className="px-2 w-1/2">
                  <div className="mb-4">
                    <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                    <input onChange={handleChange} value={password} type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                </div>
                <div className="px-2 w-1/2">
                  <div className="mb-4">
                    <label htmlFor="npassword" className="leading-7 text-sm text-gray-600">New Password</label>
                    <input onChange={handleChange} value={npassword} type="password" id="npassword" name="npassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                </div>
                <div className="px-2 w-1/2">
                  <div className="mb-4">
                    <label htmlFor="cpassword" className="leading-7 text-sm text-gray-600">Confirm New Password</label>
                    <input onChange={handleChange} value={cpassword} type="password" id="cpassword" name="cpassword" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                  </div>
                </div>
              </div>
              <button onClick={handlePasswordSubmit} className='m-2 text-white bg-indigo-500 border-0 mb-5 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm'>Submit</button>
              <h2 className="font-bold text-xl">3. Update Your Profile Image</h2>
              <div className="mx-auto flex my-2">
                <div className="px-2 w-1/2">
                  <div className="mb-4">
                    <label htmlFor="image" className="leading-7 text-sm text-gray-600">
                      Profile Image
                    </label>
                    <input type="file" id="image" name="image" accept=".jpeg, .png, .jpg" onChange={(e) => handleFileUpload(e)} />
                  </div>
                </div>
              </div>

              <button onClick={handleImageSubmit} className="m-2 text-white bg-indigo-500 border-0 mb-5 py-2 px-2 focus:outline-none hover:bg-indigo-600 rounded text-sm">Submit Image</button>

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
