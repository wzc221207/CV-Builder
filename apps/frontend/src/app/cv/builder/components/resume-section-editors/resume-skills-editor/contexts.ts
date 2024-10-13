import { createContext } from "react";
import { type useSkillsReturnType } from "./hooks";

export type SkillsContextType = useSkillsReturnType;

export const SkillsContext = createContext<SkillsContextType | null>(null);
