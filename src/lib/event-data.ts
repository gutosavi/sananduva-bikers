import { Registration } from "@/features/registration/schemas/registration.schema";

export type Routes = {
  title: string;
  distance: string;
  elevation: string;
  level: string;
};

export type EventPrices = {
  registrationFee: number;
  extraLunchFee: number;
};

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

export interface CategoryOptions {
  id: string;
  label: string;
  gender: "Masculino" | "Feminino" | "Unissex";
  minAge?: number;
  maxAge?: number;
  route: "Light" | "Amador" | "Sport" | "Pro" | "Livre";
}

export const CATEGORIES_OPTIONS: CategoryOptions[] = [
  // Geral / Open
  {
    id: "cicloturismo",
    label: "Cicloturismo",
    gender: "Unissex",
    route: "Livre",
  },
  {
    id: "fem-amador",
    label: "Amador Feminino",
    gender: "Feminino",
    route: "Amador",
  },
  {
    id: "masc-amador",
    label: "Amador Masculino",
    gender: "Masculino",
    route: "Amador",
  },
  {
    id: "junior",
    label: "Junior (Unissex)",
    maxAge: 17,
    gender: "Unissex",
    route: "Sport",
  },
  {
    id: "pcd",
    label: "PCD: Pessoa com Deficiência",
    gender: "Unissex",
    route: "Sport",
  },
  {
    id: "nelore",
    label: "Masculino Nelore (100kg+)",
    gender: "Masculino",
    route: "Sport",
  },
  { id: "e-bike", label: "E-Bike (Unissex)", gender: "Unissex", route: "Pro" },

  // Sport - Feminino
  {
    id: "sport-fem-sub30",
    label: "Feminino Sub-30",
    gender: "Feminino",
    maxAge: 29,
    route: "Sport",
  },
  {
    id: "sport-fem-masterA",
    label: "Feminino Master A",
    gender: "Feminino",
    minAge: 30,
    maxAge: 39,
    route: "Sport",
  },
  {
    id: "sport-fem-masterB",
    label: "Feminino Master B",
    gender: "Feminino",
    minAge: 40,
    maxAge: 49,
    route: "Sport",
  },
  {
    id: "sport-fem-masterC",
    label: "Feminino Master C",
    gender: "Feminino",
    minAge: 50,
    route: "Sport",
  },

  // Sport - Masculino
  {
    id: "sport-masc-sub30",
    label: "Masculino Sub-30",
    gender: "Masculino",
    maxAge: 29,
    route: "Sport",
  },
  {
    id: "sport-masc-masterA",
    label: "Masculino Master A",
    gender: "Masculino",
    minAge: 30,
    maxAge: 39,
    route: "Sport",
  },
  {
    id: "sport-masc-masterB",
    label: "Masculino Master B",
    gender: "Masculino",
    minAge: 40,
    maxAge: 49,
    route: "Sport",
  },
  {
    id: "sport-masc-masterC1",
    label: "Masculino Master C1",
    gender: "Masculino",
    minAge: 50,
    maxAge: 54,
    route: "Sport",
  },
  {
    id: "sport-masc-masterC2",
    label: "Masculino Master C2",
    gender: "Masculino",
    minAge: 55,
    maxAge: 59,
    route: "Sport",
  },
  {
    id: "sport-masc-vet",
    label: "Masculino Veterano",
    gender: "Masculino",
    minAge: 60,
    route: "Sport",
  },

  // Pro Geral/Masculino
  {
    id: "pro-masc-elite",
    label: "Masculino Elite",
    gender: "Masculino",
    route: "Pro",
  },
  {
    id: "pro-fem-elite",
    label: "Feminino Elite",
    gender: "Feminino",
    route: "Pro",
  },
  {
    id: "pro-masc-sub30",
    label: "Masculino Sub-30",
    gender: "Masculino",
    maxAge: 29,
    route: "Pro",
  },
  {
    id: "pro-masc-masterA1",
    label: "Masculino Master A1",
    gender: "Masculino",
    minAge: 30,
    maxAge: 34,
    route: "Pro",
  },
  {
    id: "pro-masc-masterA2",
    label: "Masculino Master A2",
    gender: "Masculino",
    minAge: 35,
    maxAge: 39,
    route: "Pro",
  },
  {
    id: "pro-masc-masterB1",
    label: "Masculino Master B1",
    gender: "Masculino",
    minAge: 40,
    maxAge: 44,
    route: "Pro",
  },
  {
    id: "pro-masc-masterB2",
    label: "Masculino Master B2",
    gender: "Masculino",
    minAge: 45,
    maxAge: 49,
    route: "Pro",
  },
];

