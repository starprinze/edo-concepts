// src/lib/supabase/storage.ts
import { createClient } from './client'

export const BUCKET = 'edo-assets'

export const FOLDERS = {
  collections: 'collections',
  hero: 'hero',
  lookbooks: 'lookbooks',
} as const

/**
 * Upload a file to Supabase Storage and return the public URL.
 */
export async function uploadAsset(
  file: File,
  folder: keyof typeof FOLDERS
): Promise<{ url: string; path: string } | { error: string }> {
  const supabase = createClient()
  const ext = file.name.split('.').pop()
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const path = `${FOLDERS[folder]}/${fileName}`

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(path, file, {
      cacheControl: '3600',
      upsert: false,
      contentType: file.type,
    })

  if (uploadError) return { error: uploadError.message }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return { url: data.publicUrl, path }
}

/**
 * Delete an asset from Supabase Storage by its path.
 */
export async function deleteAsset(path: string): Promise<boolean> {
  const supabase = createClient()
  const { error } = await supabase.storage.from(BUCKET).remove([path])
  return !error
}

/**
 * Get a public URL for an existing asset path.
 */
export function getPublicUrl(path: string): string {
  const supabase = createClient()
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}
