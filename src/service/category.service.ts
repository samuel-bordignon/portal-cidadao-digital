import { HttpError } from "@/lib/httpError"
import { generateSlug } from "@/lib/utils"
import * as categoryRepository from "@/repositories/category.repository"
import { Author } from "@/types/author.model"
import { CreateCategoryInput, UpdateCategoryInput } from "@/types/category.model"

export const createCategory = async (data: Pick<CreateCategoryInput, 'nome'>, author: Author) => {
    const slug = generateSlug(data.nome)

    return await categoryRepository.create({ ...data, slug, author_id: author.id })
}

export const updateCategory = async (id: string, data: Pick<UpdateCategoryInput,'nome'>, author: Author) => {
    const category = await categoryRepository.findById(id)

    if (!category) {
        throw new HttpError(404, "Categoria não encontrada")
    }

    if (category.author_id !== author.id && author.role !== 'admin') {
        throw new HttpError(403, "Sem permissão")
    }
    const slug = generateSlug(data.nome)
    return await categoryRepository.update(id, { ...data, slug })
}

export const deleteCategory = async (id: string) => {
    const category = await categoryRepository.findById(id)
    if (!category) {
        throw new HttpError(404, 'Categoria não encontrada')
    }

    return await categoryRepository.remove(id)
}

export const getCategoryById = async (id: string) => {
    const category = await categoryRepository.findById(id)
    if (!category) {
        throw new HttpError(404, 'Categoria não encontrada')
    }
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
}

export const getCategoriesWithPublishedPosts = async () => {
    return await categoryRepository.findWithPublishedPosts()
}
