"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaSearch, FaUser } from "react-icons/fa";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchValue, setSearchValue] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-bleuNuit shadow-lg transform -translate-y-1"
                    : "bg-transparent transform translate-y-0"
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex items-center space-x-4">
                        <Link href="/">
                            <Image
                                src="/img/tapakila.png"
                                alt="Logo Diamond Blue"
                                width={200}
                                height={200}
                                className="rounded-full hover:scale-110 transition-all duration-500 ease-in-out transform object-cover w-16 h-16"
                                priority
                            />
                        </Link>
                        <Link
                            href="/"
                            className="text-xl font-bold text-blancCasse hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-bleuElec to-orMetallique transition-all duration-300 hover-neon"
                        >
                            <span className="text-bleuElec">Tap</span>
                            <span className="text-orMetallique">akila</span>
                        </Link>
                    </div>

                    <div
                        className={`flex items-center bg-gray-100 text-bleuNuit rounded-lg px-3 py-2 w-1/3 transition-all duration-300 ${isSearchFocused || searchValue
                                ? "shadow-[0_0_10px_2px_rgba(255,186,8,0.6)]"
                                : ""
                            }`}
                    >
                        <FaSearch className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Rechercher des événements..."
                            className="ml-2 bg-transparent outline-none w-full"
                            onFocus={() => setIsSearchFocused(true)}
                            onBlur={() => setIsSearchFocused(false)}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                    </div>

                    <div className="flex items-center space-x-6">
                        <Link
                            href="/"
                            className="text-blancCasse hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-bleuElec to-orMetallique transition-all duration-300 hover-neon underline-uncurved"
                        >
                            <span className="text-bleuElec">Acc</span>
                            <span className="text-orMetallique">ueil</span>
                        </Link>
                        <Link
                            href="/events"
                            className="text-blancCasse hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-bleuElec to-orMetallique transition-all duration-300 hover-neon underline-uncurved"
                        >
                            <span className="text-bleuElec">Évén</span>
                            <span className="text-orMetallique">ements</span>
                        </Link>
                        <Link
                            href="/contact"
                            className="text-blancCasse hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-bleuElec to-orMetallique transition-all duration-300 hover-neon underline-uncurved"
                        >
                            <span className="text-bleuElec">Con</span>
                            <span className="text-orMetallique">tacts</span>
                        </Link>
                        <Link
                            href="/login"
                            className="glowing-button flex items-center text-blancCasse hover:text-bleuNuit px-4 py-2"
                        >
                            <FaUser className="mr-2" />
                            Se Connecter
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}