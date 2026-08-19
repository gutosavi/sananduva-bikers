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
import { Controller, useFormContext } from "react-hook-form";

const optionsGender = [
  { label: "Feminino", value: "Feminino" },
  { label: "Masculino", value: "Masculino" },
  { label: "Outro", value: "Outro" },
  { label: "Prefiro não informar", value: "Prefiro não informar" },
];

export function ParticipantDetailsCard() {
  const { register, control } = useFormContext();

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
              {...register("fullname")}
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
              {...register("cpf")}
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
              {...register("birthDate")}
              name="birthDate"
              type="date"
              placeholder="dd/mm/aaaa"
              autoComplete="bday"
              required
            />
          </Field>

          <Field>
            <Label htmlFor="gender">Gênero</Label>
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
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
              )}
            />
          </Field>

          <Field>
            <Label htmlFor="cityState">Cidade / Estado</Label>
            <Input
              {...register("cityState")}
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
              {...register("emergencyContact")}
              name="emergencyContact"
              type="text"
              placeholder="Nome do contato"
              required
            />
          </Field>

          <Field>
            <Label htmlFor="emergencyPhone">Telefone de emergência</Label>
            <Input
              {...register("emergencyPhone")}
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
