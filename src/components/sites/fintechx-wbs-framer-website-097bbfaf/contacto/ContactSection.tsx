"use client";

import { Mail } from "lucide-react";
import Image from "next/image";
import { useActionState, useEffect, useId, useRef } from "react";
import { submitContact } from "@/app/contacto/actions";
import {
  CONTACT_INITIAL_STATE,
  CONTACT_TOPICS,
  MESSAGE_MAX,
  type ContactField,
} from "@/app/contacto/contact-form";
import {
  cunaAsset,
  fxAsset,
} from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/assets";
import { FxSubmitButton } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/FxSubmitButton";
import { useSectionReveal } from "@/components/sites/fintechx-wbs-framer-website-097bbfaf/shared/useSectionReveal";
import { cn } from "@/lib/utils";

/**
 * Channels that are live today. WhatsApp is intentionally absent: SITE_PLAN
 * open question 2 has not settled whether the app shares the Dra. Sánchez's
 * consulting-room line or gets its own, and a wrong number is worse than none.
 */
const CHANNELS = [
  {
    label: "Correo",
    value: "hola@cunaco.app",
    href: "mailto:hola@cunaco.app",
    /* No mail glyph shipped with the Framer asset set — the brand icons there
       are all social. Lucide covers it at the same 16px optical weight. */
    icon: null,
    external: false,
  },
  {
    label: "Instagram",
    value: "@drayasminpediatra",
    href: "https://www.instagram.com/drayasminpediatra",
    icon: fxAsset("o2TaY2EYkSR14NmiylM3v3i9wM.svg"),
    external: true,
  },
  {
    label: "Facebook",
    value: "@drayasminpediatra",
    href: "https://www.facebook.com/drayasminpediatra",
    icon: fxAsset("yapJfaMs4UJGW8x5avLvLiT0juU.svg"),
    external: true,
  },
] as const;

/**
 * One shared input skin. The focus ring is a 4px turquoise halo rather than the
 * UA outline so it reads as part of the brand while staying clearly visible —
 * the navbar pill uses the same 4px halo idea.
 */
const FIELD_BASE =
  "w-full rounded-[16px] border bg-white px-4 py-3 text-[16px] leading-[22px] font-medium text-[#1d6259] outline-none transition-[border-color,box-shadow] duration-200 ease-out placeholder:text-[#bfbfbf] focus-visible:border-cuna-teal focus-visible:ring-4 focus-visible:ring-cuna-teal/25";

const SELECT_CARET =
  "appearance-none bg-[length:12px_8px] bg-[position:right_16px_center] bg-no-repeat pr-11";

function fieldTone(hasError: boolean) {
  return hasError ? "border-[#e2585f]" : "border-[#e3dcd1]";
}

