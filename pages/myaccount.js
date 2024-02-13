import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const Myaccount = () => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [pincode, setPincode] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [password, setPassword] = useState('');
    const [npassword, setNpassword] = useState('');
    const [cpassword, setCpassword] = useState('');
    const [user, setUser] = useState({ value: null })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('myuser'));
        if (user) {
            setUser(user)
            setEmail(user.email)
            fetchData(user.token)
        } else {
            router.push('/');
        }
    }, []);

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
        setAddress(res.address);
        setPincode(res.pincode);
        setPhone(res.phone)
    }

    const handleChange = (e) => {
        if (e.target.name == 'name') {
            setName(e.target.value);
        }
        else if (e.target.name == 'email') {
            setEmail(e.target.value);
        }
        else if (e.target.name == 'phone') {
            setPhone(e.target.value);
        }
        else if (e.target.name == 'address') {
            setAddress(e.target.value);
        }
        else if (e.target.name == 'pincode') {
            setPincode(e.target.value);
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
        <div className="container mx-auto my-9">
            <h1 className="text-3xl text-center font-bold">Update Your Account</h1>
            <h2 className="font-bold text-xl">1. Delivery Details</h2>
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
            <div className="px-2 w-full">
                <div className="mb-4">
                    <label htmlFor="address" className="leading-7 text-sm text-gray-600">Address</label>
                    <textarea onChange={handleChange} value={address} id="address" name="address" cols="30" rows="2" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"></textarea>
                </div>
            </div>
            <div className="mx-auto flex my-2">
                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                        <input onChange={handleChange} value={phone} type="text" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
                        <input onChange={handleChange} value={pincode} type="text" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
            </div>
            <div className="mx-auto flex my-2">
                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="city" className="leading-7 text-sm text-gray-600">District</label>
                        <input value={city} type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true} />
                    </div>
                </div>
                <div className="px-2 w-1/2">
                    <div className="mb-4">
                        <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                        <input value={state} type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" readOnly={true} />
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
        </div>
    )
}

export default Myaccount;