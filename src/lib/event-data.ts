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

export const tshirtSizes = ["PP", "P", "M", "G", "GG"];

export const REGISTRATION_PRICES: EventPrices = {
  registrationFee: 100.0,
  extraLunchFee: 40.0,
};

export const BRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

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
