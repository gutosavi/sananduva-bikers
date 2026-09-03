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
import { tshirtSizes } from "@/features/registration/constants";
import { CATEGORIES_OPTIONS } from "@/lib/event-data";
import { calculateAge } from "@/lib/utils";
import { Controller, useFormContext } from "react-hook-form";
import { RegistrationFormData } from "../schemas/registration.schema";

export function RegistrationDetailsCard({
  birthDate,
  gender,
}: Partial<RegistrationFormData>) {
  /* Card - Etapa 2 */
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext<RegistrationFormData>();

  const availableCategories = CATEGORIES_OPTIONS.filter((cat) => {
    if (!birthDate || !gender) return false;

    const userAge = calculateAge(birthDate);

    const matchGender =
      !cat.gender || cat.gender === "Unissex" || cat.gender === gender;

    const minAge = cat.minAge ?? 0;
    const maxAge = cat.maxAge ?? 150;
    const matchAge = userAge >= minAge && userAge <= maxAge;

    return matchAge && matchGender;
  });

  const isProfileIncomplete = !birthDate || !gender;

  return (
    <Card className="glass border-white/10">
      <CardHeader className="px-6 pt-6">
        <CardDescription className="mt-1 text-sm font-bold uppercase text-muted-foreground">
          Etapa 2
        </CardDescription>

        <CardTitle className="font-display text-2xl font-extrabold">
          Informações de Categoria
        </CardTitle>
      </CardHeader>

      <CardContent className="px-6 pt-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Field className="md:col-span-2">
            <Label htmlFor="team">Equipe / Grupo</Label>
            <Input
              {...register("team")}
              name="team"
              autoComplete="team"
              type="text"
              placeholder="Opcional"
            />
          </Field>

          <Field>
            <Label htmlFor="tshirtSize">Tamanho da camisa</Label>

            <Controller
              name="tshirtSize"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="tshirtSize">
                    <SelectValue placeholder="Selecione o tamanho" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {tshirtSizes.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />

            <FieldError errors={[errors.tshirtSize]} />
          </Field>

          <Field>
            <Label htmlFor="category">Categoria</Label>

            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  disabled={isProfileIncomplete}
                  value={field.value ?? null}
                  onValueChange={(val) => {
                    console.log("Categoria selecionada:", val);
                    field.onChange(val || "");
                  }}
                >
                  <SelectTrigger id="category">
                    <SelectValue
                      placeholder={
                        isProfileIncomplete
                          ? "Requer idade e gênero"
                          : "Selecione uma categoria"
                      }
                    />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {availableCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[errors.category]} />
          </Field>
        </div>
      </CardContent>
    </Card>
  );
}