export function ContactSection() {
  const { ref, revealBase, revealState } = useSectionReveal<HTMLElement>(0.05);
  const [state, formAction, pending] = useActionState(
    submitContact,
    CONTACT_INITIAL_STATE,
  );

  const baseId = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  const fieldId = (name: ContactField) => `${baseId}-${name}`;
  const errorId = (name: ContactField) => `${baseId}-${name}-error`;

  // After a submit resolves, put the outcome where a screen reader and a
  // keyboard user both land next — the live region itself.
  useEffect(() => {
    if (state.status === "idle") return;
    statusRef.current?.focus();
    if (state.status === "success") formRef.current?.reset();
  }, [state]);

  return (
    <section
      ref={ref}
      id="contacto"
      className="flex w-full flex-col items-center pt-[124px] pb-[60px] lg:pt-[180px] lg:pb-[100px]"
    >
      <div className="w-full max-w-[1260px] px-[30px]">
        <div className="flex w-full flex-col gap-10 lg:flex-row lg:items-start xl:gap-[70px]">
          {/* ---------------------------------------------------- */}
          {/* Left — why write, and where else to find us          */}
          {/* ---------------------------------------------------- */}
          <div
            className={cn(
              "flex w-full flex-col items-start gap-8 lg:w-[420px] lg:shrink-0",
              revealBase,
              revealState,
            )}
          >
            <div className="flex flex-col items-start gap-[10px]">
              <div className="overflow-clip rounded-full bg-[#f7f3ed] px-5 py-[10px]">
                <span className="text-[14px] leading-[18.2px] font-medium text-[#1d6259]">
                  Contacto
                </span>
              </div>

              <h1 className="w-full text-[32px] leading-[38px] font-semibold tracking-[-1px] text-[#1d6259] md:text-[40px] md:leading-[48px] xl:text-[48px] xl:leading-[57.6px]">
                Escríbenos
              </h1>

              <p className="w-full text-[16px] leading-[22px] font-medium text-[#5e6968] xl:text-[18px] xl:leading-[26px]">
                Dudas sobre la app, sugerencias de funciones o propuestas de alianza.
                Respondemos al correo que dejes, en días laborables.
              </p>
            </div>

            <ul className="flex w-full flex-col gap-3">
              {CHANNELS.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    {...(channel.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="flex items-center gap-4 rounded-[20px] bg-[#f7f3ed] p-3 transition-colors duration-200 ease-out hover:bg-[#e8f8f6]"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white">
                      {channel.icon ? (
                        <Image
                          src={channel.icon}
                          alt=""
                          width={20}
                          height={20}
                          className="size-4"
                        />
                      ) : (
                        <Mail aria-hidden className="size-4 text-[#1d6259]" strokeWidth={2.2} />
                      )}
                    </span>
                    <span className="flex flex-col">
                      <span className="text-[14px] leading-[18.2px] font-medium text-[#878787]">
                        {channel.label}
                      </span>
                      <span className="text-[16px] leading-[20.8px] font-semibold text-[#1d6259]">
                        {channel.value}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            {/* The one thing a maternity app has to say on its contact page. */}
            <p className="w-full rounded-[20px] bg-[#fff6de] p-5 text-[15px] leading-[22px] font-medium text-[#1d6259]">
              Esto no es un canal de urgencias. Si tu bebé necesita atención ahora,
              llama a tu pediatra o acude a emergencias.
            </p>
          </div>

          {/* ---------------------------------------------------- */}
          {/* Right — the form                                     */}
          {/* ---------------------------------------------------- */}
          <div
            className={cn(
              "w-full rounded-[24px] bg-white p-6 delay-100 md:rounded-[30px] md:p-10 lg:flex-1 xl:p-[50px]",
              revealBase,
              revealState,
            )}
          >
            <div
              ref={statusRef}
              tabIndex={-1}
              role="status"
              aria-live="polite"
              className="outline-none"
            >
              {state.status === "success" ? (
                <div className="mb-8 flex flex-col items-start gap-5">
                  <Image
                    src={cunaAsset("mascota_ok.webp")}
                    alt=""
                    width={360}
                    height={360}
                    className="w-[96px]"
                  />
                  <div className="flex flex-col gap-2">
                    <h2 className="text-[24px] leading-[30px] font-semibold text-[#1d6259]">
                      Mensaje recibido
                    </h2>
                    <p className="text-[16px] leading-[22px] font-medium text-[#5e6968]">
                      Te respondemos al correo que dejaste. Si necesitas algo antes,
                      escríbenos a hola@cunaco.app.
                    </p>
                  </div>
                </div>
              ) : (
                state.errors.form && (
                  <p className="mb-5 rounded-[16px] bg-[#e2585f0d] p-4 text-[15px] leading-[21px] font-medium text-[#e2585f]">
                    {state.errors.form}
                  </p>
                )
              )}
            </div>

            <form ref={formRef} action={formAction} noValidate className="flex flex-col gap-5">
              {/* Nombre */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor={fieldId("nombre")}
                  className="text-[15px] leading-[20px] font-semibold text-[#1d6259]"
                >
                  Nombre
                </label>
                <input
                  id={fieldId("nombre")}
                  name="nombre"
                  type="text"
                  autoComplete="name"
                  defaultValue={state.values.nombre}
                  aria-invalid={state.errors.nombre ? true : undefined}
                  aria-describedby={state.errors.nombre ? errorId("nombre") : undefined}
                  placeholder="Cómo te llamamos"
                  className={cn(FIELD_BASE, fieldTone(Boolean(state.errors.nombre)))}
                />
                {state.errors.nombre && (
                  <p
                    id={errorId("nombre")}
                    className="text-[14px] leading-[19px] font-medium text-[#e2585f]"
                  >
                    {state.errors.nombre}
                  </p>
                )}
              </div>

              {/* Correo */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor={fieldId("email")}
                  className="text-[15px] leading-[20px] font-semibold text-[#1d6259]"
                >
                  Correo
                </label>
                <input
                  id={fieldId("email")}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  defaultValue={state.values.email}
                  aria-invalid={state.errors.email ? true : undefined}
                  aria-describedby={state.errors.email ? errorId("email") : undefined}
                  placeholder="tucorreo@ejemplo.com"
                  className={cn(FIELD_BASE, fieldTone(Boolean(state.errors.email)))}
                />
                {state.errors.email && (
                  <p
                    id={errorId("email")}
                    className="text-[14px] leading-[19px] font-medium text-[#e2585f]"
                  >
                    {state.errors.email}
                  </p>
                )}
              </div>

              {/* Motivo */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor={fieldId("motivo")}
                  className="text-[15px] leading-[20px] font-semibold text-[#1d6259]"
                >
                  Motivo
                </label>
                <select
                  id={fieldId("motivo")}
                  name="motivo"
                  defaultValue={state.values.motivo}
                  aria-invalid={state.errors.motivo ? true : undefined}
                  aria-describedby={state.errors.motivo ? errorId("motivo") : undefined}
                  className={cn(
                    FIELD_BASE,
                    fieldTone(Boolean(state.errors.motivo)),
                    SELECT_CARET,
                  )}
                  style={{
                    backgroundImage:
                      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8' fill='none'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%231d6259' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E\")",
                  }}
                >
                  {CONTACT_TOPICS.map((topic) => (
                    <option key={topic.value} value={topic.value}>
                      {topic.label}
                    </option>
                  ))}
                </select>
                {state.errors.motivo && (
                  <p
                    id={errorId("motivo")}
                    className="text-[14px] leading-[19px] font-medium text-[#e2585f]"
                  >
                    {state.errors.motivo}
                  </p>
                )}
              </div>

              {/* Mensaje */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor={fieldId("mensaje")}
                  className="text-[15px] leading-[20px] font-semibold text-[#1d6259]"
                >
                  Mensaje
                </label>
                <textarea
                  id={fieldId("mensaje")}
                  name="mensaje"
                  rows={5}
                  maxLength={MESSAGE_MAX}
                  defaultValue={state.values.mensaje}
                  aria-invalid={state.errors.mensaje ? true : undefined}
                  aria-describedby={state.errors.mensaje ? errorId("mensaje") : undefined}
                  placeholder="Cuéntanos qué necesitas"
                  className={cn(
                    FIELD_BASE,
                    fieldTone(Boolean(state.errors.mensaje)),
                    "resize-y",
                  )}
                />
                {state.errors.mensaje && (
                  <p
                    id={errorId("mensaje")}
                    className="text-[14px] leading-[19px] font-medium text-[#e2585f]"
                  >
                    {state.errors.mensaje}
                  </p>
                )}
              </div>

              <div className="flex flex-col items-start gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                <FxSubmitButton
                  pending={pending}
                  pendingLabel="Enviando…"
                  className="max-sm:w-full max-sm:[&>span]:w-full"
                >
                  {state.status === "success" ? "Enviar otro mensaje" : "Enviar mensaje"}
                </FxSubmitButton>

                <p className="text-[14px] leading-[19px] font-medium text-[#878787]">
                  Usamos tu correo solo para responderte.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
