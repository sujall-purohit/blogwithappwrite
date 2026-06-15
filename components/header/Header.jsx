import React, { useState } from 'react'
import { Logo, Container, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Menu, X } from "lucide-react";

function Header() {
    const [open, setOpen] = useState(false);
    const authStatus = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const navItems = [
        {
            name: 'Home',
            slug: "/",
            active: true
        },
        {
            name: "Login",
            slug: "/login",
            active: !authStatus,
        },
        {
            name: "Signup",
            slug: "/signup",
            active: !authStatus,
        },
        {
            name: "All Posts",
            slug: "/all-posts",
            active: authStatus,
        },
        {
            name: "Add Post",
            slug: "/add-post",
            active: authStatus,
        },
    ]


    return (
        <header className="mx-auto w-[95%] md:w-[80%] sticky top-4 rounded-4xl z-50 bg-gray-400/70 backdrop-blur-xl border-b border-slate-200 shadow-[0_2px_10px_rgba(0,0,0,0.05)] h-20 flex  items-center text-xl
">
            <Container className="max-w-7xl mx-auto px-6">
                <nav className="flex items-center justify-between h-full">
                    {open && (
                        <ul className="md:hidden absolute top-24 left-0 w-full bg-gray-400/90 backdrop-blur-xl rounded-2xl p-4 flex flex-col gap-2">
                            {navItems.map((item) =>
                                item.active ? (
                                    <li key={item.name}>
                                        <button
                                            onClick={() => {
                                                navigate(item.slug)
                                                setOpen(false)
                                            }}
                                            className="w-full text-left px-4 py-2 rounded-xl hover:bg-indigo-50"
                                        >
                                            {item.name}
                                        </button>
                                    </li>
                                ) : null
                            )}

                            {authStatus && (
                                <li>
                                    <LogoutBtn />
                                </li>
                            )}
                        </ul>
                    )}
                    <div>
                        <Link to="/">
                            <Logo width="70px" className="md:w-[90px]" />
                        </Link>
                    </div>
                    <button
                        onClick={() => setOpen(!open)}
                        className="md:hidden ml-auto mr-5">
                        {open ? <X size={28} /> : <Menu size={28} />}
                    </button>
                    <ul className=" hidden md:flex items-center gap-2 ml-auto">
                        {navItems.map((item) =>
                            item.active ? (
                                <li key={item.name}>
                                    <button
                                        onClick={() => navigate(item.slug)}
                                        className=" px-4 py-2 text-slate-600 font-medium rounded-xl transition-all duration-300 hover:bg-indigo-50 hover:text-indigo-600 ">
                                        {item.name}
                                    </button>
                                </li>
                            ) : null
                        )}
                        {authStatus && (
                            <li>
                                <LogoutBtn />
                            </li>
                        )}

                    </ul>
                </nav>
            </Container>
        </header>
    )
}

export default Header
