import type { Metadata } from "next";
import MarriageLicenseForm from "@/components/MarriageLicenseForm";

export const metadata: Metadata = {
  title: "Request a Marriage License | Pokemon Marriage Service",
  description:
    "Submit a Pokemon marriage license request for your beloved Pokemon couple.",
};

export default function LicensePage() {
  return (
    <main className="flex-1 px-6 py-16">
      <div className="mx-auto max-w-xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
          Marriage License Request
        </h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          Fill out the form below to request a marriage license for your
          Pokemon couple. All fields marked with * are required.
        </p>
      </div>
      <div className="mt-12">
        <MarriageLicenseForm />
      </div>
    </main>
  );
}
