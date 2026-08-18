import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const optionsGender = [
  { label: "Feminino", value: "Feminino" },
  { label: "Masculino", value: "Masculino" },
  { label: "Outro", value: "Outro" },
  { label: "Prefiro não informar", value: "Prefiro não informar" },
];

export function ParticipantDetailsCard() {
  return (
    <Card className="glass border-white/10 hover:glow-orange">
      <CardHeader className="px-6 pt-6">
        <CardDescription className="mt-1 text-sm font-bold uppercase text-muted-foreground">
          Etapa 1
        </CardDescription>

        <CardTitle className="font-display text-2xl font-extrabold">
          Dados do participante
        </CardTitle>
      </CardHeader>

      <CardContent className="px-6 pt-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field className="md:col-span-2">
            <Label htmlFor="fullname">Nome Completo</Label>
            <Input
              id="fullname"
              name="fullname"
              autoComplete="name"
              type="text"
              placeholder="Nome Completo"
              required
            />
          </Field>

          <Field>
            <Label htmlFor="CPF">CPF</Label>
            <Input
              id="cpf"
              name="cpf"
              type="text"
              inputMode="numeric"
              placeholder="000.000.000-00"
              required
            />
          </Field>

          <Field>
            <Label htmlFor="birthDate">Data de nascimento</Label>
            <Input
              id="birthDate"
              name="birthDate"
              type="date"
              placeholder="dd/mm/aaaa"
              autoComplete="bday"
              required
            />
          </Field>

          <Field>
            <Label htmlFor="gender">Gênero</Label>

            <Select>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Selecione seu gênero" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {optionsGender.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>

          <Field>
            <Label htmlFor="cityState">Cidade / Estado</Label>
            <Input
              id="cityState"
              name="cityState"
              type="text"
              placeholder="Sananduva - RS"
              autoComplete="address-level2"
              required
            />
          </Field>

          <Field>
            <Label htmlFor="emergencyContact">Contato de Emergência</Label>
            <Input
              id="emergencyContact"
              name="emergencyContact"
              type="text"
              placeholder="Nome do contato"
              required
            />
          </Field>

          <Field>
            <Label htmlFor="emergencyPhone">Telefone de emergência</Label>
            <Input
              id="emergencyPhone"
              name="emergencyPhone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              placeholder="(54) 99999-9999"
              required
            />
          </Field>
        </div>
      </CardContent>
    </Card>
  );
}
