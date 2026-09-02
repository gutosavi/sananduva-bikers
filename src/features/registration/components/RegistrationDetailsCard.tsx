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
import {
  CATEGORIES_OPTIONS,
  ROUTES_EVENT,
  tshirtSizes,
} from "@/lib/event-data";
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
    if (!birthDate || !gender) return [];

    const userAge = calculateAge(birthDate);

    const matchGender =
      !cat.gender || cat.gender === "Unissex" || cat.gender === gender;

    const minAge = cat.minAge ?? 0;
    const maxAge = cat.maxAge ?? 150;
    const matchAge = userAge >= minAge && userAge <= maxAge;

    return matchAge && matchGender;
  });

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
          <Field>
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
            <Label htmlFor="route">Percurso</Label>

            <Controller
              name="route"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="route">
                    <SelectValue placeholder="Selecione o percurso" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectGroup>
                      {ROUTES_EVENT.map((item) => (
                        <SelectItem key={item.title} value={item.title}>
                          {item.title} - {item.distance}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[errors.route]} />
          </Field>

          <Field>
            <Label htmlFor="category">Categoria</Label>

            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Selecione a categoria" />
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
