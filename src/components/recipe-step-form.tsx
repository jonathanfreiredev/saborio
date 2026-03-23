import { Controller } from "react-hook-form";
import { Field, FieldError, FieldGroup, FieldLabel } from "./ui/field";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

interface RecipeStepFormProps {
  index: number;
  fieldId: string;
  control: any;
}

export function RecipeStepForm({
  index,
  fieldId,
  control,
}: RecipeStepFormProps) {
  return (
    <FieldGroup key={fieldId} className="flex w-full flex-col gap-4 px-6 py-2">
      <FieldGroup className="flex w-full flex-row items-center">
        <Controller
          name={`steps.${index}.description`}
          control={control}
          render={({ field: controllerField, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`steps.${index}.description`}>
                Description
              </FieldLabel>
              <Textarea
                {...controllerField}
                id={`steps.${index}.description`}
                aria-invalid={fieldState.invalid}
                placeholder="Step description"
                required
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </FieldGroup>
  );
}
