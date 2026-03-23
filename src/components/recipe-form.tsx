"use client";
import { Controller } from "react-hook-form";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "./ui/field";
import { Input } from "./ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "./ui/input-group";

interface RecipeFormProps {
  control: any;
}

export function RecipeForm({ control }: RecipeFormProps) {
  return (
    <FieldSet className="mb-5 w-full">
      <FieldGroup className="w-full">
        <Controller
          name="title"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input
                {...field}
                id="title"
                type="text"
                placeholder="Delicious Pancakes"
                required
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="description">Description</FieldLabel>
              <Input
                {...field}
                id="description"
                type="text"
                placeholder="Fluffy pancakes made with love"
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="defaultServings"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="defaultServings">
                Default Servings
              </FieldLabel>
              <InputGroup>
                <InputGroupInput
                  {...field}
                  id="defaultServings"
                  type="number"
                  min={0}
                  step={1}
                  placeholder="10"
                  onChange={(e) => {
                    field.onChange(e.target.valueAsNumber);
                  }}
                />
              </InputGroup>

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <FieldSeparator />

        <FieldSet>
          <FieldLegend>Time Information</FieldLegend>
          <FieldDescription>
            Enter the preparation, cooking, and resting times for the recipe.
            This will help users plan their cooking accordingly.
          </FieldDescription>

          <Controller
            name="preparationTime"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="preparationTime">Preparation</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="preparationTime"
                    type="number"
                    min={0}
                    step={1}
                    placeholder="10"
                    onChange={(e) => {
                      field.onChange(e.target.valueAsNumber);
                    }}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>min</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="cookingTime"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="cookingTime">Cooking</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="cookingTime"
                    type="number"
                    min={0}
                    step={1}
                    placeholder="20"
                    onChange={(e) => {
                      field.onChange(e.target.valueAsNumber);
                    }}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>min</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="restingTime"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="restingTime">Resting</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="restingTime"
                    type="number"
                    min={0}
                    step={1}
                    placeholder="5"
                    onChange={(e) => {
                      field.onChange(e.target.valueAsNumber);
                    }}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>min</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldSet>

        <FieldSeparator />

        <FieldSet>
          <FieldLegend>Nutritional Information</FieldLegend>
          <FieldDescription>
            Enter the nutritional information for the recipe. This will help
            users understand the nutritional content of the dish.
          </FieldDescription>
          <Controller
            name="calories"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="calories">Calories</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="calories"
                    type="number"
                    step={1}
                    min={0}
                    placeholder="500"
                    onChange={(e) => {
                      field.onChange(e.target.valueAsNumber);
                    }}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>kcal</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="carbohydrates"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="carbohydrates">Carbohydrates</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="carbohydrates"
                    type="number"
                    min={0}
                    step={1}
                    placeholder="50"
                    onChange={(e) => {
                      field.onChange(e.target.valueAsNumber);
                    }}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>grams</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="protein"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="protein">Protein</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="protein"
                    type="number"
                    min={0}
                    step={1}
                    placeholder="20"
                    onChange={(e) => {
                      field.onChange(e.target.valueAsNumber);
                    }}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>grams</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="fat"
            control={control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="fat">Fat</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    {...field}
                    id="fat"
                    type="number"
                    min={0}
                    step={1}
                    placeholder="10"
                    onChange={(e) => {
                      field.onChange(e.target.valueAsNumber);
                    }}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupText>grams</InputGroupText>
                  </InputGroupAddon>
                </InputGroup>

                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldSet>
      </FieldGroup>
    </FieldSet>
  );
}
