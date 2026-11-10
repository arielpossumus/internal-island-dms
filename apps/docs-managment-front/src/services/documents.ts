// src/services/documents.ts

import api from './api'
import type { Document } from '@/types/document'

export const documentService = {
  getAll: async (): Promise<Document[]> => {
    const { data } = await api.get('/documents')
    return data
  },

  getById: async (id: string): Promise<Document> => {
    const { data } = await api.get(`/documents/${id}`)
    return data
  },

  upload: async (file: File, metadata: Record<string, unknown>) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('metadata', JSON.stringify(metadata))

    const { data } = await api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return data
  },

  update: async (id: string, metadata: Record<string, unknown>): Promise<Document> => {
    const { data } = await api.put(`/documents/${id}`, { metadata })
    return data
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/documents/${id}`)
  },
}
