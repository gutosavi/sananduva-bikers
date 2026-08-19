import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Controller, useFormContext } from "react-hook-form";
import { RegistrationFormData } from "../schemas/registration.schema";

export function CheckboxSection() {
  const {
    control,
    formState: { errors },
  } = useFormContext<RegistrationFormData>();

  return (
    <FieldGroup className="max-w-2xl space-y-4 px-1">
      <Field orientation="horizontal">
        <Controller
          name="termsCheck"
          control={control}
          render={({ field }) => (
            <Checkbox
              id="termsCheck"
              name="termsCheck"
              checked={field.value}
              onCheckedChange={field.onChange}
              required
            />
          )}
        />

        <FieldContent>
          <FieldLabel htmlFor="termsCheck">
            Eu aceito os termos do regulamento
          </FieldLabel>
          <FieldDescription>
            Ao clicar neste item, você concorda com os termos do regulamento.
          </FieldDescription>
        </FieldContent>
      </Field>
      <FieldError
        errors={errors.termsCheck ? [errors.termsCheck] : undefined}
      />
    </FieldGroup>
  );
}
