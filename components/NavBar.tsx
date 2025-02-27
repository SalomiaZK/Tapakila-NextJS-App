import Image from "next/image";
import Link from "next/link";
import { FaSearch, FaUser } from "react-icons/fa";

export default function Navbar() {
    return (
        <nav className="bg-blue-700 text-white shadow-md fixed w-full top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
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
                        <Link href="/" className="text-xl font-bold text-white">
                            Tapakila
                        </Link>
                    </div>

                    <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-1/3">
                        <FaSearch className="text-gray-500" />
                        <input
                            type="text"
                            placeholder="Rechercher des événements..."
                            className="ml-2 bg-transparent outline-none w-full"
                        />
                    </div>

                    <div className="flex items-center space-x-6">
                        <Link href="/events" className="text-white hover:text-yellow-500">
                            Événements
                        </Link>
                        <Link href="/contact" className="text-white hover:text-yellow-500">
                            Contacts
                        </Link>
                        <Link
                            href="/login"
                            className="flex items-center text-white hover:text-yellow-500"
                        >
                            <FaUser className="mr-1" />
                            Se Connecter
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}