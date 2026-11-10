// src/hooks/useDocuments.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { documentService } from '@/services/documents'

export const useDocuments = () => {
  return useQuery({
    queryKey: ['documents'],
    queryFn: documentService.getAll,
  })
}

export const useDocument = (id: string) => {
  return useQuery({
    queryKey: ['documents', id],
    queryFn: () => documentService.getById(id),
    enabled: !!id,
  })
}

export const useUploadDocument = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ file, metadata }: { file: File; metadata: Record<string, unknown> }) =>
      documentService.upload(file, metadata),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] })
    },
  })
}

export const useUpdateDocument = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, metadata }: { id: string; metadata: Record<string, unknown> }) =>
      documentService.update(id, metadata),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['documents'] })
      queryClient.invalidateQueries({ queryKey: ['documents', id] })
    },
  })
}

export const useDeleteDocument = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: documentService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['documents'] })
    },
  })
}
