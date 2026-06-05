'use client'
// src/components/admin/UploadPanel.tsx
import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { createClient } from '@/lib/supabase/client'
import { uploadAsset } from '@/lib/supabase/storage'
import { Toast } from '@/components/ui'
import clsx from 'clsx'

interface PreviewFile {
  file: File
  preview: string
}

interface UploadPanelProps {
  onSuccess?: () => void
}

export function UploadPanel({ onSuccess }: UploadPanelProps) {
  const [previews, setPreviews] = useState<PreviewFile[]>([])
  const [title, setTitle] = useState('')
  const [season, setSeason] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [featured, setFeatured] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const onDrop = useCallback((accepted: File[]) => {
    const newPreviews = accepted.map(file => ({
      file,
      preview: URL.createObjectURL(file),
    }))
    setPreviews(newPreviews)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpg', '.jpeg', '.png', '.webp'] },
    maxSize: 8 * 1024 * 1024, // 8 MB
    multiple: true,
  })

  const handleSave = async () => {
    if (!previews.length || !title.trim()) {
      setToast('Please add at least one image and a title.')
      return
    }

    setUploading(true)

    try {
      const supabase = createClient()
      const results = await Promise.all(
        previews.map(p => uploadAsset(p.file, 'collections'))
      )

      const errors = results.filter(r => 'error' in r)
      if (errors.length) {
        setToast('Some uploads failed. Please try again.')
        setUploading(false)
        return
      }

      // Use first image as main image_url
      const primary = results[0] as { url: string; path: string }

      const { error: dbError } = await supabase.from('collections').insert({
        title: title.trim(),
        image_url: primary.url,
        image_path: primary.path,
        season: season.trim() || null,
        description: description.trim() || null,
        category: category.trim() || null,
        featured,
      })

      if (dbError) {
        setToast(`Save failed: ${dbError.message}`)
      } else {
        setToast(`"${title}" added to collections.`)
        // Reset form
        setPreviews([])
        setTitle('')
        setSeason('')
        setDescription('')
        setCategory('')
        setFeatured(false)
        onSuccess?.()
      }
    } catch {
      setToast('Unexpected error. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const removePreview = (index: number) => {
    setPreviews(prev => {
      URL.revokeObjectURL(prev[index].preview)
      return prev.filter((_, i) => i !== index)
    })
  }

  return (
    <>
      <div className="admin-panel">
        <p className="panel-heading">Upload to Collections</p>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={clsx(
            'border border-dashed transition-all duration-300 py-14 px-8 text-center cursor-pointer',
            isDragActive
              ? 'border-gold bg-gold/5'
              : 'border-border-gold hover:border-gold/50 hover:bg-gold/3'
          )}
        >
          <input {...getInputProps()} aria-label="Upload images" />
          <div className="text-3xl text-gold/30 mb-4">↑</div>
          <p className="text-[0.6rem] tracking-[0.25em] uppercase text-silver leading-[2]">
            {isDragActive
              ? 'Release to upload'
              : 'Drag & drop images here'}
          </p>
          <p className="text-[0.5rem] tracking-wide text-silver/40 uppercase mt-2">
            or{' '}
            <span className="text-gold underline-offset-2 underline">browse files</span>
            {' '}· JPG, PNG, WEBP · Max 8 MB
          </p>
        </div>

        {/* Previews */}
        <AnimatePresence>
          {previews.length > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden"
            >
              <div className="grid grid-cols-3 gap-1.5 mt-4">
                {previews.map((p, i) => (
                  <div key={p.preview} className="relative aspect-square group">
                    <Image
                      src={p.preview}
                      alt={`Preview ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <button
                        onClick={() => removePreview(i)}
                        className="text-white text-xs border border-white/50 px-2 py-0.5 hover:border-white"
                        aria-label="Remove image"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-1.5 py-1">
                      <p className="text-[0.4rem] tracking-wide uppercase text-silver/70 truncate">
                        {p.file.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Metadata form */}
        <AnimatePresence>
          {previews.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="mt-8 space-y-6"
            >
              <div>
                <label className="field-label block mb-2">
                  Collection Title <span className="text-gold">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="e.g. SS25 Heritage Agbada"
                  className="field-input"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="field-label block mb-2">Season</label>
                  <input
                    type="text"
                    value={season}
                    onChange={e => setSeason(e.target.value)}
                    placeholder="e.g. Autumn/Winter 2025"
                    className="field-input"
                  />
                </div>
                <div>
                  <label className="field-label block mb-2">Category</label>
                  <input
                    type="text"
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    placeholder="e.g. Agbada, Suit, Kaftan"
                    className="field-input"
                  />
                </div>
              </div>
              <div>
                <label className="field-label block mb-2">Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="Brief piece description..."
                  className="field-input"
                />
              </div>
              <div className="flex items-center gap-3">
                <button
                  role="switch"
                  aria-checked={featured}
                  onClick={() => setFeatured(v => !v)}
                  className={clsx(
                    'w-10 h-5 rounded-full transition-colors duration-300 relative',
                    featured ? 'bg-gold' : 'bg-border'
                  )}
                >
                  <span
                    className={clsx(
                      'absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform duration-300',
                      featured ? 'translate-x-5' : 'translate-x-0.5'
                    )}
                  />
                </button>
                <span className="text-[0.55rem] tracking-[0.2em] uppercase text-silver">
                  Feature on homepage
                </span>
              </div>

              <button
                onClick={handleSave}
                disabled={uploading || !title.trim()}
                className="w-full bg-gold text-black font-display font-bold text-[0.55rem] tracking-[0.3em] uppercase py-3.5 hover:opacity-85 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {uploading ? 'Uploading...' : 'Save to Collections'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Toast message={toast} onClose={() => setToast(null)} />
    </>
  )
}
