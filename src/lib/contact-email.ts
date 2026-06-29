import { normalizePhone } from './phone'

export interface ContactEmailFields {
  name: string
  email: string
  phone: string
  message: string
}

export type ContactEmailResult =
  | { ok: true }
  | { ok: false; error: string }

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

export async function submitContactEmail(
  fields: ContactEmailFields,
): Promise<ContactEmailResult> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

  if (!accessKey) {
    return {
      ok: false,
      error: 'El formulario no está configurado. Contacta al administrador del sitio.',
    }
  }

  try {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: fields.name.trim(),
        email: fields.email.trim(),
        phone: normalizePhone(fields.phone),
        message: [
          fields.message.trim(),
          '',
          `Teléfono: ${fields.phone.trim()}`,
          fields.email.trim() ? `Correo: ${fields.email.trim()}` : null,
        ]
          .filter(Boolean)
          .join('\n'),
        subject: 'Nuevo mensaje — Rayito de Sol',
        from_name: 'Rayito de Sol (web)',
        botcheck: '',
      }),
    })

    const result = (await response.json()) as { success?: boolean; message?: string }

    if (!response.ok || !result.success) {
      return {
        ok: false,
        error: result.message ?? 'No pudimos enviar tu mensaje. Intenta de nuevo.',
      }
    }

    return { ok: true }
  } catch {
    return {
      ok: false,
      error: 'Error de conexión. Revisa tu internet e intenta de nuevo.',
    }
  }
}
