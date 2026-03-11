"use client";
import { Layout } from "@/components/layout/Layout";
import { allDubaiExperiences } from "@/data/tours";
import { useParams } from "next/navigation";
import { notFound } from "next/navigation";

export default function ExperiencePage() {
    const params = useParams();
    const slug = params.slug as string;

    const experience = allDubaiExperiences.find(
        (tour) => tour.id === slug || tour.name.toLowerCase().replace(/\s+/g, "-") === slug
    );

    if (!experience) {
        notFound();
    }

    return (
        <Layout>
            <div className="container mx-auto px-4 py-12">
                <div className="max-w-4xl mx-auto">
                    <img
                        src={experience.image}
                        alt={experience.name}
                        className="w-full h-[400px] object-cover rounded-xl mb-8"
                    />
                    <h1 className="text-3xl font-bold mb-4">{experience.name}</h1>
                    <div className="flex items-center gap-4 mb-6">
                        <span className="text-muted-foreground">{experience.location}</span>
                        <span className="text-muted-foreground">{experience.duration}</span>
                        <span className="text-yellow-500">★ {experience.rating}</span>
                        <span className="text-muted-foreground">({experience.reviewCount} reviews)</span>
                    </div>
                    <div className="text-3xl font-bold text-primary">
                        AED {experience.price}
                        {experience.originalPrice && (
                            <span className="text-lg text-muted-foreground line-through ml-2">
                                AED {experience.originalPrice}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
