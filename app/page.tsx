import { HomePage } from '@/components/home-page';
import { getCars } from '@/lib/airtable';

export default async function Page() {
  const cars = await getCars();
  return <HomePage cars={cars} />;
}
