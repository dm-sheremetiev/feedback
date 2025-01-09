import classNames from "classnames";
import { overrideTailwindClasses } from "tailwind-override";

export const cn = (...args: classNames.ArgumentArray) =>
  overrideTailwindClasses(classNames(...args));
