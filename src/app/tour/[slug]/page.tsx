import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@backend/api/products";
import ProductDetailPage from "@/components/product/ProductDetailPage";
import { Layout } from "@/components/layout/Layout";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    return {
      title: "Product Not Found - Flyout Tours",
      description: "The requested product could not be found.",
    };
  }

  return {
    title: `${product.title} - Flyout Tours`,
    description:
      product.subtitle ||
      product.overview?.substring(0, 160) ||
      "Book your next adventure with Flyout Tours.",
    openGraph: {
      title: product.title,
      description:
        product.subtitle || product.overview?.substring(0, 160) || "",
      images: product.thumbnail_url ? [product.thumbnail_url] : [],
    },
  };
}

export default async function Page({ params }: Props) {
  const resolvedParams = await params;
  const product = await getProductBySlug(resolvedParams.slug);

  if (!product) {
    notFound();
  }

  return (
    <Layout>
      <ProductDetailPage product={product as any} />
    </Layout>
  );
}
