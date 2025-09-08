import raw from "./cryptids.json";

export type Cryptid = {
  slug: string;
  name?: string;
  location?: string;
  traits?: string;
  danger?: string | number;
  description?: string;
  image?: string;
  [k: string]: any;
};

function toSlug(s: string = "") {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-").replace(/-+/g, "-");
}
function pick<T=any>(o:any, keys:string[]): T|undefined {
  for (const k of keys) if (o?.[k] != null && String(o[k]).trim() !== "") return o[k];
}

export const list: Cryptid[] = (Array.isArray(raw) ? raw : []).map((o:any) => {
  const name = pick<string>(o, ["name","Name","title","Title","cryptid","Cryptid","Cryptid Name"]);
  const slug = pick<string>(o, ["slug","Slug"]) || (name ? toSlug(name) : undefined);
  const location = pick<string>(o, ["location","Location","region","Region","country","Country","Area"]);
  const traits = pick<string>(o, ["traits","Traits"]);
  const danger = pick<string>(o, ["danger","Danger","danger_level","Danger Level"]);
  const description = pick<string>(o, ["description","Description","summary","Summary","bio","Bio","Long Description","Short Description"]);
  const image = pick<string>(o, ["image","Image","image_url","imageUrl","img","img_url","thumbnail","photo","Picture"]);
  let img = image;
  if (img && !img.startsWith("http") && !img.startsWith("/")) img = "/" + img; // treat as /public path
  return { ...o, slug: slug || "", name, location, traits, danger, description, image: img };
}).filter(x => x.slug);
 
export function getCryptidBySlug(slug: string): Cryptid | null {
  return list.find(x => x.slug === slug) || null;
}
