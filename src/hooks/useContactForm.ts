import { useCallback, useState, type FormEvent } from 'react'
import { submitContactEmail } from '../lib/contact-email'
import { isValidColombianPhone } from '../lib/phone'
import { FORM_ERROR_MESSAGE, FORM_SUCCESS_MESSAGE } from '../data/contact'

export interface ContactFormFields {
  name: string
  email: string
  phone: string
  message: string
}

export interface ContactFormErrors {
  name?: string
  email?: string
  phone?: string
  message?: string
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const EMPTY_FIELDS: ContactFormFields = {
  name: '',
  email: '',
  phone: '',
  message: '',
}

function validateFields(fields: ContactFormFields): ContactFormErrors {
  const errors: ContactFormErrors = {}
  const name = fields.name.trim()
  const email = fields.email.trim()

  if (name.length < 2) {
    errors.name = 'Escribe tu nombre (mínimo 2 caracteres).'
  }

  if (email.length > 0 && !EMAIL_PATTERN.test(email)) {
    errors.email = 'Ingresa un correo electrónico válido.'
  }

  if (!fields.phone.trim()) {
    errors.phone = 'Ingresa un número de teléfono válido (ej. 310 750 6153).'
  } else if (!isValidColombianPhone(fields.phone)) {
    errors.phone = 'Ingresa un número de teléfono válido (ej. 310 750 6153).'
  }

  if (fields.message.trim().length < 10) {
    errors.message = 'Cuéntame un poco más (mínimo 10 caracteres).'
  }

  return errors
}

export function useContactForm() {
  const [fields, setFields] = useState<ContactFormFields>(EMPTY_FIELDS)
  const [errors, setErrors] = useState<ContactFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const updateField = useCallback(
    (field: keyof ContactFormFields, value: string) => {
      setFields((prev) => ({ ...prev, [field]: value }))
      setErrors((prev) => ({ ...prev, [field]: undefined }))
      setSuccessMessage(null)
      setErrorMessage(null)
    },
    [],
  )

  const handleSubmit = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setSuccessMessage(null)
      setErrorMessage(null)

      const nextErrors = validateFields(fields)
      if (Object.keys(nextErrors).length > 0) {
        setErrors(nextErrors)
        return
      }

      setIsSubmitting(true)
      setErrors({})

      const result = await submitContactEmail(fields)

      if (result.ok) {
        setFields(EMPTY_FIELDS)
        setSuccessMessage(FORM_SUCCESS_MESSAGE)
      } else {
        setErrorMessage(result.error ?? FORM_ERROR_MESSAGE)
      }

      setIsSubmitting(false)
    },
    [fields],
  )

  return {
    fields,
    errors,
    isSubmitting,
    successMessage,
    errorMessage,
    updateField,
    handleSubmit,
  }
}
