import "server-only";
import { methodSkills, methodSteps, researcherProgram } from "@/data/program";
import type { Program } from "@/types";

const programs: Program[] = [researcherProgram];

export async function getPrograms(): Promise<Program[]> {
  return programs;
}

export async function getProgram(slug: string): Promise<Program | undefined> {
  return programs.find((p) => p.slug === slug);
}

export async function getMethodology() {
  return { steps: methodSteps, skills: methodSkills };
}
