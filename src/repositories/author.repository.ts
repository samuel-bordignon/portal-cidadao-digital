
import { supabase } from '@/lib/supabase/server'
import { Author, CreateAuthorInput, UpdateAuthorInput } from '@/types/author.model'

export const create = async (data: CreateAuthorInput): Promise<Author> => {
    const { data: author, error } = await supabase
        .from('authors')
        .insert(data)
        .select()
        .single()

    if (error) throw error

    return author
}


