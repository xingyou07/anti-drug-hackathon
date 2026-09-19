/**
 * The ONLY module in the app permitted to compose a dial href (constraint 2).
 * Components receive a finished href from here and never build one, which is
 * what makes `grep -rn "tel:" src/components src/pages` meaningful rather than
 * cosmetic.
 */
import type { CrisisResource } from '@/content/types';

const SG_COUNTRY_CODE = '65';

/** Short codes and 1800 lines are not dialled with a country code. */
function digitsOnly(number: string): string {
  return number.replace(/\D/g, '');
}

export function dialHref(resource: CrisisResource): string {
  const digits = digitsOnly(resource.number);

  if (resource.channel === 'whatsapp') {
    // Leaves the app entirely — a user-initiated navigation, not a network
    // call made by this app. Nothing about the user is attached to the link.
    return `https://wa.me/${SG_COUNTRY_CODE}${digits}`;
  }

  return `tel:${digits}`;
}

export function dialVerb(resource: CrisisResource): string {
  return resource.channel === 'whatsapp' ? 'Message' : 'Call';
}

/** Offline fallback: the number is always readable even if no dialler exists. */
export function displayNumber(resource: CrisisResource): string {
  return resource.number;
}
