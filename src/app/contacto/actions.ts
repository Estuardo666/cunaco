"use server";

import {
  CONTACT_INITIAL_STATE,
  CONTACT_TOPICS,
  MESSAGE_MAX,
  MESSAGE_MIN,
  type ContactFormState,
} from "./contact-form";

/** Deliberately permissive: it rejects typos, not unusual-but-valid addresses. */
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Handles a `/contacto` submission.
 *
 * SITE_PLAN Fase 3 has this writing to Postgres through Prisma. Neither is
 * installed in this repo yet, so the action validates the submission and emits
 * it as one structured server log line — recoverable from `vercel logs`, and a
 * single call away from becoming `prisma.contactMessage.create()`. Nothing here
 * tells the visitor their message was stored in a database, only that it was
 * received.
 */
export async function submitContact(
  _previous: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const values = {
    nombre: String(formData.get("nombre") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    motivo: String(formData.get("motivo") ?? "soporte"),
    mensaje: String(formData.get("mensaje") ?? "").trim(),
  };

  const errors: ContactFormState["errors"] = {};

  if (values.nombre.length < 2) {
    errors.nombre = "Escribe tu nombre para saber cómo dirigirnos a ti.";
  }

  if (!EMAIL.test(values.email)) {
    errors.email = "Revisa el correo: ahí te respondemos.";
  }

  if (!CONTACT_TOPICS.some((topic) => topic.value === values.motivo)) {
    errors.motivo = "Elige un motivo de la lista.";
  }

  if (values.mensaje.length < MESSAGE_MIN) {
    errors.mensaje = `Cuéntanos un poco más: al menos ${MESSAGE_MIN} caracteres.`;
  } else if (values.mensaje.length > MESSAGE_MAX) {
    errors.mensaje = `El mensaje pasa de ${MESSAGE_MAX} caracteres. Resúmelo y te escribimos para el resto.`;
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors, values };
  }

  console.info(
    "[contacto] nuevo mensaje",
    JSON.stringify({ ...values, recibidoEn: new Date().toISOString() }),
  );

  return { status: "success", errors: {}, values: CONTACT_INITIAL_STATE.values };
}
