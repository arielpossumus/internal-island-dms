// src/types/document.ts

export interface Document {
  id: string
  name: string
  metadata: Record<string, unknown>
  fileSize: number
  mimeType: string
  uploadedAt: string
  updatedAt: string
}

export interface DocumentMetadataConfig {
  key: string
  label: string
  type: 'string' | 'number' | 'date' | 'select'
  required: boolean
  options?: string[]
}
