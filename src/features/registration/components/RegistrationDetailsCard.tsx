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
import { CATEGORIES, ROUTES_EVENT } from "@/lib/event-data";

const tshirtSizes = ["PP", "P", "M", "G", "GG"];

export function RegistrationDetailsCard() {
  return (
    <Card className="glass border-white/10 hover:glow-orange">
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
              id="team"
              name="team"
              autoComplete="team"
              type="text"
              placeholder="Opcional"
              required
            />
          </Field>

          <Field>
            <Label htmlFor="tshirtSize">Tamanho da camisa</Label>

            <Select>
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
          </Field>

          <Field>
            <Label htmlFor="routes">Percurso</Label>

            <Select>
              <SelectTrigger id="routes">
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
          </Field>

          <Field>
            <Label htmlFor="categories">Categoria</Label>

            <Select>
              <SelectTrigger id="categories">
                <SelectValue placeholder="Selecione a categoria" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {CATEGORIES.map((item) => (
                    <SelectItem key={item} value={item}>
                      {item} - {item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </Field>
        </div>
      </CardContent>
    </Card>
  );
}
