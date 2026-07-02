declare module 'swagger-ui-dist/swagger-ui-bundle' {
  interface SwaggerUIBundleConfig {
    url?: string
    domNode?: HTMLElement | null
    spec?: object
    deepLinking?: boolean
    presets?: Array<any>
    plugins?: Array<any>
    layout?: string
    docExpansion?: 'list' | 'full' | 'none'
    requestInterceptor?: (req: any) => any | Promise<any>
    responseInterceptor?: (res: any) => any | Promise<any>
  }

  function SwaggerUIBundle(config: SwaggerUIBundleConfig): any
  export default SwaggerUIBundle
}

declare module 'swagger-ui-dist/swagger-ui.css'
