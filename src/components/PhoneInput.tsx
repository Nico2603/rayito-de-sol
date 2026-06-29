import { ChevronDown } from 'lucide-react'
import { getPhoneCountry, phoneCountries } from '../data/phone-countries'
import { digitsOnly } from '../lib/phone'

interface PhoneInputProps {
  id: string
  countryId: string
  value: string
  onCountryChange: (countryId: string) => void
  onChange: (nationalDigits: string) => void
  error?: string
  label: string
}

const fieldStyle = {
  backgroundColor: 'var(--color-bg-primary)',
  borderColor: 'var(--color-border-light)',
  color: 'var(--color-text-primary)',
} as const

export default function PhoneInput({
  id,
  countryId,
  value,
  onCountryChange,
  onChange,
  error,
  label,
}: PhoneInputProps) {
  const country = getPhoneCountry(countryId)
  const nationalDigits = digitsOnly(value)
  const displayValue = country.formatNational(nationalDigits)
  const selectId = `${id}-country`

  const handleCountryChange = (nextCountryId: string) => {
    onCountryChange(nextCountryId)
    const nextCountry = getPhoneCountry(nextCountryId)
    onChange(digitsOnly(value).slice(0, nextCountry.maxDigits))
  }

  const handleNumberChange = (raw: string) => {
    onChange(digitsOnly(raw).slice(0, country.maxDigits))
  }

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium mb-1.5"
        style={{ color: 'var(--color-text-primary)' }}
      >
        {label}
      </label>
      <div
        className="group/phone flex gap-2 rounded-xl focus-within:ring-2 focus-within:ring-sky-cerulean/10"
        style={
          error
            ? { boxShadow: '0 0 0 1px #DC2626' }
            : undefined
        }
      >
        <div className="relative shrink-0">
          <label htmlFor={selectId} className="absolute w-px h-px p-0 -m-px overflow-hidden whitespace-nowrap border-0">
            País e indicativo telefónico
          </label>
          <select
            id={selectId}
            value={countryId}
            onChange={(e) => handleCountryChange(e.target.value)}
            className="absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
            aria-label="País e indicativo telefónico"
          >
            {phoneCountries.map((item) => (
              <option key={item.id} value={item.id}>
                {item.flag} {item.name} ({item.dialCode})
              </option>
            ))}
          </select>
          <div
            className="flex h-full items-center gap-2 border rounded-xl px-3 py-3 min-w-[7.25rem] pointer-events-none transition-colors duration-200 group-focus-within/phone:border-sky-cerulean"
            style={fieldStyle}
            aria-hidden="true"
          >
            <span className="text-xl leading-none select-none">{country.flag}</span>
            <span className="text-sm font-semibold tabular-nums tracking-tight">{country.dialCode}</span>
            <ChevronDown className="w-4 h-4 shrink-0 opacity-45" strokeWidth={2} />
          </div>
        </div>

        <input
          id={id}
          name="phone"
          type="tel"
          required
          autoComplete="tel-national"
          inputMode="numeric"
          value={displayValue}
          onChange={(e) => handleNumberChange(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? `${id}-error` : undefined}
          placeholder={country.placeholder}
          maxLength={country.maxDigits + 6}
          className="min-w-0 flex-1 border rounded-xl px-4 py-3 focus:outline-none focus:border-sky-cerulean group-focus-within/phone:border-sky-cerulean transition-all duration-200"
          style={fieldStyle}
        />
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-1.5 text-sm" style={{ color: '#DC2626' }} role="alert">
          {error}
        </p>
      ) : null}
    </div>
  )
}
