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

export const ROUTES_EVENT = [
  {
    title: "Light",
    distance: "15,2 km",
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
