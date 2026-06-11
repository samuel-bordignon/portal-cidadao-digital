import { generateSlug } from "@/lib/utils"
import { HttpError } from "@/lib/httpError"
import * as categoryRepository from "@/repositories/category.repository"
import { CreateCategoryInput, UpdateCategoryInput } from "@/types/category.model"

export const hasCategory = async (id: string) => {
    const category = await categoryRepository.findById(id)
    if (!category) {
        throw new HttpError(404, "Autor não encontrado")
    }
    return category
}

export const createCategory = async (data: Pick<CreateCategoryInput, 'nome'>, author_id: string) => {
    const slug = generateSlug(data.nome)

    return await categoryRepository.create({ ...data, slug, author_id: author_id })
}
export const updateCategory = async (id: string, data: Omit<UpdateCategoryInput, 'slug'>, author_id: string, author_role: string) => {
    const slug = generateSlug(data.nome)

    const category = await hasCategory(id)

    if (category.author_id !== author_id && author_role !== 'admin') {
        throw new HttpError(403, "Sem permissão")
    }

    return await categoryRepository.update(id, { ...data, slug })
}
export const deleteCategory = async (id: string) => {
    await hasCategory(id)

    await categoryRepository.remove(id)
}
export const getCategoryById = async (id: string) => {
    const category = await hasCategory(id)
    return category
}
export const getCategories = async () => {
    return await categoryRepository.findAll()
}
export const getCategoryBySlug = async (slug: string) => {
    const category = await categoryRepository.findBySlug(slug)

    if (!category) {
        throw new HttpError(404, "Categoria não encontrada")
    }
    return category
}
export const getCategoriesByAuthor = async (author_id: string) => {
    const categories = categoryRepository.findByAuthor(author_id)

    if (!categories) {
        throw new HttpError(404, "Categorias não encontradas")
    }
    return categories
}
export const getCategoriesWithPublishedPosts = async () => {
    return await categoryRepository.findWithPublishedPosts()
}





