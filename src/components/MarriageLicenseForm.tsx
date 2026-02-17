"use client";

import { useState, FormEvent } from "react";

interface FormData {
  pokemon1Name: string;
  pokemon1Species: string;
  pokemon2Name: string;
  pokemon2Species: string;
  trainerName: string;
  trainerEmail: string;
  notes: string;
  honeypot: string;
}

interface FormErrors {
  pokemon1Name?: string;
  pokemon1Species?: string;
  pokemon2Name?: string;
  pokemon2Species?: string;
  trainerName?: string;
  trainerEmail?: string;
  general?: string;
}

const POKEMON_TYPES = [
  "Normal",
  "Fire",
  "Water",
  "Electric",
  "Grass",
  "Ice",
  "Fighting",
  "Poison",
  "Ground",
  "Flying",
  "Psychic",
  "Bug",
  "Rock",
  "Ghost",
  "Dragon",
  "Dark",
  "Steel",
  "Fairy",
];

const initialFormData: FormData = {
  pokemon1Name: "",
  pokemon1Species: "",
  pokemon2Name: "",
  pokemon2Species: "",
  trainerName: "",
  trainerEmail: "",
  notes: "",
  honeypot: "",
};

export default function MarriageLicenseForm() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function validate(data: FormData): FormErrors {
    const errs: FormErrors = {};

    if (!data.pokemon1Name.trim()) {
      errs.pokemon1Name = "First Pokemon name is required.";
    }
    if (!data.pokemon1Species) {
      errs.pokemon1Species = "First Pokemon type is required.";
    }
    if (!data.pokemon2Name.trim()) {
      errs.pokemon2Name = "Second Pokemon name is required.";
    }
    if (!data.pokemon2Species) {
      errs.pokemon2Species = "Second Pokemon type is required.";
    }
    if (
      data.pokemon1Name.trim() &&
      data.pokemon2Name.trim() &&
      data.pokemon1Name.trim().toLowerCase() ===
        data.pokemon2Name.trim().toLowerCase()
    ) {
      errs.pokemon2Name =
        "The two Pokemon must have different names.";
    }
    if (!data.trainerName.trim()) {
      errs.trainerName = "Trainer name is required.";
    }
    if (!data.trainerEmail.trim()) {
      errs.trainerEmail = "Trainer email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.trainerEmail.trim())) {
      errs.trainerEmail = "Please enter a valid email address.";
    }

    return errs;
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name as keyof FormErrors];
        return next;
      });
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    // Honeypot check
    if (formData.honeypot) return;

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);
    setErrors({});

    try {
      const res = await fetch("/api/license", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pokemon1Name: formData.pokemon1Name.trim(),
          pokemon1Species: formData.pokemon1Species,
          pokemon2Name: formData.pokemon2Name.trim(),
          pokemon2Species: formData.pokemon2Species,
          trainerName: formData.trainerName.trim(),
          trainerEmail: formData.trainerEmail.trim(),
          notes: formData.notes.trim(),
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(
          body?.error || "Something went wrong. Please try again."
        );
      }

      setSubmitted(true);
      setFormData(initialFormData);
    } catch (err) {
      setErrors({
        general:
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl text-center" role="status">
        <div className="rounded-lg border border-green-200 bg-green-50 p-8 dark:border-green-900 dark:bg-green-950">
          <h2 className="text-2xl font-bold text-green-800 dark:text-green-200">
            License Request Submitted!
          </h2>
          <p className="mt-4 text-green-700 dark:text-green-300">
            Your Pokemon marriage license request has been received. We will
            review your application and contact you at the email provided.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-6 rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-md border border-zinc-300 bg-white px-4 py-2.5 text-sm text-zinc-900 shadow-sm transition-colors focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-400 dark:focus:ring-zinc-400";
  const labelClass =
    "block text-sm font-medium text-zinc-700 dark:text-zinc-300";
  const errorClass = "mt-1 text-sm text-red-600 dark:text-red-400";

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="mx-auto max-w-xl space-y-8"
    >
      {errors.general && (
        <div
          role="alert"
          className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300"
        >
          {errors.general}
        </div>
      )}

      {/* Honeypot */}
      <div className="absolute left-[-9999px]" aria-hidden="true">
        <label htmlFor="honeypot">Leave this empty</label>
        <input
          type="text"
          id="honeypot"
          name="honeypot"
          value={formData.honeypot}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {/* Pokemon 1 */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          First Pokemon
        </legend>

        <div>
          <label htmlFor="pokemon1Name" className={labelClass}>
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            id="pokemon1Name"
            name="pokemon1Name"
            required
            maxLength={100}
            value={formData.pokemon1Name}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.pokemon1Name && (
            <p className={errorClass} role="alert">
              {errors.pokemon1Name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="pokemon1Species" className={labelClass}>
            Type <span aria-hidden="true">*</span>
          </label>
          <select
            id="pokemon1Species"
            name="pokemon1Species"
            required
            value={formData.pokemon1Species}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select a type</option>
            {POKEMON_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.pokemon1Species && (
            <p className={errorClass} role="alert">
              {errors.pokemon1Species}
            </p>
          )}
        </div>
      </fieldset>

      {/* Pokemon 2 */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Second Pokemon
        </legend>

        <div>
          <label htmlFor="pokemon2Name" className={labelClass}>
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            id="pokemon2Name"
            name="pokemon2Name"
            required
            maxLength={100}
            value={formData.pokemon2Name}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.pokemon2Name && (
            <p className={errorClass} role="alert">
              {errors.pokemon2Name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="pokemon2Species" className={labelClass}>
            Type <span aria-hidden="true">*</span>
          </label>
          <select
            id="pokemon2Species"
            name="pokemon2Species"
            required
            value={formData.pokemon2Species}
            onChange={handleChange}
            className={inputClass}
          >
            <option value="">Select a type</option>
            {POKEMON_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.pokemon2Species && (
            <p className={errorClass} role="alert">
              {errors.pokemon2Species}
            </p>
          )}
        </div>
      </fieldset>

      {/* Trainer Info */}
      <fieldset className="space-y-4">
        <legend className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">
          Trainer Information
        </legend>

        <div>
          <label htmlFor="trainerName" className={labelClass}>
            Name <span aria-hidden="true">*</span>
          </label>
          <input
            type="text"
            id="trainerName"
            name="trainerName"
            required
            maxLength={200}
            value={formData.trainerName}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.trainerName && (
            <p className={errorClass} role="alert">
              {errors.trainerName}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="trainerEmail" className={labelClass}>
            Email <span aria-hidden="true">*</span>
          </label>
          <input
            type="email"
            id="trainerEmail"
            name="trainerEmail"
            required
            maxLength={320}
            value={formData.trainerEmail}
            onChange={handleChange}
            className={inputClass}
          />
          {errors.trainerEmail && (
            <p className={errorClass} role="alert">
              {errors.trainerEmail}
            </p>
          )}
        </div>
      </fieldset>

      {/* Notes */}
      <div>
        <label htmlFor="notes" className={labelClass}>
          Special Requests or Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          maxLength={1000}
          value={formData.notes}
          onChange={handleChange}
          className={inputClass}
          placeholder="Any special requests for the ceremony..."
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-300"
      >
        {submitting ? "Submitting..." : "Submit License Request"}
      </button>
    </form>
  );
}
