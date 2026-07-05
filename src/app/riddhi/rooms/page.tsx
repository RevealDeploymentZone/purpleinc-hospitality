import Link from "next/link";
import Image from "next/image";
import { Wifi, Wind, Coffee, Car, Star, Users, Maximize2, BedDouble, ChevronRight } from "lucide-react";
import { riddhiRooms } from "@/data/riddhi";
import { formatPrice } from "@/lib/utils";

export default function RiddhiRoomsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-indigo-700 py-16 px-4 text-center text-white">
        <div className="text-sm font-semibold tracking-widest uppercase text-indigo-200 mb-2">Riddhi Palace</div>
        <h1 className="text-4xl font-bold">Rooms & Suites</h1>
        <p className="text-indigo-200 mt-3">Four curated room types for every kind of royal stay.</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-14 space-y-8">
        {riddhiRooms.map((room) => (
          <div key={room.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row hover:shadow-md transition-shadow">
            <div className="relative md:w-80 h-60 md:h-auto shrink-0">
              <Image src={room.image} alt={room.name} fill className="object-cover" unoptimized />
              {room.tag && <span className="absolute top-3 left-3 bg-indigo-700 text-white text-xs font-semibold px-2.5 py-1 rounded-full">{room.tag}</span>}
            </div>
            <div className="flex-1 p-6 flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{room.name}</h2>
                <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1"><Maximize2 className="w-4 h-4" /> {room.size}</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> Up to {room.occupancy} guests</span>
                  <span className="flex items-center gap-1"><BedDouble className="w-4 h-4" /> {room.bed}</span>
                </div>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed line-clamp-2">{room.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {[Wifi, Wind, Coffee, Car].map((Icon, i) => (
                    <span key={i} className="bg-indigo-50 text-indigo-700 text-xs px-2.5 py-1 rounded-full flex items-center gap-1"><Icon className="w-3 h-3" />{room.amenities[i]}</span>
                  ))}
                  {room.amenities.length > 4 && <span className="text-xs text-gray-400 self-center">+{room.amenities.length - 4} more</span>}
                </div>
              </div>
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                <div>
                  <span className="text-2xl font-bold text-indigo-700">{formatPrice(room.price)}</span>
                  <span className="text-sm text-gray-400"> / night incl. breakfast</span>
                </div>
                <div className="flex gap-3">
                  <Link href={`/riddhi/rooms/${room.slug}`} className="border border-indigo-300 text-indigo-700 font-semibold px-4 py-2 rounded-xl text-sm hover:bg-indigo-50 transition-colors flex items-center gap-1">
                    Details <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                  <Link href={`/riddhi/book?room=${room.slug}`} className="bg-indigo-700 hover:bg-indigo-800 text-white font-semibold px-5 py-2 rounded-xl text-sm transition-colors">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
