// Country calling code data used by the phone number country selector.
// `iso2` is the ISO 3166-1 alpha-2 code (used to render the flag via react-country-flag).
export interface CountryCode {
  name: string
  iso2: string
  dialCode: string
}

export const countryCodes: CountryCode[] = [
  { name: 'Argentina', iso2: 'AR', dialCode: '+54' },
  { name: 'Australia', iso2: 'AU', dialCode: '+61' },
  { name: 'Austria', iso2: 'AT', dialCode: '+43' },
  { name: 'Bahrain', iso2: 'BH', dialCode: '+973' },
  { name: 'Bangladesh', iso2: 'BD', dialCode: '+880' },
  { name: 'Belgium', iso2: 'BE', dialCode: '+32' },
  { name: 'Brazil', iso2: 'BR', dialCode: '+55' },
  { name: 'Brunei', iso2: 'BN', dialCode: '+673' },
  { name: 'Cambodia', iso2: 'KH', dialCode: '+855' },
  { name: 'Canada', iso2: 'CA', dialCode: '+1' },
  { name: 'Chile', iso2: 'CL', dialCode: '+56' },
  { name: 'China', iso2: 'CN', dialCode: '+86' },
  { name: 'Colombia', iso2: 'CO', dialCode: '+57' },
  { name: 'Czech Republic', iso2: 'CZ', dialCode: '+420' },
  { name: 'Denmark', iso2: 'DK', dialCode: '+45' },
  { name: 'Egypt', iso2: 'EG', dialCode: '+20' },
  { name: 'Finland', iso2: 'FI', dialCode: '+358' },
  { name: 'France', iso2: 'FR', dialCode: '+33' },
  { name: 'Germany', iso2: 'DE', dialCode: '+49' },
  { name: 'Greece', iso2: 'GR', dialCode: '+30' },
  { name: 'Hong Kong', iso2: 'HK', dialCode: '+852' },
  { name: 'India', iso2: 'IN', dialCode: '+91' },
  { name: 'Indonesia', iso2: 'ID', dialCode: '+62' },
  { name: 'Ireland', iso2: 'IE', dialCode: '+353' },
  { name: 'Italy', iso2: 'IT', dialCode: '+39' },
  { name: 'Japan', iso2: 'JP', dialCode: '+81' },
  { name: 'Kenya', iso2: 'KE', dialCode: '+254' },
  { name: 'Kuwait', iso2: 'KW', dialCode: '+965' },
  { name: 'Laos', iso2: 'LA', dialCode: '+856' },
  { name: 'Macau', iso2: 'MO', dialCode: '+853' },
  { name: 'Malaysia', iso2: 'MY', dialCode: '+60' },
  { name: 'Mexico', iso2: 'MX', dialCode: '+52' },
  { name: 'Myanmar', iso2: 'MM', dialCode: '+95' },
  { name: 'Nepal', iso2: 'NP', dialCode: '+977' },
  { name: 'Netherlands', iso2: 'NL', dialCode: '+31' },
  { name: 'New Zealand', iso2: 'NZ', dialCode: '+64' },
  { name: 'Nigeria', iso2: 'NG', dialCode: '+234' },
  { name: 'Norway', iso2: 'NO', dialCode: '+47' },
  { name: 'Oman', iso2: 'OM', dialCode: '+968' },
  { name: 'Pakistan', iso2: 'PK', dialCode: '+92' },
  { name: 'Philippines', iso2: 'PH', dialCode: '+63' },
  { name: 'Poland', iso2: 'PL', dialCode: '+48' },
  { name: 'Portugal', iso2: 'PT', dialCode: '+351' },
  { name: 'Qatar', iso2: 'QA', dialCode: '+974' },
  { name: 'Russia', iso2: 'RU', dialCode: '+7' },
  { name: 'Saudi Arabia', iso2: 'SA', dialCode: '+966' },
  { name: 'Singapore', iso2: 'SG', dialCode: '+65' },
  { name: 'South Africa', iso2: 'ZA', dialCode: '+27' },
  { name: 'South Korea', iso2: 'KR', dialCode: '+82' },
  { name: 'Spain', iso2: 'ES', dialCode: '+34' },
  { name: 'Sri Lanka', iso2: 'LK', dialCode: '+94' },
  { name: 'Sweden', iso2: 'SE', dialCode: '+46' },
  { name: 'Switzerland', iso2: 'CH', dialCode: '+41' },
  { name: 'Taiwan', iso2: 'TW', dialCode: '+886' },
  { name: 'Thailand', iso2: 'TH', dialCode: '+66' },
  { name: 'Turkey', iso2: 'TR', dialCode: '+90' },
  { name: 'Ukraine', iso2: 'UA', dialCode: '+380' },
  { name: 'United Arab Emirates', iso2: 'AE', dialCode: '+971' },
  { name: 'United Kingdom', iso2: 'GB', dialCode: '+44' },
  { name: 'United States', iso2: 'US', dialCode: '+1' },
  { name: 'Vietnam', iso2: 'VN', dialCode: '+84' },
]

const FALLBACK_COUNTRY_ISO2 = 'MY'

export const defaultCountryCode =
  countryCodes.find((country) => country.iso2 === FALLBACK_COUNTRY_ISO2) ?? countryCodes[0]

function findCountryByIso2(iso2: string | undefined): CountryCode | undefined {
  if (!iso2) return undefined
  const normalized = iso2.toUpperCase()
  return countryCodes.find((country) => country.iso2 === normalized)
}

function inferIso2FromTimezone(timeZone: string | undefined): string | undefined {
  if (!timeZone) return undefined

  const zoneToIso2: Record<string, string> = {
    'Asia/Bangkok': 'TH',
    'Asia/Kuala_Lumpur': 'MY',
    'Asia/Singapore': 'SG',
    'Asia/Jakarta': 'ID',
    'Asia/Manila': 'PH',
    'Asia/Ho_Chi_Minh': 'VN',
    'Asia/Tokyo': 'JP',
    'Asia/Seoul': 'KR',
    'Asia/Hong_Kong': 'HK',
    'Asia/Taipei': 'TW',
    'Asia/Dubai': 'AE',
    'Europe/London': 'GB',
    'Europe/Paris': 'FR',
    'Europe/Berlin': 'DE',
    'America/New_York': 'US',
    'America/Chicago': 'US',
    'America/Denver': 'US',
    'America/Los_Angeles': 'US',
    'Australia/Sydney': 'AU',
    'Pacific/Auckland': 'NZ',
  }

  return zoneToIso2[timeZone]
}

export function detectCountryCode(): CountryCode {
  if (typeof window === 'undefined') return defaultCountryCode

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const timezoneCountry = findCountryByIso2(inferIso2FromTimezone(timeZone))
  if (timezoneCountry) return timezoneCountry

  return defaultCountryCode
}
