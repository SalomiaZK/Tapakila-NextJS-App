"use client";

import EventCard from "@/components/EventCard";
import Link from "next/link";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const events = [
  {
    id: "1",
    name: "Concert de Rock",
    date: "2023-12-15T20:00:00",
    location: "Paris, France",
    description: "Un concert de rock avec les meilleurs groupes internationaux.",
    imageUrl: "https://via.placeholder.com/400",
    category: "Spectacle",
  },
  {
    id: "2",
    name: "Exposition d'Art Moderne",
    date: "2023-11-20T10:00:00",
    location: "Lyon, France",
    description: "Découvrez des œuvres d'art moderne de renommée mondiale.",
    imageUrl: "https://via.placeholder.com/400",
    category: "Culture",
  },
  {
    id: "3",
    name: "Match de Football",
    date: "2023-12-10T18:00:00",
    location: "Marseille, France",
    description: "Supportez votre équipe préférée lors de ce match passionnant.",
    imageUrl: "https://via.placeholder.com/400",
    category: "Sports",
  },
  {
    id: "4",
    name: "Festival de Jazz",
    date: "2023-11-25T19:00:00",
    location: "Nice, France",
    description: "Un festival de jazz avec des artistes internationaux.",
    imageUrl: "https://via.placeholder.com/400",
    category: "Spectacle",
  },
];

const eventSoon = [
  {
    id: "1",
    name: "Concert de Rock",
    date: "2024-01-15T20:00:00",
    location: "Paris, France",
    description: "Un concert de rock avec les meilleurs groupes internationaux.",
    imageUrl: "https://via.placeholder.com/400",
    category: "Spectacle",
  },
  {
    id: "2",
    name: "Exposition d'Art Moderne",
    date: "2024-07-20T10:00:00",
    location: "Lyon, France",
    description: "Découvrez des œuvres d'art moderne de renommée mondiale.",
    imageUrl: "https://via.placeholder.com/400",
    category: "Culture",
  },
  {
    id: "3",
    name: "Match de Football",
    date: "2024-10-10T18:00:00",
    location: "Marseille, France",
    description: "Supportez votre équipe préférée lors de ce match passionnant.",
    imageUrl: "https://via.placeholder.com/400",
    category: "Sports",
  },
  {
    id: "4",
    name: "Festival de Jazz",
    date: "2024-05-25T19:00:00",
    location: "Nice, France",
    description: "Un festival de jazz avec des artistes internationaux.",
    imageUrl: "https://via.placeholder.com/400",
    category: "Spectacle",
  },
];

const tickets = [
  {
    id: "1",
    type: "VIP",
    price: 100,
    quantity: 50,
    limitPerUser: 2,
  },
  {
    id: "2",
    type: "Standard",
    price: 50,
    quantity: 200,
    limitPerUser: 4,
  },
];

export default function Home() {
  return (
    <div className="bg-blancCasse min-h-screen">
      <section
        className="relative h-screen flex items-center justify-start bg-cover bg-center"
        style={{
          backgroundImage: "url('/img/home.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 text-blancCasse px-8 lg:px-16">
          <h1 className="text-5xl font-bold mb-6">Bienvenue sur Tapakila</h1>
          <p className="text-xl mb-8">
            Découvrez et réservez vos billets <br />pour les meilleurs événements de votre vie.
          </p>
          <Link
            href="/events"
            className="bg-bleuElec text-blancCasse px-6 py-3 rounded-lg text-lg hover:bg-bleuNuit hover:text-orMetallique transition-colors"
          >
            Réserver Maintenant
          </Link>
        </div>
      </section>

      <section
        className="relative py-16 bg-cover bg-center"
        style={{
          backgroundImage: "url('/img/event.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10">
          <Swiper
            spaceBetween={30}
            centeredSlides={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Autoplay, Pagination, Navigation]}
            className="mySwiper"
          >
            {events.map((event) => (
              <SwiperSlide key={event.id}>
                <div className="flex justify-center">
                  <EventCard {...event} />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section
        className="relative py-16 px-6 bg-cover bg-center"
        style={{
          backgroundImage: "url('/img/eventSoon.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-blancCasse mb-8">
            Événements à Venir
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventSoon.filter((event) => true).length > 0 ? (
              eventSoon
                .filter((event) => true)
                .map((event) => (
                  <EventCard key={event.id} {...event} />
                ))
            ) : (
              <p className="text-blancCasse text-lg">
                Aucun événement à venir pour le moment.
              </p>
            )}
          </div>
        </div>
      </section>

      <section
        className="relative py-12 px-6 bg-cover bg-center"
        style={{
          backgroundImage: "url('/img/concert.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-blancCasse mb-8">Spectacles & Concerts</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events
              .filter((event) => event.category === "Spectacle")
              .map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
          </div>
        </div>
      </section>

      <section
        className="relative py-12 px-6 bg-cover bg-center"
        style={{
          backgroundImage: "url('/img/festival.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-blancCasse mb-8">Festival & Culture</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events
              .filter((event) => event.category === "Culture")
              .map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
          </div>
        </div>
      </section>

      <section
        className="relative py-12 px-6 bg-cover bg-center"
        style={{
          backgroundImage: "url('/img/football.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-blancCasse mb-8">Sports</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events
              .filter((event) => event.category === "Sports")
              .map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
          </div>
        </div>
      </section>

      <section
        className="relative py-12 px-6 bg-cover bg-center"
        style={{
          backgroundImage: "url('/img/pastEvent.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold text-blancCasse mb-8">
            Événements Passés
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events
              .filter((event) => new Date(event.date) < new Date())
              .map((event) => (
                <EventCard key={event.id} {...event} />
              ))}
          </div>
        </div>
      </section>
    </div>
  );
}