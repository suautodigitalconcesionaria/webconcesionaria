import { Car, cars as fallbackCars } from '@/lib/data';

type AirtableRecord = {
  id: string;
  fields: Record<string, string | number | boolean | string[] | undefined>;
};

const API_URL = 'https://api.airtable.com/v0';

function toNumber(value: unknown, fallback = 0) {
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const normalized = value.replace(/[^\d,.-]/g, '').replace(/\./g, '').replace(',', '.');
    const num = Number(normalized);
    return Number.isFinite(num) ? num : fallback;
  }
  return fallback;
}

function toString(value: unknown, fallback = '') {
  return typeof value === 'string' && value.trim().length ? value : fallback;
}

function toImage(fields: AirtableRecord['fields']) {
  const images = fields.images ?? fields.Imágenes ?? fields.Imagenes ?? fields.image;

  if (Array.isArray(images) && images.length > 0) {
    const first = images[0];
    if (typeof first === 'string') return first;
    if (typeof first === 'object' && first && 'url' in first) return String((first as { url?: string }).url ?? '');
  }

  return toString(fields.imagen ?? fields.Imagen);
}

function mapRecordToCar(record: AirtableRecord): Car {
  const fields = record.fields;
  const brand = toString(fields.brand ?? fields.marca ?? fields.Marca, 'Marca');
  const model = toString(fields.model ?? fields.modelo ?? fields.Modelo, 'Modelo');
  const year = toNumber(fields.year ?? fields.año ?? fields.anio ?? fields['Año'], 2022);
  const km = toNumber(fields.km ?? fields.KM ?? fields.kilometraje, 0);
  const price = toNumber(fields.price ?? fields.precio ?? fields.Precio, 0);
  const fuel = toString(fields.fuel ?? fields.combustible ?? fields.Combustible, 'Nafta') as Car['fuel'];
  const transmission = toString(fields.transmission ?? fields.transmision ?? fields.Transmisión, 'Manual') as Car['transmission'];
  const type = toString(fields.type ?? fields.tipo ?? fields.Tipo, 'Sedán') as Car['type'];
  const tag = toString(fields.tag ?? fields.badge ?? fields.destacado, 'Financiado') as Car['tag'];
  const slug = toString(fields.slug, `${brand}-${model}-${year}`.toLowerCase().replace(/\s+/g, '-'));

  return {
    slug,
    brand,
    model,
    year,
    km,
    fuel,
    transmission,
    type,
    price,
    tag,
    image: toImage(fields) || fallbackCars[0].image
  };
}

export async function getCars(): Promise<Car[]> {
  const token = process.env.AIRTABLE_PAT;
  const baseId = process.env.AIRTABLE_BASE_ID;
  const tableName = process.env.AIRTABLE_TABLE_NAME ?? 'Autos';
  const view = process.env.AIRTABLE_VIEW;

  if (!token || !baseId) return fallbackCars;

  const url = new URL(`${API_URL}/${baseId}/${encodeURIComponent(tableName)}`);
  if (view) url.searchParams.set('view', view);

  try {
    const response = await fetch(url.toString(), {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 120 }
    });

    if (!response.ok) {
      console.error('Airtable fetch failed', response.status, await response.text());
      return fallbackCars;
    }

    const payload = (await response.json()) as { records?: AirtableRecord[] };
    const records = payload.records ?? [];
    if (!records.length) return fallbackCars;
    return records.map(mapRecordToCar).filter((car) => car.price > 0);
  } catch (error) {
    console.error('Airtable fetch error', error);
    return fallbackCars;
  }
}

export async function getCarBySlug(slug: string) {
  const list = await getCars();
  return list.find((car) => car.slug === slug);
}
