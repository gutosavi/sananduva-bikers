export const KIT_ITENS = [
  {
    title: "Meia de Ciclismo",
    description: "Meia de Ciclismo Furbio especial do evento",
  },
  {
    title: "Placa de Identificação",
    description: "Placa de identificação de acordo com categoria",
  },
  {
    title: "Vale almoço",
    description: "Almoço completo com churrasco e saladas",
  },
  {
    title: "Vale chopp/isotônico",
    description: "Vale chopp ou isotônico para repor energias pós-prova",
  },
  { title: "Seguro atleta", description: "Seguro para eventuais imprevistos" },
  {
    title: "Suporte técnico",
    description: "Carro de apoio em caso de problemas mecênicos",
  },
  {
    title: "Fotografias profissionais",
    description: "Fotografias profissionais e sem custo aos inscritos",
  },
];

export type Routes = {
  title: string;
  distance: string;
  elevation: string;
  level: string;
};

export const ROUTES_EVENT: Routes[] = [
  {
    title: "Light",
    distance: "15 km",
    elevation: "250m",
    level: "Iniciante",
  },
  {
    title: "Amador",
    distance: "30 km",
    elevation: "550m",
    level: "Intermediário",
  },
  {
    title: "Sport",
    distance: "42 km",
    elevation: "870m",
    level: "Intermediário",
  },
  { title: "Pro", distance: "61 km", elevation: "1465m", level: "Avançado" },
];

export const CATEGORIES = [
  "Cicloturismo Iniciante",
  "Cicloturismo Amador",
  "Cicloturismo Pro",
  "Light Amador - Masculino",
  "Light Amador - Feminino",
  "Sport Junior",
  "Sport - Masculino Sub-30",
  "Sport - Masculino Master A",
  "Sport - Masculino Master B",
  "Sport - Masculino Master C1",
  "Sport - Masculino Master C2",
  "Sport - Masculino Veterano",
  "Sport - Feminino Sub-30",
  "Sport - Feminino Master A",
  "Sport - Feminino Master B",
  "Sport - Feminino Master C",
  "Sport - Masculino Nelore",
  "Sport - PCD: Pessoa com Deficiência",
  "Pro - Elite Masculino",
  "Pro - Elite Feminino",
  "Pro - Masculino Sub-30",
  "Pro - Masculino Master A1",
  "Pro - Masculino Master A2",
  "Pro - Masculino Master B1",
  "Pro - Masculino Master B2",
  "E-Bike",
];

export const tshirtSizes = ["PP", "P", "M", "G", "GG"];

export const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

export type Registration = {
  // mock_type
  id: number | null;
  name: string;
  cpf: string;
  route: "Amador" | "Light" | "Sport" | "Pro";
  category: string;
  shirtSize: string;
  date: string;
  status: "confirmed" | "pending";
  revenue: number;
};

export const MOCK_REGISTRATIONS: Registration[] = [
  {
    id: 1,
    name: "Anderson Foppa",
    cpf: "012.345.678-90",
    route: "Pro",
    category: "MTB Masculino",
    shirtSize: "G",
    date: "2026-06-12",
    status: "confirmed",
    revenue: 140,
  },
  {
    id: 2,
    name: "Juliana Bortolini",
    cpf: "123.456.789-01",
    route: "Sport",
    category: "MTB Feminino",
    shirtSize: "P",
    date: "2026-06-13",
    status: "confirmed",
    revenue: 140,
  },
  {
    id: 3,
    name: "Marcos Dallabrida",
    cpf: "234.567.890-12",
    route: "Light",
    category: "Master B (40-49)",
    shirtSize: "GG",
    date: "2026-06-15",
    status: "confirmed",
    revenue: 140,
  },
  {
    id: 4,
    name: "Fernanda Cerezer",
    cpf: "345.678.901-23",
    route: "Sport",
    category: "E-Bike",
    shirtSize: "M",
    date: "2026-06-18",
    status: "pending",
    revenue: 140,
  },
  {
    id: 5,
    name: "Rafael Menegat",
    cpf: "456.789.012-34",
    route: "Pro",
    category: "Sub-23",
    shirtSize: "M",
    date: "2026-06-19",
    status: "confirmed",
    revenue: 140,
  },
  {
    id: 6,
    name: "Camila Sartori",
    cpf: "567.890.123-45",
    route: "Light",
    category: "MTB Feminino",
    shirtSize: "P",
    date: "2026-06-21",
    status: "pending",
    revenue: 140,
  },
  {
    id: 7,
    name: "Gustavo Tonello",
    cpf: "678.901.234-56",
    route: "Sport",
    category: "Master A (30-39)",
    shirtSize: "GG",
    date: "2026-06-22",
    status: "confirmed",
    revenue: 140,
  },
  {
    id: 8,
    name: "Patrícia Lorenzoni",
    cpf: "789.012.345-67",
    route: "Pro",
    category: "MTB Feminino",
    shirtSize: "M",
    date: "2026-06-24",
    status: "pending",
    revenue: 140,
  },
  {
    id: 9,
    name: "Eduardo Panizzi",
    cpf: "890.123.456-78",
    route: "Amador",
    category: "Master C (50+)",
    shirtSize: "G",
    date: "2026-06-25",
    status: "confirmed",
    revenue: 140,
  },
  {
    id: 10,
    name: "Bruno Zanella",
    cpf: "901.234.567-89",
    route: "Sport",
    category: "MTB Masculino",
    shirtSize: "XGG",
    date: "2026-06-27",
    status: "pending",
    revenue: 140,
  },
];

export function routeName(title: Routes["title"]) {
  return ROUTES_EVENT.find((row) => row.title === title);
}
