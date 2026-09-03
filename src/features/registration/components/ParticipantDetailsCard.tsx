import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldError } from "@/components/ui/field";
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
import { extraLunchQuantity, optionsGender } from "../constants";
import { RegistrationFormData } from "../schemas/registration.schema";

export function ParticipantDetailsCard() {
  /* Card - Etapa 1 */
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<RegistrationFormData>();

  return (
    <Card className="glass border-white/10">
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
            />
            <FieldError errors={[errors.fullname]} />
          </Field>

          <Field>
            <Label htmlFor="CPF">CPF</Label>
            <Input
              {...register("cpf")}
              name="cpf"
              type="text"
              inputMode="numeric"
              placeholder="000.000.000-00"
            />
            <FieldError errors={[errors.cpf]} />
          </Field>

          <Field>
            <Label htmlFor="birthDate">Data de nascimento</Label>
            <Input
              {...register("birthDate")}
              name="birthDate"
              type="date"
              placeholder="dd/mm/aaaa"
              autoComplete="bday"
            />
            <FieldError errors={[errors.birthDate]} />
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
            <FieldError errors={[errors.gender]} />
          </Field>

          <Field>
            <Label htmlFor="email">E-mail</Label>
            <Input
              {...register("email")}
              name="email"
              type="email"
              placeholder="exemplo@exemplo.com.br"
              autoComplete="email"
            />
            <FieldError errors={[errors.email]} />
          </Field>

          <Field>
            <Label htmlFor="phoneNumber">Telefone</Label>
            <Input
              {...register("phoneNumber")}
              name="phoneNumber"
              type="text"
              placeholder="(54) 99999-9999"
            />
            <FieldError errors={[errors.phoneNumber]} />
          </Field>

          <Field>
            <Label htmlFor="cityState">Cidade / Estado</Label>
            <Input
              {...register("cityState")}
              name="cityState"
              type="text"
              placeholder="Sananduva - RS"
              autoComplete="address-level2"
            />
            <FieldError errors={[errors.cityState]} />
          </Field>

          <Field>
            <Label htmlFor="emergencyContact">Contato de Emergência</Label>
            <Input
              {...register("emergencyContact")}
              name="emergencyContact"
              type="text"
              placeholder="Nome do contato"
            />
            <FieldError errors={[errors.emergencyContact]} />
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
            />
            <FieldError errors={[errors.emergencyPhone]} />
          </Field>

          <Field>
            <Label htmlFor="extraLunchQuantity">Almoço Extra</Label>
            <Controller
              name="extraLunchQuantity"
              control={control}
              render={({ field }) => (
                <Select
                  value={
                    field.value !== undefined ? String(field.value) : undefined
                  }
                  onValueChange={(val) => {
                    field.onChange(val === null ? undefined : Number(val));
                  }}
                >
                  <SelectTrigger id="extraLunchQuantity">
                    <SelectValue placeholder="Selecione a quantidade" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {extraLunchQuantity.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
          </Field>
        </div>
      </CardContent>
    </Card>
  );
}
