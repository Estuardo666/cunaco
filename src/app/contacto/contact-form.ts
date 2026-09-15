/**
 * Shared contract for the `/contacto` form.
 *
 * Kept out of `actions.ts` because a `"use server"` module may only export
 * async functions — constants and types have to live next door.
 */

/** Reasons a visitor can pick; the value is what gets stored, the label is UI. */
export const CONTACT_TOPICS = [
  { value: "soporte", label: "Ayuda con la app" },
  { value: "salud", label: "Duda sobre una función de salud" },
  { value: "alianzas", label: "Alianzas y prensa" },
  { value: "otro", label: "Otro" },
] as const;

export type ContactTopic = (typeof CONTACT_TOPICS)[number]["value"];

export type ContactField = "nombre" | "email" | "motivo" | "mensaje";

export interface ContactFormState {
  status: "idle" | "success" | "error";
  /** Per-field messages, keyed by input name, so each error renders next to its field. */
  errors: Partial<Record<ContactField | "form", string>>;
  /** Values echoed back so a rejected submit never wipes what the visitor typed. */
  values: Record<ContactField, string>;
}

export const CONTACT_INITIAL_STATE: ContactFormState = {
  status: "idle",
  errors: {},
  values: { nombre: "", email: "", motivo: "soporte", mensaje: "" },
};

export const MESSAGE_MIN = 10;
export const MESSAGE_MAX = 2000;
