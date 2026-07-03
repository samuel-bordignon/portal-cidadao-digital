import { generateSlug } from "@/lib/utils"
import type { ContentBlock } from "@/types/blocks.model"
import type { Category } from "@/types/category.model"
import type { Post } from "@/types/post.model"

export type PublicCategory = Pick<Category, "id" | "nome" | "slug"> &
  Partial<Pick<Category, "author_id" | "created_at">>

export type PublicPost = Omit<Post, "category" | "author"> & {
  category?: Pick<Category, "nome" | "slug" | "id"> | Category | null
  author?: Post["author"] | null
}

const author = {
  id: "author-portal",
  nome: "Redacao Cidadao Digital",
  email: "redacao@cidadaodigital.local",
  role: "author" as const,
}

const categories: PublicCategory[] = [
  {
    id: "cat-seguranca-digital",
    nome: "Seguranca Digital",
    slug: "seguranca-digital",
    created_at: "2026-07-01T08:00:00.000Z",
  },
  {
    id: "cat-servicos-publicos",
    nome: "Servicos Publicos",
    slug: "servicos-publicos",
    created_at: "2026-07-01T08:00:00.000Z",
  },
  {
    id: "cat-cidadania",
    nome: "Cidadania",
    slug: "cidadania",
    created_at: "2026-07-01T08:00:00.000Z",
  },
  {
    id: "cat-tecnologia",
    nome: "Tecnologia",
    slug: "tecnologia",
    created_at: "2026-07-01T08:00:00.000Z",
  },
  {
    id: "cat-educacao",
    nome: "Educacao",
    slug: "educacao",
    created_at: "2026-07-01T08:00:00.000Z",
  },
]

