import { supabase } from '../lib/supabase';

export async function searchInFamilyWeb(searchTerm: string) {
  const { data, error } = await supabase
    .rpc('search_resources', { query: searchTerm });

  if (error) console.error('Error en búsqueda:', error);
  return data;
}