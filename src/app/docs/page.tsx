'use client'

import { useEffect, useRef } from 'react'
import 'swagger-ui-dist/swagger-ui.css'

export default function DocsPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Importação dinâmica para evitar erros de SSR (swagger-ui-dist depende de 'window')
    import('swagger-ui-dist/swagger-ui-bundle').then(({ default: SwaggerUIBundle }) => {
      SwaggerUIBundle({
        url: '/api/openapi',
        domNode: containerRef.current,
        deepLinking: true,
      })
    })
  }, [])

  return (
    <div style={{ backgroundColor: '#fff', minHeight: '100vh' }}>
      <div ref={containerRef} />
    </div>
  )
}
