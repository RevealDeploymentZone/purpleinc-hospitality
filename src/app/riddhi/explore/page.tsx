import Image from "next/image";
import { MapPin, ExternalLink } from "lucide-react";
import { riddhiAttractions } from "@/data/riddhi";

export default function RiddhiExplorePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-indigo-700 py-16 px-4 text-center text-white">
        <div className="text-sm tracking-widest uppercase text-indigo-200 mb-2">Discover</div>
        <h1 className="text-4xl font-bold">Explore Lucknow</h1>
        <p className="text-indigo-200 mt-3 max-w-xl mx-auto">Riddhi Palace puts you at the centre of everything Lucknow has to offer.</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {riddhiAttractions.map((a) => (
          <div key={a.name} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow group">
            <div className="relative h-48 overflow-hidden">
              <Image src={a.image} alt={a.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-1.5 text-xs text-indigo-600 font-semibold mb-2">
                <MapPin className="w-3.5 h-3.5" /> {a.distance} from Riddhi Palace
              </div>
              <h3 className="font-bold text-gray-900 text-lg">{a.name}</h3>
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">{a.description}</p>
              <a href={`https://maps.google.com/?q=${encodeURIComponent(a.name + " Lucknow")}`} target="_blank" rel="noopener noreferrer"
                className="mt-4 flex items-center gap-1.5 text-sm text-indigo-600 font-semibold hover:underline">
                View on Map <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
