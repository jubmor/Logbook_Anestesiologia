type HeaderEntry = {
  month: string;
  quarters: number[];
};

export const HEADER = [
  {
    month: "",
    quarters: []
  },
  {
    month: "Janeiro",
    quarters: []
  },
  {
    month: "Fevereiro",
    quarters: []
  },
  {
    month: "Março",
    quarters: []
  },
  {
    month: "Abril",
    quarters: []
  },
  {
    month: "Maio",
    quarters: []
  },
  {
    month: "Junho",
    quarters: []
  },
  {
    month: "Julho",
    quarters: []
  },
  {
    month: "Agosto",
    quarters: []
  },
  {
    month: "Setembro",
    quarters: []
  },
  {
    month: "Outubro",
    quarters: []
  },
  {
    month: "Novembro",
    quarters: []
  },
  {
    month: "Dezembro",
    quarters: []
  }
];

const calculateQuartersForMonth = (month: number, year: number): number[] => {
  const totalDays: number = new Date(year, month + 1, 0).getDate();

  const basePartSize: number = Math.floor(totalDays / 5);
  const remainderDays: number = totalDays % 5;

  const parts: number[] = [];
  let startDay = 1;

  for (let i = 0; i < 5; i++) {
    const daysInPart = basePartSize + (i < remainderDays ? 1 : 0);
    parts.push(startDay);
    startDay += daysInPart;
  }

  return parts.slice(1, 4);
};

export const getHeader = (selectedYear: Date): HeaderEntry[] => {
  const year = selectedYear.getFullYear();

  return HEADER.map((entry, idx) => {
    if (idx === 0) return entry;
    const quarters: number[] = calculateQuartersForMonth(idx - 1, year); // idx - 1 because months are 0-indexed in JS Date

    return {
      ...entry,
      quarters
    };
  });
};
