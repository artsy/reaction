import { reduce } from "lodash"

// Object.assign() because spread operators are not supported on generic types at the moment:
// https://stackoverflow.com/questions/45384697/why-does-typescript-complain-that-an-object-must-be-an-object-in-spread-types
export const requiredFields: <
  T extends { [propName: string]: string },
  K extends keyof T,
  E extends Partial<T>
>(
  fields: K[],
  values: T,
  startingErrors?: E
) => E = (fields, values, startingErrors = {} as any) => {
  return reduce(
    fields,
    (acc, fieldName) => {
      return values[fieldName].length
        ? acc
        : Object.assign({}, acc, { [fieldName]: "Required" })
    },
    startingErrors
  )
}
