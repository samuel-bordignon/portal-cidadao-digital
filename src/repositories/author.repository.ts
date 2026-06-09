
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

export const update = async (id: string, data: UpdateAuthorInput): Promise<Author> => {
    const { data: author, error } = await supabase
        .from('authors')
        .update(data)
        .eq('id', id)
        .select()
        .single()

    if (error) throw error

    return author
}

export const remove = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('authors')
        .delete()
        .eq('id', id)

    if (error) throw error
}

export const findById = async (id: string): Promise<Author | null> => {
    const { data, error } = await supabase
        .from('authors')
        .select(`*`)
        .eq('id', id)
        .maybeSingle()

    if (error) throw error

    return data
}

export const findAll = async (): Promise<Author[]> => {
    const { data, error } = await supabase
    .from('authors')
    .select(`*`)
    .order('created_at', { ascending: false })
    
    if (error) throw error
    
    return data || []
}

export const findByApiKeyHash = async (api_key_hash: string): Promise<Author | null> => {
    
    const { data, error } = await supabase
        .from('authors')
        .select(`*`)
        .eq('api_key_hash', api_key_hash)
        .maybeSingle()

    if (error) throw error

    return data
}