"use client";
import { Layout } from "@/components/layout/Layout";
import { motion } from "framer-motion";
import Link from "next/link";
import { allDubaiExperiences } from "@/data/tours";
import { BurjTower } from "@/components/dubai/BurjTower";
import { ZoneSection } from "@/components/dubai/ZoneSection";

export default function DubaiPage() {
    return (
        <Layout>
            <div className="min-h-screen">
                <BurjTower />
                <ZoneSection />
            </div>
        </Layout>
    );
}
