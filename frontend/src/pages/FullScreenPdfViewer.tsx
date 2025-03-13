// // frontend/components/FullScreenPdfViewer.tsx
// import React from 'react';
// import { Worker, Viewer } from '@react-pdf-viewer/core';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// interface FullScreenPdfViewerProps {
//   fileUrl: string;
//   onClose: () => void;
// }

// const FullScreenPdfViewer: React.FC<FullScreenPdfViewerProps> = ({ fileUrl, onClose }) => {
//   return (
//     <div className="fixed inset-0 bg-black z-50 flex flex-col">
//       {/* Minimal header with Exit and Download */}
//       <div className="flex items-center justify-between p-2 bg-gray-800">
//         <button
//           onClick={onClose}
//           className="text-white text-sm px-2 py-1 hover:bg-gray-700 rounded"
//         >
//           Exit
//         </button>
//         <a
//           href={fileUrl}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-white text-sm px-2 py-1 hover:bg-gray-700 rounded"
//         >
//           Download
//         </a>
//       </div>
//       {/* Full-screen PDF Viewer */}
//       <div className="flex-grow">
//         <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
//           <Viewer fileUrl={fileUrl} />
//         </Worker>
//       </div>
//     </div>
//   );
// };

// export default FullScreenPdfViewer;
// import React from 'react';
// import { Worker, Viewer } from '@react-pdf-viewer/core';
// import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// import '@react-pdf-viewer/core/lib/styles/index.css';
// import '@react-pdf-viewer/default-layout/lib/styles/index.css';

// interface FullScreenPdfViewerProps {
//   fileUrl: string;
//   onClose: () => void;
// }

// const FullScreenPdfViewer: React.FC<FullScreenPdfViewerProps> = ({ fileUrl, onClose }) => {
//   // Function to convert Google Drive links to direct preview URLs
//   const getViewableUrl = (url: string): string => {
//     const extractFileId = (url: string): string | null => {
//       const regex = /\/file\/d\/([^\/]+)\//;
//       const match = url.match(regex);
//       return match ? match[1] : null;
//     };
    
//     const fileId = extractFileId(url);
//     return fileId 
//       ? `https://drive.google.com/file/d/${fileId}/preview` 
//       : url;
//   };

//   const viewableUrl = getViewableUrl(fileUrl);
//   const defaultLayoutPluginInstance = defaultLayoutPlugin();

//   return (
//     <div className="fixed inset-0 bg-black z-50 flex flex-col">
//       {/* Minimal header with Exit and Download */}
//       <div className="flex items-center justify-between p-2 bg-gray-800">
//         <button
//           onClick={onClose}
//           className="text-white text-sm px-2 py-1 hover:bg-gray-700 rounded"
//         >
//           Exit
//         </button>
//         <a
//           href={fileUrl}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-white text-sm px-2 py-1 hover:bg-gray-700 rounded"
//           download
//         >
//           Download
//         </a>
//       </div>
//       {/* Full-screen PDF Viewer */}
//       <div className="flex-grow bg-white">
//         <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
//           <Viewer 
//             fileUrl={viewableUrl}
//             plugins={[defaultLayoutPluginInstance]}
//           />
//         </Worker>
//       </div>
//     </div>
//   );
// };

// export default FullScreenPdfViewer;
// frontend/components/FullScreenPdfViewer.tsx
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ArrowLeft, Download, X } from "lucide-react"

interface FullScreenPdfViewerProps {
  fileUrl: string | null | undefined
  onClose: () => void
}

const extractFileId = (url: string | null | undefined): string | null => {
  // Check if URL is undefined or null
  if (!url) return null

  // Handle file URLs: /file/d/{fileId}/
  const fileRegex = /\/file\/d\/([^/]+)\//
  const fileMatch = url.match(fileRegex)
  if (fileMatch) return fileMatch[1]

  // Handle folder URLs: /folders/{folderId}
  const folderRegex = /\/folders\/([^/?]+)/
  const folderMatch = url.match(folderRegex)
  if (folderMatch) return folderMatch[1]

  return null
}

const FullScreenPdfViewer: React.FC<FullScreenPdfViewerProps> = ({ fileUrl, onClose }) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>("")

  useEffect(() => {
    try {
      // Check if fileUrl is defined
      if (!fileUrl) {
        setError("No URL provided")
        setLoading(false)
        return
      }

      const fileId = extractFileId(fileUrl)
      if (fileId) {
        // Check if it's a folder URL
        if (fileUrl.includes("/folders/")) {
          // For folders, use the embedded folder view
          setPreviewUrl(`https://drive.google.com/embeddedfolderview?id=${fileId}#list`)
        } else {
          // For files, use Google Drive's preview with a direct link
          setPreviewUrl(`https://drive.google.com/file/d/${fileId}/preview`)
        }
      } else {
        // If we can't extract a file ID, use the original URL
        setPreviewUrl(fileUrl)
        console.warn("Could not extract file ID from URL:", fileUrl)
      }
    } catch (err) {
      setError("Failed to generate preview URL")
      console.error("Error generating preview URL:", err)
    } finally {
      setLoading(false)
    }
  }, [fileUrl])

  const handleDownload = () => {
    const fileId = extractFileId(fileUrl)
    if (fileId) {
      // Create direct download link
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`
      // Open in new tab
      window.open(downloadUrl, "_blank")
    } else {
      alert("Download link could not be generated")
    }
  }

  const handleIframeError = () => {
    setError("Unable to load preview due to access restrictions. Try opening in a new tab.")
  }

  return (
    <div className="fixed inset-0 bg-gray-900 z-50 flex flex-col">
      {/* Header */}
      <div className="bg-gray-800 p-4 flex justify-between items-center">
        <button onClick={onClose} className="text-white flex items-center hover:text-blue-300">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to materials
        </button>
        <div className="flex space-x-4">
          <button
            onClick={handleDownload}
            className="bg-blue-600 text-white px-2 py- rounded flex items-center hover:bg-blue-700"
          >
            <Download className="h-2 w-2 mr-2" />
            Download
          </button>
          <button onClick={onClose} className="text-gray-300 hover:text-white">
            <X className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 bg-gray-900">
        {loading ? (
          <div className="h-full flex items-center justify-center">
            <p className="text-white text-xl">Loading document...</p>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center">
            {error ? (
              <div className="text-center p-2">
                <p className="text-red-500 text-sm mb-4">{error}</p>
                <button
                  onClick={() => window.open(previewUrl, "_blank")}
                  className="bg-blue-600 text-white px-1 py-1 rounded hover:bg-blue-700"
                >
                  Open in New Tab
                </button>
              </div>
            ) : (
              <>
                <iframe
                  src={previewUrl}
                  className="w-full h-full border-none"
                  title="Document Preview"
                  allowFullScreen
                  onLoad={() => console.log("iframe loaded")}
                  onError={handleIframeError}
                />
                <div className="absolute bottom-4 right-4">
                  <button
                    onClick={() => window.open(previewUrl, "_blank")}
                    className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600"
                  >
                    Open in New Tab
                  </button>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default FullScreenPdfViewer

