"use client";

import { useRef, useState, useCallback } from "react";
import { Upload, X, ImageIcon, Loader2, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ImageUploaderProps {
  /** Current image URL (used to show existing image) */
  currentImageUrl?: string | null;
  /** Alt text for the preview image */
  altText?: string;
  /** Cloudinary folder to upload into */
  folder?: string;
  /**
   * Called with the upload result once the file is stored.
   * `id`  — the backend file record _id (use this when saving to a profile/entity)
   * `url` — the Cloudinary public URL (use this for immediate preview)
   */
  onUploadSuccess: (payload: { id: string; url: string }) => void;
  /** Called on any error */
  onUploadError?: (error: string) => void;
  /** Custom class for the wrapper */
  className?: string;
  /** Maximum file size in bytes (default: 10 MB) */
  maxSizeBytes?: number;
  /** Show as a circular avatar uploader vs. a rectangular upload zone */
  variant?: "avatar" | "banner";
  /** Whether the uploader is in a disabled state */
  disabled?: boolean;
}

const ACCEPTED_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const DEFAULT_MAX = 10 * 1024 * 1024; // 10 MB

type UploadState = "idle" | "uploading" | "success" | "error";

export default function ImageUploader({
  currentImageUrl,
  altText = "Uploaded image",
  folder,
  onUploadSuccess,
  onUploadError,
  className,
  maxSizeBytes = DEFAULT_MAX,
  variant = "banner",
  disabled = false,
}: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const displayUrl = preview ?? currentImageUrl ?? null;

  const validate = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return "Only JPEG, PNG, GIF, and WebP images are supported.";
    }
    if (file.size > maxSizeBytes) {
      return `File is too large. Maximum size is ${Math.round(maxSizeBytes / 1024 / 1024)} MB.`;
    }
    return null;
  };

  const processFile = useCallback(
    async (file: File) => {
      const validationError = validate(file);
      if (validationError) {
        setUploadState("error");
        onUploadError?.(validationError);
        return;
      }

      // Show local preview immediately
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      setUploadState("uploading");
      setProgress(0);

      // Simulate progress ticks while the real fetch runs
      const tickInterval = setInterval(() => {
        setProgress((p) => Math.min(p + 10, 85));
      }, 200);

      try {
        const formData = new FormData();
        formData.append("file", file);
        if (folder) formData.append("folder", folder);

        // Call our Next.js route handler — avoids the 1 MB server action limit
        // and correctly streams multipart/form-data to the backend.
        const response = await fetch("/api/uploads", {
          method: "POST",
          body: formData,
          // Do NOT set Content-Type — the browser sets it with the correct boundary
        });

        clearInterval(tickInterval);

        const result = await response.json();

        if (response.ok && result.success && result.data?.url) {
          setProgress(100);
          setUploadState("success");
          onUploadSuccess({ id: result.data._id, url: result.data.url });
        } else {
          setProgress(0);
          setUploadState("error");
          setPreview(null);
          const msg = result.error ?? "Upload failed.";
          onUploadError?.(msg);
        }
      } catch {
        clearInterval(tickInterval);
        setProgress(0);
        setUploadState("error");
        setPreview(null);
        const msg = "An unexpected error occurred during upload.";
        onUploadError?.(msg);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [folder, maxSizeBytes, onUploadSuccess, onUploadError]
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
    // Reset input so the same file can be re-selected
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled || uploadState === "uploading") return;
    const file = e.dataTransfer.files?.[0];
    if (file) processFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled && uploadState !== "uploading") setIsDragging(true);
  };

  const clearImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    setUploadState("idle");
    setProgress(0);
  };

  if (variant === "avatar") {
    return (
      <div className={cn("relative inline-block", className)}>
        <button
          type="button"
          id="avatar-uploader-trigger"
          disabled={disabled || uploadState === "uploading"}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "group relative h-24 w-24 rounded-full overflow-hidden",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
            "transition-all duration-200"
          )}
          aria-label="Change profile photo"
        >
          {/* Image or placeholder */}
          {displayUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={displayUrl}
              alt={altText}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="flex h-full w-full items-center justify-center bg-blue-600">
              <ImageIcon className="h-8 w-8 text-white/60" />
            </span>
          )}

          {/* Hover overlay */}
          <span
            className={cn(
              "absolute inset-0 flex flex-col items-center justify-center gap-1",
              "bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200",
              uploadState === "uploading" && "opacity-100"
            )}
          >
            {uploadState === "uploading" ? (
              <Loader2 className="h-5 w-5 animate-spin text-white" />
            ) : (
              <>
                <Upload className="h-4 w-4 text-white" />
                <span className="text-[10px] font-medium text-white">Change</span>
              </>
            )}
          </span>

          {/* Success ring */}
          {uploadState === "success" && (
            <span className="absolute bottom-1 right-1 rounded-full bg-green-500 p-0.5 shadow">
              <CheckCircle className="h-3 w-3 text-white" />
            </span>
          )}
        </button>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES.join(",")}
          onChange={handleFileChange}
          disabled={disabled || uploadState === "uploading"}
          className="sr-only"
          aria-label="Upload profile photo"
          id="avatar-file-input"
        />
      </div>
    );
  }

  // ── Banner / rectangular variant ─────────────────────────────────────────────
  return (
    <div className={cn("w-full space-y-2", className)}>
      <div
        role="button"
        tabIndex={disabled || uploadState === "uploading" ? -1 : 0}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => !disabled && uploadState !== "uploading" && inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        className={cn(
          "relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed",
          "cursor-pointer transition-all duration-200 overflow-hidden",
          "min-h-[160px] px-6 py-8 text-center",
          isDragging
            ? "border-blue-500 bg-blue-50"
            : "border-gray-200 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/40",
          (disabled || uploadState === "uploading") && "pointer-events-none opacity-70"
        )}
        aria-label="Upload image drop zone"
        id="image-uploader-dropzone"
      >
        {displayUrl ? (
          <>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={displayUrl}
              alt={altText}
              className="max-h-36 max-w-full rounded-lg object-contain shadow-sm"
            />
            {/* Clear button */}
            {!disabled && uploadState !== "uploading" && (
              <button
                type="button"
                onClick={clearImage}
                className="absolute right-2 top-2 rounded-full bg-white/90 p-1 shadow hover:bg-red-50 transition-colors"
                aria-label="Remove image"
                id="image-uploader-clear"
              >
                <X className="h-4 w-4 text-gray-500 hover:text-red-500" />
              </button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center gap-3">
            <div className="rounded-full bg-blue-100 p-3">
              <Upload className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                Drop an image here, or{" "}
                <span className="text-blue-600 underline underline-offset-2">
                  click to browse
                </span>
              </p>
              <p className="mt-1 text-xs text-gray-400">
                JPEG, PNG, GIF, WebP — up to{" "}
                {Math.round(maxSizeBytes / 1024 / 1024)} MB
              </p>
            </div>
          </div>
        )}

        {/* Upload progress overlay */}
        {uploadState === "uploading" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/80 backdrop-blur-sm">
            <Loader2 className="h-6 w-6 animate-spin text-blue-600" />
            <div className="w-40">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className="h-full rounded-full bg-blue-500 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-1 text-center text-xs text-gray-500">
                Uploading… {progress}%
              </p>
            </div>
          </div>
        )}

        {/* Success state */}
        {uploadState === "success" && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 shadow-sm">
            <CheckCircle className="h-3 w-3" />
            Uploaded
          </div>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES.join(",")}
        onChange={handleFileChange}
        disabled={disabled || uploadState === "uploading"}
        className="sr-only"
        aria-label="Upload image file input"
        id="image-uploader-file-input"
      />
    </div>
  );
}
