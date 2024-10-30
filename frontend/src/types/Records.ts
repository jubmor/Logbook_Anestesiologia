export type RecordTableListItemType = RecordInProgress | RecordArchived;

interface RecordInProgress extends RecordDefaultProps {
  status: "in_progress";
  archivedDate: undefined;
}

interface RecordArchived extends RecordDefaultProps {
  status: "archived";
  archivedDate: Date;
}

type RecordDefaultProps = {
  id: string;
  processNumber: number;
  episodeNumber: number;
  rotation: Specialty;
  isFavorite: boolean;
  dateCreated: Date;
};

export type RecordStatus = "archived" | "in_progress";

export type Specialty =
  | "Anestesiologia"
  | "Cardiologia"
  | "Dermatologia"
  | "Endocrinologia"
  | "Gastroenterologia"
  | "Hematologia"
  | "Neurologia"
  | "Oftalmologia"
  | "Oncologia"
  | "Pediatria"
  | "Psiquiatria"
  | "Urologia"
  | "Medicina Intensiva";

export type RecordFormBasicInfoProps = {
  rotation: Specialty | null;
  episode: string | null;
  process: string | null;
};