const posts: PublicPost[] = [
  createMockPost({
    id: "post-1",
    slug: "guia-pratico-para-proteger-suas-contas-digitais",
    categorySlug: "seguranca-digital",
    titulo: "Guia pratico para proteger suas contas digitais no dia a dia",
    resumo:
      "Medidas simples ajudam a reduzir riscos em aplicativos, redes sociais, bancos e servicos publicos online.",
    imagem_capa:
      "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?auto=format&fit=crop&w=1400&q=80",
    created_at: "2026-07-03T12:30:00.000Z",
    blocks: [
      {
        type: "paragraph",
        data: {
          text: "A protecao de contas digitais comeca por habitos consistentes. Senhas fortes, autenticacao em duas etapas e atencao a links recebidos por mensagem reduzem boa parte dos golpes mais comuns.",
        },
      },
      {
        type: "heading",
        data: {
          level: 2,
          text: "O que mudar primeiro",
        },
      },
      {
        type: "list",
        data: {
          style: "unordered",
          items: [
            "Ative a verificacao em duas etapas nos servicos mais importantes.",
            "Use senhas unicas para banco, email e contas do governo.",
            "Desconfie de mensagens que pedem urgencia ou dados pessoais.",
          ],
        },
      },
      {
        type: "quote",
        data: {
          text: "Seguranca digital funciona melhor quando vira rotina, nao quando depende de memoria.",
          author: "Equipe de orientacao digital",
        },
      },
      {
        type: "paragraph",
        data: {
          text: "Tambem e importante revisar dispositivos conectados e remover acessos antigos. Em caso de suspeita, troque a senha a partir do aplicativo oficial ou do site digitado manualmente no navegador.",
        },
      },
    ],
  }),
  createMockPost({
    id: "post-2",
    slug: "servicos-online-ganham-nova-central-de-atendimento",
    categorySlug: "servicos-publicos",
    titulo: "Servicos online ganham nova central de atendimento ao cidadao",
    resumo:
      "A iniciativa organiza canais digitais em um unico fluxo para facilitar consultas, solicitacoes e acompanhamento.",
    imagem_capa:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=1400&q=80",
    created_at: "2026-07-03T10:10:00.000Z",
    blocks: [
      {
        type: "paragraph",
        data: {
          text: "A nova central digital concentra informacoes sobre documentos, protocolos, agendamentos e servicos recorrentes. A proposta e reduzir etapas e deixar mais claro onde cada demanda deve ser resolvida.",
        },
      },
      {
        type: "heading",
        data: {
          level: 2,
          text: "Como usar",
        },
      },
      {
        type: "paragraph",
        data: {
          text: "O cidadao deve selecionar o tipo de servico, conferir os documentos necessarios e acompanhar o andamento pelo numero de protocolo gerado no atendimento.",
        },
      },
    ],
  }),
  createMockPost({
    id: "post-3",
    slug: "campanha-orienta-sobre-golpes-em-nome-de-orgaos-publicos",
    categorySlug: "cidadania",
    titulo: "Campanha orienta sobre golpes em nome de orgaos publicos",
    resumo:
      "Mensagens falsas usam linguagem oficial para induzir pagamentos, envio de documentos e instalacao de aplicativos.",
    imagem_capa:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80",
    created_at: "2026-07-02T18:20:00.000Z",
    blocks: [
      {
        type: "paragraph",
        data: {
          text: "Golpistas costumam reproduzir logotipos, termos formais e prazos curtos para criar sensacao de urgencia. O principal cuidado e confirmar a informacao em canais oficiais antes de clicar ou pagar qualquer taxa.",
        },
      },
      {
        type: "list",
        data: {
          style: "ordered",
          items: [
            "Nao informe senhas por telefone ou mensagem.",
            "Verifique o endereco do site antes de preencher formularios.",
            "Procure o canal oficial do orgao quando houver duvida.",
          ],
        },
      },
    ],
  }),
  createMockPost({
    id: "post-4",
    slug: "novas-ferramentas-ajudam-a-mapear-demandas-da-populacao",
    categorySlug: "tecnologia",
    titulo: "Novas ferramentas ajudam a mapear demandas da populacao",
    resumo:
      "Painel digital permite acompanhar indicadores locais e priorizar melhorias com base em dados atualizados.",
    imagem_capa:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80",
    created_at: "2026-07-02T14:40:00.000Z",
    blocks: [
      {
        type: "paragraph",
        data: {
          text: "O uso de dados em tempo real ajuda equipes publicas a identificar gargalos e distribuir recursos com mais precisao. A tecnologia nao substitui a escuta da comunidade, mas torna o processo mais transparente.",
        },
      },
      {
        type: "heading",
        data: {
          level: 2,
          text: "Indicadores acompanhados",
        },
      },
      {
        type: "list",
        data: {
          style: "unordered",
          items: [
            "Tempo medio de atendimento.",
            "Volume de solicitacoes por bairro.",
            "Servicos com maior procura na semana.",
          ],
        },
      },
    ],
  }),
  createMockPost({
    id: "post-5",
    slug: "escolas-ampliam-atividades-de-educacao-midiatica",
    categorySlug: "educacao",
    titulo: "Escolas ampliam atividades de educacao midiatica",
    resumo:
      "Acoes em sala de aula ensinam estudantes a reconhecer fontes confiaveis e interpretar informacoes online.",
    imagem_capa:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1400&q=80",
    created_at: "2026-07-02T09:15:00.000Z",
    blocks: [
      {
        type: "paragraph",
        data: {
          text: "A educacao midiatica ganhou espaco nas atividades escolares com oficinas sobre checagem de informacoes, leitura critica de manchetes e uso responsavel de redes sociais.",
        },
      },
      {
        type: "paragraph",
        data: {
          text: "Professores tambem trabalham exemplos de conteudos manipulados para mostrar como imagens, titulos e recortes podem mudar a percepcao de um fato.",
        },
      },
    ],
  }),
  createMockPost({
    id: "post-6",
    slug: "aplicativos-de-servicos-devem-ter-acessibilidade-desde-o-inicio",
    categorySlug: "tecnologia",
    titulo: "Aplicativos de servicos devem ter acessibilidade desde o inicio",
    resumo:
      "Especialistas defendem interfaces inclusivas como parte essencial de qualquer canal digital voltado ao publico.",
    imagem_capa:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=80",
    created_at: "2026-07-01T17:30:00.000Z",
    blocks: [
      {
        type: "paragraph",
        data: {
          text: "Contraste adequado, navegacao por teclado, textos claros e suporte a leitores de tela precisam ser considerados desde a concepcao de um servico digital.",
        },
      },
      {
        type: "quote",
        data: {
          text: "Acessibilidade nao e acabamento; e requisito para que o servico realmente chegue a todos.",
          author: "Consultoria de experiencia digital",
        },
      },
    ],
  }),
  createMockPost({
    id: "post-7",
    slug: "documentos-digitais-exigem-cuidados-ao-compartilhar-arquivos",
    categorySlug: "seguranca-digital",
    titulo: "Documentos digitais exigem cuidados ao compartilhar arquivos",
    resumo:
      "Enviar fotos de documentos por canais inseguros aumenta risco de fraudes e uso indevido de dados pessoais.",
    imagem_capa:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1400&q=80",
    created_at: "2026-07-01T11:50:00.000Z",
    blocks: [
      {
        type: "paragraph",
        data: {
          text: "Antes de enviar documentos, verifique quem solicitou, por qual canal e se existe alternativa oficial dentro do proprio servico. Evite compartilhar arquivos em grupos ou conversas abertas.",
        },
      },
      {
        type: "divider",
        data: {},
      },
      {
        type: "paragraph",
        data: {
          text: "Quando possivel, oculte informacoes que nao sao necessarias para aquela solicitacao e guarde o comprovante do envio.",
        },
      },
    ],
  }),
  createMockPost({
    id: "post-8",
    slug: "agenda-de-servicos-moveis-chega-a-novos-bairros",
    categorySlug: "servicos-publicos",
    titulo: "Agenda de servicos moveis chega a novos bairros",
    resumo:
      "Atendimentos itinerantes levam orientacao, cadastro e emissao de documentos a regioes com maior demanda.",
    imagem_capa:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
    created_at: "2026-06-30T16:00:00.000Z",
    blocks: [
      {
        type: "paragraph",
        data: {
          text: "A agenda de servicos moveis busca aproximar o atendimento de pessoas que tem dificuldade de deslocamento ou acesso limitado a canais digitais.",
        },
      },
      {
        type: "heading",
        data: {
          level: 2,
          text: "Servicos disponiveis",
        },
      },
      {
        type: "list",
        data: {
          style: "unordered",
          items: [
            "Atualizacao cadastral.",
            "Orientacao sobre servicos digitais.",
            "Acompanhamento de protocolos.",
          ],
        },
      },
    ],
  }),
]

