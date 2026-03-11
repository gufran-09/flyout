

import { Link } from "react-router-dom";

const items = [
    { title: "Dubai", image: "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/destinations/dubai.webp", span: "col-span-1 md:col-span-2 md:row-span-1", link: "/dubai" },
    { title: "Abu Dhabi", image: "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/destinations/abu-dhabi.webp", span: "col-span-1 md:col-span-2 md:row-span-1", link: "/abu-dhabi" },
    { title: "Sharjah", image: "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/destinations/sharjah.webp", span: "col-span-1 md:col-span-1 md:row-span-1", link: "/sharjah" },
    { title: "Ras Al Khaimah", image: "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/destinations/ras-al-khaimah.webp", span: "col-span-1 md:col-span-2 md:row-span-1", link: "/ras-al-khaimah" },
    { title: "Ajman", image: "https://bfzhzxyjjkcctxnmzafb.supabase.co/storage/v1/object/public/media/destinations/ajman.webp", span: "col-span-1 md:col-span-1 md:row-span-1", link: "/ajman" },
];

export default function UaeShowcaseSection() {
    return (
        <section className="w-full px-4 md:px-[50px] pt-14 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 h-auto min-h-[600px] md:h-[70vh]">

                {items.map((item, i) => (
                    <Link
                        key={i}
                        to={item.link}
                        className={`relative overflow-hidden rounded-2xl group min-h-[200px] md:min-h-0 ${item.span} block`}
                    >
                        {/* Image */}
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                        />

                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/40 transition duration-500" />

                        {/* Title */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <h2 className="text-white text-3xl md:text-4xl xl:text-5xl font-serif tracking-wide drop-shadow-lg">
                                {item.title.toUpperCase()}
                            </h2>
                        </div>
                    </Link>
                ))}

            </div>
        </section>
    );
}

