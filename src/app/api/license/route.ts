import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "fs/promises";
import path from "path";

interface LicenseRequest {
  id: string;
  pokemon1Name: string;
  pokemon1Species: string;
  pokemon2Name: string;
  pokemon2Species: string;
  trainerName: string;
  trainerEmail: string;
  notes: string;
  createdAt: string;
}

const DB_PATH = path.join(process.cwd(), "data", "licenses.json");

async function readLicenses(): Promise<LicenseRequest[]> {
  try {
    const data = await readFile(DB_PATH, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeLicenses(licenses: LicenseRequest[]): Promise<void> {
  const dir = path.dirname(DB_PATH);
  const { mkdir } = await import("fs/promises");
  await mkdir(dir, { recursive: true });
  await writeFile(DB_PATH, JSON.stringify(licenses, null, 2));
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      pokemon1Name,
      pokemon1Species,
      pokemon2Name,
      pokemon2Species,
      trainerName,
      trainerEmail,
      notes,
    } = body;

    // Validate required fields
    if (
      !pokemon1Name?.trim() ||
      !pokemon1Species?.trim() ||
      !pokemon2Name?.trim() ||
      !pokemon2Species?.trim() ||
      !trainerName?.trim() ||
      !trainerEmail?.trim()
    ) {
      return NextResponse.json(
        { error: "All required fields must be filled out." },
        { status: 400 }
      );
    }

    // Validate email format
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trainerEmail.trim())) {
      return NextResponse.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // Validate different Pokemon names
    if (pokemon1Name.trim().toLowerCase() === pokemon2Name.trim().toLowerCase()) {
      return NextResponse.json(
        { error: "The two Pokemon must have different names." },
        { status: 400 }
      );
    }

    // Check for duplicate license requests
    const licenses = await readLicenses();
    const duplicate = licenses.find(
      (l) =>
        l.pokemon1Name.toLowerCase() === pokemon1Name.trim().toLowerCase() &&
        l.pokemon2Name.toLowerCase() === pokemon2Name.trim().toLowerCase() &&
        l.trainerEmail.toLowerCase() === trainerEmail.trim().toLowerCase()
    );

    if (duplicate) {
      return NextResponse.json(
        {
          error:
            "A license request for this Pokemon pair already exists under this email.",
        },
        { status: 409 }
      );
    }

    const newLicense: LicenseRequest = {
      id: crypto.randomUUID(),
      pokemon1Name: pokemon1Name.trim(),
      pokemon1Species: pokemon1Species.trim(),
      pokemon2Name: pokemon2Name.trim(),
      pokemon2Species: pokemon2Species.trim(),
      trainerName: trainerName.trim(),
      trainerEmail: trainerEmail.trim(),
      notes: notes?.trim() || "",
      createdAt: new Date().toISOString(),
    };

    licenses.push(newLicense);
    await writeLicenses(licenses);

    return NextResponse.json(
      { message: "License request submitted successfully.", id: newLicense.id },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
