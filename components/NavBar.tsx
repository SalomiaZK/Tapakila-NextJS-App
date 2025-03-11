"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Importez useRouter
import { useEffect, useState } from "react";
import { FaBars, FaSearch, FaTimes, FaUser } from "react-icons/fa";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const router = useRouter(); // Utilisez useRouter pour la redirection

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Fonction pour gérer la soumission de la recherche
    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Empêcher le rechargement de la page
        if (searchValue.trim()) {
            router.push(`/events?search=${encodeURIComponent(searchValue)}`); // Rediriger avec le paramètre de recherche
        }
    };

    return (
        <nav
            className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled || isMenuOpen || isSearchOpen
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

                    {/* Formulaire de recherche */}
                    <form
                        onSubmit={handleSearchSubmit}
                        className={`hidden lg:flex items-center bg-gray-100 text-bleuNuit rounded-xl px-3 py-2 w-1/3 transition-all duration-300 ${isSearchFocused || searchValue
                                ? "shadow-neon-orMetallique"
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
                            value={searchValue}
                        />
                    </form>

                    {/* Bouton de recherche pour mobile */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className={`text-blancCasse p-2 ${!isScrolled && !isMenuOpen ? "bg-bleuNuit bg-opacity-50 rounded-full" : ""
                                }`}
                        >
                            <FaSearch size={20} />
                        </button>
                    </div>

                    {/* Menu mobile */}
                    <div className="lg:hidden flex items-center">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-blancCasse p-2"
                        >
                            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
                        </button>
                    </div>

                    {/* Liens de navigation */}
                    <div className="hidden lg:flex items-center space-x-6">
                        <Link
                            href="/"
                            className="text-blancCasse hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-bleuElec to-orMetallique transition-all duration-300 hover-neon underline-uncurved"
                        >
                            Accueil
                        </Link>
                        <Link
                            href="/events"
                            className="text-blancCasse hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-bleuElec to-orMetallique transition-all duration-300 hover-neon underline-uncurved"
                        >
                            Événements
                        </Link>
                        <Link
                            href="/contacts"
                            className="text-blancCasse hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-bleuElec to-orMetallique transition-all duration-300 hover-neon underline-uncurved"
                        >
                            Contact
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

                {/* Formulaire de recherche mobile */}
                {isSearchOpen && (
                    <div className="lg:hidden mt-4 transition-all duration-300">
                        <form
                            onSubmit={handleSearchSubmit}
                            className={`flex items-center bg-gray-100 text-bleuNuit rounded-xl px-3 py-2 ${isSearchFocused || searchValue
                                    ? "shadow-neon-orMetallique"
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
                                value={searchValue}
                            />
                        </form>
                    </div>
                )}

                {/* Menu mobile */}
                {isMenuOpen && (
                    <div className="lg:hidden mt-4 transition-all duration-300">
                        <div className="flex flex-col space-y-4 bg-bleuNuit p-4 rounded-lg">
                            <Link
                                href="/"
                                className="text-blancCasse hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-bleuElec to-orMetallique transition-all duration-300 hover-neon"
                            >
                                Accueil
                            </Link>
                            <Link
                                href="/events"
                                className="text-blancCasse hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-bleuElec to-orMetallique transition-all duration-300 hover-neon"
                            >
                                Événements
                            </Link>
                            <Link
                                href="/contact"
                                className="text-blancCasse hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r from-bleuElec to-orMetallique transition-all duration-300 hover-neon"
                            >
                                Contacts
                            </Link>
                            <Link
                                href="/login"
                                className="glowing-button flex items-center justify-center text-blancCasse hover:text-bleuNuit px-4 py-2"
                            >
                                <FaUser className="mr-2" />
                                Se Connecter
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}