
import { supabase } from '@/lib/supabase/server'
import {
    Post,
    CreatePostInput,
    UpdatePostInput,
} from '@/types/post.model'

export const create = async (data: CreatePostInput): Promise<Post> => {
    const { data: post, error } = await supabase
        .from('posts')
        .insert(data)
        .select()
        .single()

    if (error) throw error

    return post
}

export const update = async (id: string, data: UpdatePostInput): Promise<Post> => {
    const { data: post, error } = await supabase
        .from('posts')
        .update(data)
        .eq('id', id)
        .select()
        .single()

    if (error) throw error

    return post
}

export const remove = async (id: string): Promise<void> => {
    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id)

    if (error) throw error
}

export const findById = async (id: string): Promise<Post | null> => {
    const { data, error } = await supabase
        .from('posts')
        .select(`*,author:authors(*),category:categories(*)`)
        .eq('id', id)
        .maybeSingle()

    if (error) throw error

    return data
}

export const findAll = async (): Promise<Post[]> => {
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      author:authors(*),
      category:categories(*)
    `)

  if (error) throw error

  return data ?? []
}

