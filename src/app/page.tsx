import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('produtos')
    .select()
    .limit(10)
  
  if (error) {
    console.error('Error fetching produtos:', error)
  } else {
    console.log('Produtos:', data)
  }
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
    </div>
  );
}
