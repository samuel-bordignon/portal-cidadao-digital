import { CreatePostInput, UpdatePostInput } from "@/types/post.model";
import * as postRepository from "@/repositories/post.repository"
import { HttpError } from "@/lib/httpError";
import { generateSlug } from "@/lib/utils";
import { AuthenticateAuthor } from "@/types/author.model";
import { hasCategory } from "./category.service";

const hasPost = async (id: string) => {
    const category = await postRepository.findById(id)
    if (!category) {
        throw new HttpError(404, "Autor não encontrado")    
    }
    return category
}
export const getPosts = async () => {
    return await postRepository.findAll()
}
export const getPostBySlug = async (slug: string) => {
    const post = await postRepository.findBySlug(slug)

    if (!post) {
        throw new HttpError(404, "Post não encontrado")
    }
    return post
}
export const getPostByAuthor = async (id: string) => {
    const post = await postRepository.findByAuthor(id)
    if (!post) {
        throw new HttpError(404, "Posts não encontrado")
    }
    return post
}
export const getPublishedPosts = async () => {
    return await postRepository.findAllPublished()
}
export const getPostById = async (id: string) => {
    const post = await hasPost(id)

    return post
}
export const createPost = async (data: Omit<CreatePostInput, 'slug' | 'status' | 'author_id'>, author_id: string) => {
    await hasCategory(data.category_id)

    return postRepository.create({ ...data, slug: generateSlug(data.titulo), status: "draft", author_id })
}
export const updatePost = async (id: string, data: Omit<UpdatePostInput, 'slug' | 'status'>, author: AuthenticateAuthor) => {
    if (data.category_id) {
        await hasCategory(data.category_id)

        const post = await hasPost(id)

        if (post.author_id !== author.id || author.role !== 'admin') {
            throw new HttpError(403, "Sem permissão")
        }
        return postRepository.update(id, data)
    }
}
export const deletePost = async (id: string, author: AuthenticateAuthor) => {
    const post = await hasPost(id)

    if (post.author_id !== author.id || author.role !== 'admin') {
        throw new HttpError(403, "Sem permissão")
    }

    await postRepository.remove(id)
}
export const publishPost = async (id: string, author_id: string) => {
    const post = await hasPost(id)

    if (post.author_id !== author_id) {
        throw new HttpError(403, "Sem permissão")
    }

    return await postRepository.update(id, { status: 'published' })
}

