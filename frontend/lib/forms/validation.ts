export type FieldErrors<T extends string> = Partial<Record<T, string>>

export type ContactFields =
  | 'name'
  | 'email'
  | 'phone'
  | 'preferredMonth'
  | 'message'
  | 'form'

export type ContactValidationInput = {
  name: string
  email: string
  phone: string
  preferredMonth: string
  message: string
  honeypot: string
  elapsedMs: number
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_SUBMISSION_MS = 1200

function bounded(value: string, min: number, max: number) {
  const length = value.trim().length
  return length >= min && length <= max
}

export function validateContactInquiry(input: ContactValidationInput) {
  const errors: FieldErrors<ContactFields> = {}

  if (input.honeypot.trim()) {
    errors.form = 'We could not send this inquiry. Please try again.'
  }

  if (input.elapsedMs < MIN_SUBMISSION_MS) {
    errors.form = 'Please review your inquiry before sending.'
  }

  if (!bounded(input.name, 2, 80)) {
    errors.name = 'Enter your name, using 2 to 80 characters.'
  }

  if (!bounded(input.email, 5, 120) || !EMAIL_PATTERN.test(input.email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  if (input.phone.trim().length > 40) {
    errors.phone = 'Phone number must be 40 characters or fewer.'
  }

  if (input.preferredMonth.trim().length > 80) {
    errors.preferredMonth = 'Preferred month must be 80 characters or fewer.'
  }

  return {
    success: Object.keys(errors).length === 0,
    errors,
  }
}

export function validateNewsletterEmail(email: string, honeypot = '', elapsedMs = MIN_SUBMISSION_MS) {
  const errors: FieldErrors<'email' | 'form'> = {}

  if (honeypot.trim()) {
    errors.form = 'We could not process this subscription. Please try again.'
  }

  if (elapsedMs < MIN_SUBMISSION_MS) {
    errors.form = 'Please try again in a moment.'
  }

  if (!bounded(email, 5, 120) || !EMAIL_PATTERN.test(email.trim())) {
    errors.email = 'Enter a valid email address.'
  }

  return {
    success: Object.keys(errors).length === 0,
    errors,
  }
}
