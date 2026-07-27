'use client'

import { useEffect, useRef, useState } from 'react'
import ReactCountryFlag from 'react-country-flag'
import { ChevronDown } from 'lucide-react'
import { countryCodes, defaultCountryCode, type CountryCode } from '@/lib/country-codes'
import { cn } from '@/lib/utils'

interface PhoneNumberInputProps {
  id?: string
  className?: string
  value: string
  country: CountryCode
  onCountryChange: (country: CountryCode) => void
  onValueChange: (value: string) => void
  placeholder?: string
}

// Combined "[flag] [dial code] ▾ | [number input]" control used for the
// mobile number field. The dropdown lets the user pick a country, which
// updates the dial code shown beside the plain national-number input.
export default function PhoneNumberInput({
  id,
  className,
  value,
  country,
  onCountryChange,
  onValueChange,
  placeholder = '12 3456 789',
}: PhoneNumberInputProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setSearch('')
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const filtered = countryCodes.filter((c) =>
    `${c.name} ${c.dialCode}`.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div ref={containerRef} className={cn('relative flex items-stretch', className)}>
      {/* Country / dial-code selector */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className="flex items-center gap-1.5 shrink-0 rounded-l-md border border-r-0 border-orange-200 bg-orange-50/60 px-2.5 text-sm hover:bg-orange-100/70 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:outline-none transition-colors"
      >
        <ReactCountryFlag
          countryCode={country.iso2}
          svg
          style={{ width: '1.1em', height: '1.1em' }}
          aria-label={country.name}
        />
        <span className="text-gray-700 font-medium">{country.dialCode}</span>
        <ChevronDown className="w-3.5 h-3.5 text-gray-500" />
      </button>

      {/* National number input */}
      <input
        id={id}
        type="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onValueChange(e.target.value.replace(/[^0-9]/g, ''))}
        className="w-full bg-orange-50/60 border border-orange-200 rounded-r-md placeholder:text-gray-400 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:border-orange-400 transition-colors px-3 py-1 h-9 text-base md:text-sm outline-none"
      />

      {open && (
        <div className="absolute z-20 top-full left-0 mt-1 w-64 rounded-md border border-orange-200 bg-white shadow-lg">
          <div className="p-2 border-b border-orange-100">
            <input
              autoFocus
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search country..."
              className="w-full text-sm px-2 py-1 rounded border border-orange-200 focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:outline-none"
            />
          </div>
          <div
            className="max-h-52 overflow-y-auto overscroll-contain touch-pan-y"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            <ul role="listbox">
            {filtered.length === 0 && (
              <li className="px-3 py-2 text-sm text-gray-400">No matches</li>
            )}
            {filtered.map((c) => (
              <li key={c.iso2}>
                <button
                  type="button"
                  role="option"
                  aria-selected={c.iso2 === country.iso2}
                  onClick={() => {
                    onCountryChange(c)
                    setOpen(false)
                    setSearch('')
                  }}
                  className={cn(
                    'w-full flex items-center gap-2 px-3 py-1.5 text-sm text-left hover:bg-orange-50 transition-colors',
                    c.iso2 === country.iso2 && 'bg-orange-100/70'
                  )}
                >
                  <ReactCountryFlag
                    countryCode={c.iso2}
                    svg
                    style={{ width: '1.1em', height: '1.1em' }}
                    aria-label={c.name}
                  />
                  <span className="flex-1 truncate text-gray-700">{c.name}</span>
                  <span className="text-gray-500">{c.dialCode}</span>
                </button>
              </li>
            ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export const defaultPhoneCountry = defaultCountryCode
