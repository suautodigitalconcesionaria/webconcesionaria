# AUTOBA Web

## Conectar Airtable

1. Copiá variables:

```bash
cp .env.example .env.local
```

2. Completá `AIRTABLE_PAT` con tu token de Airtable.
3. Ajustá `AIRTABLE_TABLE_NAME` y `AIRTABLE_VIEW` según tu base.

El sitio consume Airtable desde `lib/airtable.ts` y hace fallback automático a datos locales si faltan credenciales.

## Campos compatibles de Airtable

Podés usar nombres en español o inglés. El mapeo contempla variantes como:

- `marca` / `brand`
- `modelo` / `model`
- `año` / `year`
- `precio` / `price`
- `km` / `kilometraje`
- `combustible` / `fuel`
- `transmision` / `transmission`
- `tipo` / `type`
- `slug`
- `images` (attachments) o `imagen`

## Desarrollo

```bash
npm install
npm run dev
```