export async function getPublicPosts() {
  return sortPostsByDate(posts)
}

export async function getPublicPost(slug: string) {
  return posts.find((post) => post.slug === slug) ?? null
}

export async function getCategories() {
  return [...categories].sort((a, b) => a.nome.localeCompare(b.nome, "pt-BR"))
}

export async function getCategoryBySlug(slug: string) {
  return categories.find((category) => category.slug === slug) ?? null
}

export function sortPostsByDate(postsToSort: PublicPost[]) {
  return [...postsToSort].sort((a, b) => {
    const first = new Date(a.created_at).getTime()
    const second = new Date(b.created_at).getTime()

    return second - first
  })
}

export function getCategoryName(post: PublicPost) {
  return post.category?.nome ?? "Geral"
}

export function getCategorySlug(post: PublicPost) {
  if (post.category && "slug" in post.category && post.category.slug) {
    return post.category.slug
  }

  return generateSlug(getCategoryName(post))
}

export function getPostHref(post: PublicPost) {
  return `/noticias/${post.slug}`
}

export function getCategoryHref(category: Pick<PublicCategory, "slug">) {
  return `/categorias/${category.slug}`
}

export function filterPostsByCategory(
  postsToFilter: PublicPost[],
  category: Pick<PublicCategory, "nome" | "slug">
) {
  const categoryName = normalizeSearchText(category.nome)
  const categorySlug = normalizeSearchText(category.slug)

  return postsToFilter.filter((post) => {
    const postCategoryName = normalizeSearchText(getCategoryName(post))
    const postCategorySlug = normalizeSearchText(getCategorySlug(post))

    return postCategoryName === categoryName || postCategorySlug === categorySlug
  })
}

export function searchPosts(postsToSearch: PublicPost[], query: string) {
  const normalizedQuery = normalizeSearchText(query)

  if (!normalizedQuery) {
    return []
  }

  return postsToSearch.filter((post) => {
    const searchable = normalizeSearchText(
      [
        post.titulo,
        post.resumo,
        getCategoryName(post),
        extractBlocksText(post.content_blocks),
      ].join(" ")
    )

    return searchable.includes(normalizedQuery)
  })
}

export function extractBlocksText(blocks: ContentBlock[] = []) {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "heading":
        case "paragraph":
          return block.data.text
        case "quote":
          return `${block.data.text} ${block.data.author}`
        case "list":
          return block.data.items.join(" ")
        case "image":
          return `${block.data.alt} ${block.data.caption ?? ""}`
        case "iframe":
        case "pdf":
          return block.data.title
        default:
          return ""
      }
    })
    .join(" ")
}

export function formatDate(date: string, options?: Intl.DateTimeFormatOptions) {
  const parsedDate = new Date(date)

  if (Number.isNaN(parsedDate.getTime())) {
    return ""
  }

  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    ...options,
  }).format(parsedDate)
}

export function formatShortDate(date: string) {
  return formatDate(date, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  })
}

function createMockPost({
  id,
  slug,
  categorySlug,
  titulo,
  resumo,
  imagem_capa,
  created_at,
  blocks,
}: {
  id: string
  slug: string
  categorySlug: string
  titulo: string
  resumo: string
  imagem_capa: string
  created_at: string
  blocks: ContentBlock[]
}): PublicPost {
  const category = categories.find((item) => item.slug === categorySlug)

  if (!category) {
    throw new Error(`Categoria mockada nao encontrada: ${categorySlug}`)
  }

  return {
    id,
    slug,
    titulo,
    resumo,
    imagem_capa,
    content_blocks: blocks,
    author_id: author.id,
    status: "published",
    author,
    category,
    created_at,
    updated_at: created_at,
  }
}

function normalizeSearchText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
}
