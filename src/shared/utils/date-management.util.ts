import moment from 'moment-timezone';

/**
 * Convierte una fecha (string o Date) a UTC, interpretando la fecha en la zona horaria indicada.
 * @param date Fecha en string o Date.
 * @param timezone Zona horaria (ej: 'America/Mexico_City').
 * @returns Date en UTC.
 */
export function toUTC(date: string | Date, timezone: string): Date {
  return moment.tz(date, timezone).utc().toDate();
}

/**
 * Valida si una zona horaria es válida según moment-timezone.
 * @param timezone Zona horaria a validar.
 * @returns true si es válida, false si no.
 */
export function isValidTimezone(timezone: string): boolean {
  return moment.tz.zone(timezone) !== null;
}

/**
 * Convierte una fecha UTC (string o Date) a una zona horaria específica.
 * @param date Fecha en string o Date (en UTC).
 * @param timezone Zona horaria destino.
 * @returns Date en la zona horaria destino.
 */
export function fromUTC(date: string | Date, timezone: string): Date {
  return moment.utc(date).tz(timezone).toDate();
}

/**
 * @returns fecha actual en UTC.
 */
export function nowUTC(): Date {
  return moment.utc().toDate();
}