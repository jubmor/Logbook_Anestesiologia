import { RecordTableListItemType, RecordStatus } from "@/types/Records";

const specialties = [
  "Anestesiologia",
  "Cardiologia",
  "Dermatologia",
  "Endocrinologia",
  "Gastroenterologia",
  "Hematologia",
  "Neurologia",
  "Oftalmologia",
  "Oncologia",
  "Pediatria",
  "Psiquiatria",
  "Urologia"
];

export function generateRecordItems(count: number): RecordTableListItemType[] {
  return Array.from({ length: count }, () => {
    const status: RecordStatus = Math.random() > 0.5 ? "archived" : "in_progress";
    const dateCreated = generateDateCreated();

    // If the status is "archived", generate an archivedDate, otherwise set it to undefined
    const archivedDate = status === "archived" ? generateArchivedDate(dateCreated) : undefined;

    return {
      id: generateId(),
      episodeNumber: generateProcessNumber(),
      processNumber: generateProcessNumber(),
      //name: generateName(),
      rotation: getRandomSpecialty(),
      status,
      isFavorite: Math.random() > 0.5,
      dateCreated,
      archivedDate
    } as RecordTableListItemType;
  });
}

function generateId(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

function generateProcessNumber(): number {
  return Math.floor(Math.random() * 9000000) + 1000000;
}

function generateName(): string {
  const firstNames = ["Ana", "Bruno", "Carla", "David", "Eduarda", "Felipe"];
  const lastNames = ["Silva", "Souza", "Lima", "Pereira", "Oliveira", "Costa"];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  return `${firstName} ${lastName}`;
}

function getRandomSpecialty(): string {
  return specialties[Math.floor(Math.random() * specialties.length)];
}

function generateDateCreated(): Date {
  const today = new Date();
  const daysAgo = Math.floor(Math.random() * 30) + 1; // Random number between 1 and 30
  const dateCreated = new Date(today);
  dateCreated.setDate(today.getDate() - daysAgo);
  return dateCreated;
}

function generateArchivedDate(dateCreated: Date): Date {
  const daysAfterCreated = Math.floor(Math.random() * (30 - 2)) + 2; // Minimum 2 days after creation
  const archivedDate = new Date(dateCreated);
  archivedDate.setDate(dateCreated.getDate() + daysAfterCreated);
  return archivedDate;
}