export const tshirtSizes = ["PP", "P", "M", "G", "GG"];

export const REGISTRATION_PRICES: EventPrices = {
  registrationFee: 100.0,
  extraLunchFee: 40.0,
};

export const MOCK_REGISTRATIONS: Registration[] = [
  {
    id: "reg-001",
    fullname: "Gustavo Savi",
    cpf: "123.456.789-09",
    birthDate: "1988-04-15",
    gender: "Masculino",
    email: "gustavo@example.com",
    phoneNumber: "(54) 99999-1234",
    cityState: "Sananduva - RS",
    emergencyContact: "Mariana Savi",
    emergencyPhone: "(54) 99999-5678",
    category: "Pro - Masculino Master B2",
    route: "Pro",
    tshirtSize: "G",
    team: "Sananduva Bikers",
    termsCheck: true,
    status: "pending",
    extraLunchQuantity: 2,
    revenue: 140.0,
  },
  {
    id: "reg-002",
    fullname: "Lucas Martins",
    cpf: "987.654.321-00",
    birthDate: "1995-08-22",
    gender: "Masculino",
    email: "lucas.martins@example.com",
    phoneNumber: "(54) 98888-2345",
    cityState: "Passo Fundo - RS",
    emergencyContact: "Ana Martins",
    emergencyPhone: "(54) 97777-3456",
    category: "Cicloturismo Amador",
    route: "Amador",
    tshirtSize: "M",
    team: "Pedal Forte",
    termsCheck: true,
    status: "confirmed",
    extraLunchQuantity: 1,
    revenue: 140.0,
  },
  {
    id: "reg-003",
    fullname: "Camila Oliveira",
    cpf: "456.789.123-00",
    birthDate: "1992-11-03",
    gender: "Feminino",
    email: "camila.oliveira@example.com",
    phoneNumber: "(54) 97777-4567",
    cityState: "Lagoa Vermelha - RS",
    emergencyContact: "Rafael Oliveira",
    emergencyPhone: "(54) 96666-5678",
    category: "Sport - Feminino Master C",
    route: "Sport",
    tshirtSize: "P",
    team: "Equipe Pedal RS",
    termsCheck: true,
    status: "pending",
    extraLunchQuantity: 0,
    revenue: 140.0,
  },
  {
    id: "reg-004",
    fullname: "Rafael Souza",
    cpf: "789.123.456-00",
    birthDate: "1985-02-17",
    gender: "Masculino",
    email: "rafael.souza@example.com",
    phoneNumber: "(54) 96666-7890",
    cityState: "Erechim - RS",
    emergencyContact: "Juliana Souza",
    emergencyPhone: "(54) 95555-6789",
    category: "Pro - Masculino Master B1",
    route: "Pro",
    tshirtSize: "GG",
    team: "",
    termsCheck: true,
    status: "confirmed",
    extraLunchQuantity: 1,
    revenue: 140.0,
  },
  {
    id: "reg-005",
    fullname: "Fernanda Costa",
    cpf: "321.654.987-00",
    birthDate: "1998-06-29",
    gender: "Feminino",
    email: "fernanda.costa@example.com",
    phoneNumber: "(54) 95555-8901",
    cityState: "Cacique Doble - RS",
    emergencyContact: "Marcos Costa",
    emergencyPhone: "(54) 94444-7890",
    category: "Cicloturismo Amador",
    route: "Amador",
    tshirtSize: "M",
    team: "",
    termsCheck: true,
    status: "pending",
    extraLunchQuantity: 0,
    revenue: 140,
  },
];

export function routeName(title: Routes["title"]) {
  return ROUTES_EVENT.find((row) => row.title === title);
}
