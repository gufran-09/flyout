"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { Layout } from "@/components/layout/Layout";
import { allDubaiExperiences } from "@/data/tours";

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const results = allDubaiExperiences.filter(
    (tour) =>
      tour.name.toLowerCase().includes(query.toLowerCase()) ||
      tour.category.toLowerCase().includes(query.toLowerCase()) ||
      tour.location.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-muted-foreground mb-8">
          {results.length} results for &quot;{query}&quot;
        </p>
        {results.length === 0 ? (
          <p className="text-center py-12 text-muted-foreground">
            No experiences found matching your search.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((tour) => (
              <div key={tour.id} className="border rounded-lg overflow-hidden">
                <img
                  src={tour.image}
                  alt={tour.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold">{tour.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {tour.location}
                  </p>
                  <p className="font-bold mt-2">AED {tour.price}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
