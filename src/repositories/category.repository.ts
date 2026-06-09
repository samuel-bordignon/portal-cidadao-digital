import { supabase } from '@/lib/supabase/server'
import { Category, CreateCategoryInput, UpdateCategoryInput } from '@/types/category.model'

export const create = async (data: CreateCategoryInput): Promise<Category> => {
    const { data: category, error } = await supabase
        .from('categories')
        .insert(data)
        .select()
        .single()

    if (error) throw error

    return category
}

export const update = async (id: string, data: UpdateCategoryInput): Promise<Category> => {
    const { data: category, error } = await supabase
        .from('categories')
        .update(data)
        .eq('id', id)
        .select()
        .single()

    if (error) throw error

    return category
}

export const remove = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id)

    if (error) throw error
}

export const findById = async (id: string): Promise<Category | null> => {
    const { data, error } = await supabase
        .from('categories')
        .select(`*`)
        .eq('id', id)
        .maybeSingle()

    if (error) throw error

    return data
}

export const findBySlug = async (slug: string): Promise<Category | null> => {
    
    const { data, error } = await supabase
        .from('categories')
        .select(`*`)
        .eq('slug', slug)
        .maybeSingle()

    if (error) throw error

    return data
}

export const findAll = async (): Promise<Category[]> => {
    const { data, error } = await supabase
        .from('categories')
        .select(`*`)
        .order('nome', { ascending: true })

    if (error) throw error

    return data || []
}

export const findByAuthor = async (authorId: string): Promise<Category[]> => {
    const { data, error } = await supabase
        .from('categories')
        .select(`*`)
        .eq('author_id', authorId)
        .order('nome', { ascending: true })

    if (error) throw error

    return data || []
}

export const findWithPublishedPosts = async (): Promise<Category[]> => {
    const { data, error } = await supabase
        .from('categories')
        .select(`*, posts!inner(id)`)
        .eq('posts.status', 'published')
        .order('nome', { ascending: true })

    if (error) throw error

    // Remove the 'posts' array that comes from the inner join before returning
    return (data || []).map((cat: any) => {
        const { posts, ...rest } = cat;
        return rest;
    }) as Category[]
}
