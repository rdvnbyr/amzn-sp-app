import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSearchCatalogItemsMutation } from './core/api';

const Listings = () => {
  const [onSearchCatalogItem] = useSearchCatalogItemsMutation();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // form data
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const asin = formData.get('asin');
    const sellerId = '1';

    await onSearchCatalogItem({ asin: asin as string, sellerId: sellerId as string }).unwrap();
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-lg font-semibold text-cyan-950">Listings</h2>

      <div className="flex flex-row gap-2">
        <div className="basis-1/2" style={{ maxWidth: '520px' }}>
          <form onSubmit={onSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-row gap-2">
                <Input id="asin" name="asin" placeholder="ASIN" className="border-stone-400" />
                <Button type="submit">Submit</Button>
              </div>

              {/* <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Framework</Label>
              <Select>
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="sveltekit">SvelteKit</SelectItem>
                  <SelectItem value="astro">Astro</SelectItem>
                  <SelectItem value="nuxt">Nuxt.js</SelectItem>
                </SelectContent>
              </Select>
            </div> */}
            </div>
          </form>
        </div>

        <div className="basis-1/2 bg-slate-500">
            TEST
        </div>
      </div>
    </div>
  );
};

export default Listings;
