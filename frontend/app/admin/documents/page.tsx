'use client'

import { useCallback, useEffect, useState, useRef } from 'react'
import { Upload, File as FileIcon, Loader2, CheckCircle, XCircle, Clock } from 'lucide-react'

type DocumentFile = {
  id: number
  filename: string
  originalName: string
  size: number
  status: 'uploaded' | 'ingested' | 'error'
  error: string | null
  createdAt: string
}

export default function AdminDocuments() {
  const [documents, setDocuments] = useState<DocumentFile[]>([])
  const [loading, setLoading] = useState(true)
  const [ingesting, setIngesting] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const fetchDocuments = useCallback(async () => {
    try {
      const res = await fetch('/api/v1/admin/documents', { credentials: 'include' })
      const data = await res.json()
      if (data.success) setDocuments(data.data)
    } catch (err) {
      console.error('Failed to fetch documents', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      void fetchDocuments()
    }, 0)

    return () => window.clearTimeout(timeout)
  }, [fetchDocuments])

  async function handleUpload() {
    if (!selectedFile) return
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      const res = await fetch('/api/v1/admin/documents/upload', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      })
      const data = await res.json()
      if (data.success) {
        setSelectedFile(null)
        if (fileInputRef.current) fileInputRef.current.value = ''
        await fetchDocuments()
      }
    } catch (err) {
      console.error('Upload failed', err)
    } finally {
      setUploading(false)
    }
  }

  async function handleIngest() {
    setIngesting(true)

    try {
      const res = await fetch('/api/v1/admin/documents/ingest', {
        method: 'POST',
        credentials: 'include',
      })
      const data = await res.json()
      if (!data.success) return

      fetchDocuments()
      const poll = setInterval(async () => {
        const r = await fetch('/api/v1/admin/documents', { credentials: 'include' })
        const j = await r.json()
        if (!j.success) return
        setDocuments(j.data)
        const remaining = j.data.filter((d: DocumentFile) => d.status === 'uploaded').length
        if (remaining === 0) {
          clearInterval(poll)
          setIngesting(false)
        }
      }, 3000)
    } catch (err) {
      console.error('Ingestion failed', err)
      setIngesting(false)
    }
  }

  function formatSize(bytes: number): string {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    })
  }

  const StatusBadge = ({ status, error }: { status: string; error: string | null }) => {
    if (status === 'ingested') {
      return (
        <span className="inline-flex items-center gap-1 text-xs font-medium bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-full">
          <CheckCircle size={12} /> Ingested
        </span>
      )
    }
    if (status === 'error') {
      return (
        <span title={error ?? ''} className="inline-flex items-center gap-1 text-xs font-medium bg-red-50 text-red-700 px-2.5 py-1 rounded-full">
          <XCircle size={12} /> Error
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1 text-xs font-medium bg-amber-50 text-amber-700 px-2.5 py-1 rounded-full">
        <Clock size={12} /> Uploaded
      </span>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="font-serif text-3xl text-foreground">Documents</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Upload .docx files and ingest them into the AI knowledge base
        </p>
      </div>

      {/* Upload Section */}
      <div className="bg-white rounded-xl border border-border p-6 mb-6 shadow-xs">
        <h2 className="font-serif text-lg text-foreground mb-4">Upload Document</h2>
        <div className="flex items-end gap-4">
          <div className="flex-1">
            <input
              ref={fileInputRef}
              type="file"
              accept=".docx"
              onChange={(e) => setSelectedFile(e.target.files?.[0] ?? null)}
              className="block w-full text-sm text-muted-foreground file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gold/10 file:text-gold hover:file:bg-gold/20 cursor-pointer"
            />
            {selectedFile && (
              <p className="text-xs text-muted-foreground mt-2">
                {selectedFile.name} ({formatSize(selectedFile.size)})
              </p>
            )}
          </div>
          <button
            onClick={handleUpload}
            disabled={!selectedFile || uploading}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gold text-white rounded-lg text-sm font-medium hover:bg-gold/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
            {uploading ? 'Uploading...' : 'Upload'}
          </button>
        </div>
      </div>

      {/* Ingest Button + Result */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handleIngest}
          disabled={ingesting || documents.length === 0}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-forest text-white rounded-lg text-sm font-medium hover:bg-forest/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {ingesting ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />}
          {ingesting ? 'Ingesting...' : 'Ingest All Documents'}
        </button>

        {ingesting && (
          <span className="text-sm text-muted-foreground animate-pulse">
            Processing... this may take a few minutes
          </span>
        )}
      </div>

      {/* Document List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="animate-spin text-gold" size={24} />
        </div>
      ) : documents.length === 0 ? (
        <div className="bg-white rounded-xl border border-border p-12 shadow-xs text-center">
          <FileIcon size={40} className="mx-auto text-muted-foreground/40 mb-3" />
          <p className="text-muted-foreground">No documents uploaded yet</p>
          <p className="text-xs text-muted-foreground/60 mt-1">Upload a .docx file above to get started</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-border shadow-xs overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left font-medium text-muted-foreground px-5 py-3">File</th>
                <th className="text-left font-medium text-muted-foreground px-5 py-3">Size</th>
                <th className="text-left font-medium text-muted-foreground px-5 py-3">Status</th>
                <th className="text-left font-medium text-muted-foreground px-5 py-3">Uploaded</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <FileIcon size={16} className="text-gold shrink-0" />
                      <span className="text-foreground font-medium truncate max-w-xs">{doc.originalName}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground">{formatSize(doc.size)}</td>
                  <td className="px-5 py-3.5">
                    {doc.error ? (
                      <span title={doc.error}>
                        <StatusBadge status={doc.status} error={doc.error} />
                      </span>
                    ) : (
                      <StatusBadge status={doc.status} error={null} />
                    )}
                  </td>
                  <td className="px-5 py-3.5 text-muted-foreground text-xs">{formatDate(doc.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
