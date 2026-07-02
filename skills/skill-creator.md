---
name: skill-creator
description: >
  Crie e melhore skills para o Codex seguindo a metodologia da:
  estrutura AGENTS.md, anatomia de prompt (objetivo, contexto, entradas, saída,
  critérios, restrições, validação), organização de workspace e ciclos de trabalho.
  Use esta skill sempre que o usuário pedir para criar, ajustar ou melhorar uma
  skill, agente, AGENTS.md, system prompt, ou configuração de projeto no Codex.
  Também acione quando mencionar "montar um agente", "configurar skill",
  "criar instrução permanente", "fazer o Codex seguir regras" ou qualquer variação.
---

# Skill Creator — Metodologia

Esta skill guia a criação de skills eficientes para o Codex (Claude), seguindo
a metodologia ensinada no curso "Codex para Times Não Técnicos" da.

---

## Conceitos Fundamentais

### O que é uma Skill no Codex

Uma skill é um **padrão de trabalho reutilizável** empacotado em um arquivo
`SKILL.md`. Ela ensina o Codex a executar um tipo específico de tarefa com
qualidade e consistência — sem que o humano precise reexplicar tudo toda vez.

### Diferença entre Skill e AGENTS.md

| Elemento | Para que serve |
|---|---|
| `AGENTS.md` | Regras permanentes e operacionais do **projeto** (segurança, tom, fluxo de aprovação) |
| `SKILL.md` | Instrução completa de **como executar um tipo de tarefa** |
| Thread | Contexto de uma **conversa específica** |

---

## Anatomia de uma Skill Eficiente

Toda skill deve ter os 7 elementos da boa anatomia de prompt:

```
1. OBJETIVO      — o que a skill deve fazer acontecer
2. CONTEXTO      — por que importa e para quem
3. ENTRADAS      — o que o agente precisa receber para executar
4. SAÍDA         — formato e destino do entregável
5. CRITÉRIOS     — o que define uma boa execução
6. RESTRIÇÕES    — o que nunca pode fazer ou inventar
7. VALIDAÇÃO     — como revisar antes de declarar pronto
```

---

## Processo de Criação

### Etapa 1 — Capturar a Intenção

Antes de escrever qualquer coisa, entenda:

- **Qual tarefa repetitiva** o usuário quer que o Codex domine?
- **Quando** essa skill deve ser usada automaticamente?
- **Quem** vai usar — qual time, qual contexto de negócio?
- **Qual o entregável** esperado (documento, planilha, análise, email...)?
- **Quais restrições de segurança** se aplicam (não inventar dados, não
  acionar sistemas sem aprovação, separar clientes...)?

> Se o usuário não sabe responder todas as perguntas, pergunte uma por vez.
> Não avance para a escrita sem ter clareza sobre objetivo e entregável.

### Etapa 2 — Estrutura do Arquivo

```
nome-da-skill/
├── SKILL.md          ← obrigatório
├── references/       ← documentos de apoio (metodologias, templates)
│   └── exemplo.md
└── assets/           ← templates, modelos, checklists
    └── template.md
```

**O `SKILL.md` deve ter menos de 500 linhas.** Se precisar de mais, use
arquivos em `references/` e aponte claramente quando lê-los.

### Etapa 3 — Escrever o SKILL.md

#### Frontmatter obrigatório

```yaml
---
name: nome-da-skill
description: >
  [Explique o que a skill faz E quando deve ser acionada. Inclua palavras-chave
  que o usuário usaria ao pedir essa tarefa. Seja "agressivo" no trigger —
  prefira acionar demais a não acionar quando necessário.]
---
```

#### Corpo da skill

Use seções claras com headers `##`. Inclua:

1. **Contexto** — por que esta skill existe e qual problema resolve
2. **Quando usar** — situações e frases que devem acionar a skill
3. **Entradas necessárias** — o que o agente precisa antes de começar
4. **Passo a passo** — etapas numeradas, objetivas e verificáveis
5. **Formato de saída** — estrutura exata do entregável
6. **Restrições** — lista do que nunca fazer
7. **Checklist de validação** — o que verificar antes de entregar

### Etapa 4 — Testar a Skill

No contexto do Claude.ai, teste a skill você mesmo:

1. Carregue o `SKILL.md` no projeto
2. Faça um pedido que deveria acionar a skill
3. Avalie: o agente seguiu o passo a passo? O entregável tem a estrutura certa?
4. Liste o que ficou bom e o que precisa ajuste
5. Revise o `SKILL.md` com base no teste

### Etapa 5 — Validar com o Usuário

Apresente o resultado e pergunte:
- A estrutura faz sentido para o seu time?
- Tem alguma restrição importante que faltou?
- O entregável está no formato certo?

---

## Padrões da Metodologia

### Regras de Qualidade (sempre incluir na skill)

