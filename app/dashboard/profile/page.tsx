"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
    user_id: string;
    user_name: string;
    user_email: string;
    date_joined: string;
    city: string;
    postal_code: string;
    country: string;
    address: string;
}

const ProfilePage = () => {
    const [user, setUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch("/api/users/update");
                if (!response.ok) {
                    throw new Error("Failed to fetch user profile");
                }
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Profile</h1>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Nom et Prénom</label>
                    <p className="mt-1">{user.user_name}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1">{user.user_email}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Date d'adhésion</label>
                    <p className="mt-1">{new Date(user.date_joined).toLocaleDateString()}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Ville</label>
                    <p className="mt-1">{user.city}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Code Postal</label>
                    <p className="mt-1">{user.postal_code}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Pays</label>
                    <p className="mt-1">{user.country}</p>
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Adresse</label>
                    <p className="mt-1">{user.address}</p>
                </div>
                <button
                    onClick={() => router.push("/dashboard/profile/update")}
                    className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Mettre à jour le profil
                </button>
            </div>
        </div>
    );
};

export default ProfilePage;