- Separar **fatos documentados**, **hipóteses** e **recomendações**
- Nunca inventar dados — marcar lacunas como pendência
- Mostrar o plano antes de executar quando a tarefa é complexa
- Registrar fontes, premissas e pendências ao finalizar
- Não substituir arquivos aprovados — criar nova versão

### Ciclos de Trabalho (referenciar quando relevante)

```
1. EXPLORAR  — entender o material antes de propor
2. PLANEJAR  — propor etapas e confirmar com o humano
3. EXECUTAR  — produzir a primeira versão
4. REVISAR   — procurar erros, lacunas e inconsistências
5. AJUSTAR   — corrigir direção, tom e formato
6. VERIFICAR — testar ou reler o entregável antes de entregar
```

O humano **define a intenção, avalia risco e aprova ações externas**.

### Prompts de Controle Úteis (pode incluir em skills)

```
"Antes de executar, diga se falta contexto importante."
"Não invente dados; marque lacunas como pendência."
"Primeiro mostre o plano e aguarde aprovação."
"Separe fatos, hipóteses e recomendações."
"Revise como se fosse o cliente final."
"Ao terminar, liste os arquivos criados e alterações realizadas."
```

---

## Templates por Tipo de Skill

### Skill de Análise / Relatório

```markdown
---
name: analisar-[objeto]
description: >
  Analisa [objeto] e gera relatório com [estrutura].
  Use quando o usuário pedir análise de [palavras-chave].
---

## Entradas Necessárias
- [ ] Arquivo ou dados de [objeto]
- [ ] Período de referência
- [ ] Público do relatório

## Passo a Passo
1. Ler e mapear o material disponível
2. Identificar padrões, outliers e variações relevantes
3. Separar dados factuais de interpretações
4. Estruturar relatório com: resumo executivo, análise, riscos e recomendações
5. Listar fontes e pendências ao final

## Formato de Saída
[Descrever estrutura exata: seções, tamanho, formato de arquivo]

## Restrições
- Não atribuir causa a correlação sem evidência
- Não omitir dados ausentes ou inconsistentes — sinalizá-los
- Não enviar ao cliente sem revisão humana

## Validação
- [ ] Dados conferem com a fonte?
- [ ] Recomendações têm responsável, impacto e prazo sugerido?
- [ ] Separação clara entre fato e recomendação?
```

### Skill de Produção de Conteúdo

```markdown
---
name: criar-[tipo-de-conteudo]
description: >
  Cria [tipo de conteúdo] para [público/canal].
  Use quando o usuário pedir [palavras-chave].
---

## Entradas Necessárias
- [ ] Briefing ou tema
- [ ] Público-alvo e canal
- [ ] Tom e restrições editoriais
- [ ] Referências ou materiais de apoio

## Passo a Passo
1. Confirmar objetivo, público e formato antes de escrever
2. Pesquisar e listar fontes relevantes
3. Propor estrutura para aprovação
4. Produzir primeira versão
5. Revisar com critérios do público final

## Restrições
- Não publicar automaticamente
- Não inventar histórias pessoais ou dados sem fonte
- Seguir guidelines editoriais do projeto

## Validação
- [ ] Tom alinhado ao posicionamento?
- [ ] Fontes registradas?
- [ ] CTA claro?
```

### Skill de Operação com Integração (ClickUp, HubSpot, etc.)

```markdown
---
name: operar-[sistema]
description: >
  Consulta e atualiza [sistema] para [objetivo].
  Use quando o usuário pedir [palavras-chave relacionadas ao sistema].
---

## ⚠️ Regras de Segurança
- NUNCA alterar [sistema] sem aprovação explícita do humano
- Mostrar preview de qualquer ação antes de executar
- Registrar todas as alterações realizadas

## Entradas Necessárias
- [ ] Identificação do projeto/cliente/tarefa
- [ ] Ação solicitada com contexto

## Passo a Passo
1. Consultar e apresentar o estado atual
2. Propor a ação com impacto esperado
3. Aguardar aprovação
4. Executar e confirmar resultado
5. Registrar no log do projeto

## Validação
- [ ] Ação executada no projeto/cliente correto?
- [ ] Resultado conferido após execução?
- [ ] Log atualizado?
```

---

## Checklist Final antes de Entregar a Skill

- [ ] Frontmatter tem `name` e `description` com palavras-chave de trigger?
- [ ] Skill tem menos de 500 linhas? (se não, refatorar em `references/`)
- [ ] Os 7 elementos da anatomia estão presentes?
- [ ] Restrições de segurança estão explícitas?
- [ ] Ciclo de validação está definido?
- [ ] Foi testada com pelo menos um caso de uso real?
- [ ] Usuário revisou e aprovou?

---

## Referências

- Slide 13-14 do curso: Anatomia de um Bom Pedido
- Slide 16-17: Trabalhar em Ciclos
- Slide 88-93: Exemplos de AGENTS.md por time (DI, Growth, CS)
- Skill Creator original: `/mnt/skills/examples/skill-creator/SKILL.md`