
// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { ArrowLeft, FileText, Download, Eye } from 'lucide-react';
// import { yearsData as initialYearsData } from '../data/yearsData';
// import { fetchMaterials } from '../data/fetchMaterial';
// import { useAuth } from '../context/AuthContext';

// const SubjectPage: React.FC = () => {
//   const { subjectId } = useParams<{ subjectId: string }>();
//   const { isAuthenticated, user, addBookmark, removeBookmark } = useAuth();

//   // We'll store subject details (subject info plus its parent year and semester) in state
//   const [subjectDetails, setSubjectDetails] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   // Use a ref to cache fetched materials for this subject
//   const cachedMaterialsRef = useRef<null | any[]>(null);

//   useEffect(() => {
//     const loadDataForSubject = async () => {
//       // Clone the static data to avoid mutating the original object
//       const clonedData = JSON.parse(JSON.stringify(initialYearsData));
//       let foundSubject = null;
//       let foundYear = null;
//       let foundSemester = null;

//       // Find the subject using subjectId
//       for (const year of clonedData) {
//         for (const semester of year.semesters) {
//           const subject = semester.subjects.find(s => s.id === subjectId);
//           if (subject) {
//             foundSubject = subject;
//             foundYear = year;
//             foundSemester = semester;
//             break;
//           }
//         }
//         if (foundSubject) break;
//       }

//       if (!foundSubject) {
//         setSubjectDetails(null);
//         setLoading(false);
//         return;
//       }

//       // If we have cached materials, use them.
//       if (cachedMaterialsRef.current) {
//         foundSubject.materials = cachedMaterialsRef.current;
//       } else if (foundSubject.code) {
//         try {
//           // Fetch materials only once.
//           const materials = await fetchMaterials(foundSubject.code);
//           console.log(`Fetched materials for ${foundSubject.name}:`, materials);
//           foundSubject.materials = materials;
//           cachedMaterialsRef.current = materials; // cache the result
//         } catch (error) {
//           console.error(`Error fetching materials for ${foundSubject.name}:`, error);
//           foundSubject.materials = [];
//           cachedMaterialsRef.current = [];
//         }
//       }

//       setSubjectDetails({
//         subject: foundSubject,
//         year: foundYear,
//         semester: foundSemester,
//       });
//       setLoading(false);
//     };

//     if (subjectId) {
//       loadDataForSubject();
//     } else {
//       setLoading(false);
//     }
//   }, [subjectId]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
//         <p className="text-xl">Loading...</p>
//       </div>
//     );
//   }

//   if (!subjectDetails) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">Subject not found</h2>
//           <Link to="/years" className="text-blue-400 hover:underline">Back to years</Link>
//         </div>
//       </div>
//     );
//   }

//   const { subject: foundSubject, year: foundYear, semester: foundSemester } = subjectDetails;
//   const isBookmarked = user?.bookmarks.includes(subjectId || '');

//   const toggleBookmark = () => {
//     if (!subjectId) return;
//     isBookmarked ? removeBookmark(subjectId) : addBookmark(subjectId);
//   };

//   return (
//     <div className="min-h-screen py-12 px-4 bg-gray-900 text-white">
//       <div className="max-w-7xl mx-auto">
//         <div className="mb-8">
//           <Link to={`/year/${foundYear.id}/semester/${foundSemester.id}`} className="inline-flex items-center text-blue-400 hover:text-blue-300">
//             <ArrowLeft className="h-4 w-4 mr-1" />
//             Back to {foundSemester.name}
//           </Link>
//         </div>

//         <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 mb-8">
//           <div className="flex flex-col md:flex-row justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-white mb-2">{foundSubject.name}</h1>
//               <div className="flex items-center mb-4">
//                 <span className="bg-blue-900 text-blue-200 text-sm px-2 py-1 rounded mr-3">{foundSubject.code}</span>
//                 <span className="text-gray-400">{foundYear.name} • {foundSemester.name}</span>
//               </div>
//               <p className="text-gray-300 max-w-2xl">
//                 Access all study materials for {foundSubject.name}. Preview documents online or download them for offline study.
//               </p>
//             </div>

//             {isAuthenticated && (
//               <div className="mt-4 md:mt-0">
//                 <button
//                   onClick={toggleBookmark}
//                   className={`flex items-center px-4 py-2 rounded-lg ${
//                     isBookmarked ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                   } transition-colors duration-300`}
//                 >
//                   {isBookmarked ? (
//                     <>
//                       <span className="mr-2">✓</span>
//                       Bookmarked
//                     </>
//                   ) : (
//                     <>
//                       <span className="mr-2">+</span>
//                       Add Bookmark
//                     </>
//                   )}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {Array.isArray(foundSubject.materials) && foundSubject.materials.length > 0 ? (
//             foundSubject.materials.map((material, index) => (
//               <div key={index} className="border border-white p-4 rounded-md">
//                 <h3 className="text-xl font-semibold">{material.name}</h3>
//                 <a 
//                   href={material.url} 
//                   target="_blank" 
//                   rel="noopener noreferrer" 
//                   className="text-blue-300 hover:underline"
//                 >
//                   Preview
//                 </a>
//               </div>
//             ))
//           ) : (
//             <div className="text-center py-12">
//               <p className="text-gray-400">No materials available for this subject yet.</p>
//             </div>
//           )}
//         </div>

//         <div className="mt-8">
//           <Link to="/years" className="text-blue-400 hover:underline">Back to years</Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SubjectPage;
// frontend/components/SubjectPage.tsx
// import React, { useState, useEffect, useRef } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { ArrowLeft, FileText, Download, Eye } from 'lucide-react';
// import { yearsData as initialYearsData } from '../data/yearsData';
// import { fetchMaterials } from '../data/fetchMaterial';
// import { useAuth } from '../context/AuthContext';

// const extractFileId = (url: string): string | null => {
//   // Example: "https://drive.google.com/file/d/1U9XdlWott7AeGvl7XtDnjNslmezZfDMk/view?usp=drivesdk"
//   const parts = url.split('/');
//   const index = parts.indexOf('d');
//   if (index !== -1 && parts.length > index + 1) {
//     return parts[index + 1];
//   }
//   return null;
// };

// const SubjectPage: React.FC = () => {
//   const { subjectId } = useParams<{ subjectId: string }>();
//   const { isAuthenticated, user, addBookmark, removeBookmark } = useAuth();

//   const [subjectDetails, setSubjectDetails] = useState<any>(null);
//   const [loading, setLoading] = useState(true);
//   const [showPreview, setShowPreview] = useState(false);
//   const [previewUrl, setPreviewUrl] = useState<string>('');
//   const cachedMaterialsRef = useRef<null | any[]>(null);

//   useEffect(() => {
//     const loadDataForSubject = async () => {
//       const clonedData = JSON.parse(JSON.stringify(initialYearsData));
//       let foundSubject = null;
//       let foundYear = null;
//       let foundSemester = null;

//       for (const year of clonedData) {
//         for (const semester of year.semesters) {
//           const subject = semester.subjects.find(s => s.id === subjectId);
//           if (subject) {
//             foundSubject = subject;
//             foundYear = year;
//             foundSemester = semester;
//             break;
//           }
//         }
//         if (foundSubject) break;
//       }

//       if (!foundSubject) {
//         setSubjectDetails(null);
//         setLoading(false);
//         return;
//       }

//       if (!cachedMaterialsRef.current && foundSubject.code) {
//         try {
//           const materials = await fetchMaterials(foundSubject.code);
//           console.log(`Fetched materials for ${foundSubject.name}:`, materials);
//           foundSubject.materials = materials;
//           cachedMaterialsRef.current = materials;
//         } catch (error) {
//           console.error(`Error fetching materials for ${foundSubject.name}:`, error);
//           foundSubject.materials = [];
//           cachedMaterialsRef.current = [];
//         }
//       } else if (cachedMaterialsRef.current) {
//         foundSubject.materials = cachedMaterialsRef.current;
//       }

//       setSubjectDetails({
//         subject: foundSubject,
//         year: foundYear,
//         semester: foundSemester,
//       });
//       setLoading(false);
//     };

//     if (subjectId) {
//       loadDataForSubject();
//     } else {
//       setLoading(false);
//     }
//   }, [subjectId]);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
//         <p className="text-xl">Loading...</p>
//       </div>
//     );
//   }

//   if (!subjectDetails) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
//         <div className="text-center">
//           <h2 className="text-2xl font-bold mb-4">Subject not found</h2>
//           <Link to="/years" className="text-blue-400 hover:underline">Back to years</Link>
//         </div>
//       </div>
//     );
//   }

//   const { subject: foundSubject, year: foundYear, semester: foundSemester } = subjectDetails;
//   const isBookmarked = user?.bookmarks.includes(subjectId || '');

//   const toggleBookmark = () => {
//     if (!subjectId) return;
//     isBookmarked ? removeBookmark(subjectId) : addBookmark(subjectId);
//   };

//   const handlePreviewClick = (materialUrl: string) => {
//     const fileId = extractFileId(materialUrl);
//     if (fileId) {
//       // Construct the drive preview URL
//       const preview = `https://drive.google.com/file/d/${fileId}/preview`;
//       setPreviewUrl(preview);
//       setShowPreview(true);
//     } else {
//       console.error("Unable to extract file ID from URL:", materialUrl);
//     }
//   };

//   return (
//     <div className="min-h-screen py-12 px-4 bg-gray-900 text-white">
//       <div className="max-w-7xl mx-auto">
//         {/* Back link */}
//         <div className="mb-8">
//           <Link to={`/year/${foundYear.id}/semester/${foundSemester.id}`} className="inline-flex items-center text-blue-400 hover:text-blue-300">
//             <ArrowLeft className="h-4 w-4 mr-1" />
//             Back to {foundSemester.name}
//           </Link>
//         </div>

//         {/* Subject Details */}
//         <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 mb-8">
//           <div className="flex flex-col md:flex-row justify-between">
//             <div>
//               <h1 className="text-3xl font-bold text-white mb-2">{foundSubject.name}</h1>
//               <div className="flex items-center mb-4">
//                 <span className="bg-blue-900 text-blue-200 text-sm px-2 py-1 rounded mr-3">{foundSubject.code}</span>
//                 <span className="text-gray-400">{foundYear.name} • {foundSemester.name}</span>
//               </div>
//               <p className="text-gray-300 max-w-2xl">
//                 Access all study materials for {foundSubject.name}. Preview documents online or download them for offline study.
//               </p>
//             </div>

//             {isAuthenticated && (
//               <div className="mt-4 md:mt-0">
//                 <button
//                   onClick={toggleBookmark}
//                   className={`flex items-center px-4 py-2 rounded-lg ${
//                     isBookmarked ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
//                   } transition-colors duration-300`}
//                 >
//                   {isBookmarked ? (
//                     <>
//                       <span className="mr-2">✓</span>
//                       Bookmarked
//                     </>
//                   ) : (
//                     <>
//                       <span className="mr-2">+</span>
//                       Add Bookmark
//                     </>
//                   )}
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* Materials List */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {Array.isArray(foundSubject.materials) && foundSubject.materials.length > 0 ? (
//             foundSubject.materials.map((material, index) => (
//               <div key={index} className="border border-white p-4 rounded-md">
//                 <h3 className="text-xl font-semibold">{material.name}</h3>
//                 <div className="mt-2 flex space-x-4">
//                   {/* Preview Button: Opens modal */}
//                   <button
//                     onClick={() => handlePreviewClick(material.url)}
//                     className="text-blue-300 hover:underline"
//                   >
//                     Preview
//                   </button>
//                   {/* Direct Download Button */}
//                   <a
//                     href={material.url.replace(/\/file\/d\/(.*?)\/view.*/, "/uc?export=download&id=$1")}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-blue-300 hover:underline"
//                   >
//                     Download
//                   </a>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <div className="text-center py-12">
//               <p className="text-gray-400">No materials available for this subject yet.</p>
//             </div>
//           )}
//         </div>

//         <div className="mt-8">
//           <Link to="/years" className="text-blue-400 hover:underline">Back to years</Link>
//         </div>
//       </div>

//       {/* Modal for Preview */}
//       {showPreview && (
//         <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
//           <div className="relative bg-gray-800 p-4 rounded-lg max-w-3xl w-full">
//             <button
//               onClick={() => setShowPreview(false)}
//               className="absolute top-2 right-2 text-white text-xl"
//             >
//               &times;
//             </button>
//             <iframe
//               src={previewUrl}
//               title="Preview"
//               className="w-full h-96 rounded-lg"
//             ></iframe>
//             <div className="mt-4 flex justify-end">
//               <a
//                 href={previewUrl.replace('/preview', '/uc?export=download&id=' + extractFileId(previewUrl))}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//               >
//                 Download
//               </a>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SubjectPage;
// frontend/components/SubjectPage.tsx
// frontend/components/SubjectPage.tsx
// frontend/components/SubjectPage.tsx
// frontend/components/SubjectPage.tsx
// frontend/components/SubjectPage.tsx
// frontend/components/SubjectPage.tsx
"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { yearsData as initialYearsData } from "../data/yearsData"
import { fetchMaterials } from "../data/fetchMaterial"
import { useAuth } from "../context/AuthContext"
import FullScreenPdfViewer from "./FullScreenPdfViewer"

// Define Material interface if not imported
interface Material {
  id: string
  name: string
  url: string
}

// Update the extractFileId function to handle both file and folder URLs and add null checks
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

// Update the getPreviewUrl function to handle different URL types
const getPreviewUrl = (url: string): string => {
  const fileId = extractFileId(url)
  if (!fileId) return url

  // Check if it's a folder URL
  if (url.includes("/folders/")) {
    return `https://drive.google.com/embeddedfolderview?id=${fileId}#list`
  }

  // It's a file URL
  return `https://drive.google.com/file/d/${fileId}/preview`
}

const getDownloadUrl = (url: string): string => {
  const fileId = extractFileId(url)
  return fileId ? `https://drive.google.com/uc?export=download&id=${fileId}` : url
}

const SubjectPage: React.FC = () => {
  const { subjectId } = useParams<{ subjectId: string }>()
  const { isAuthenticated, user, addBookmark, removeBookmark } = useAuth()

  // State for subject details (subject + parent year/semester)
  const [subjectDetails, setSubjectDetails] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  // State for selected material to preview
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null)

  // Ref to cache fetched materials
  const cachedMaterialsRef = useRef<Material[] | null>(null)

  useEffect(() => {
    const loadDataForSubject = async () => {
      // Clone static data
      const clonedData = JSON.parse(JSON.stringify(initialYearsData))
      let foundSubject = null
      let foundYear = null
      let foundSemester = null

      // Locate the subject by id
      for (const year of clonedData) {
        for (const semester of year.semesters) {
          const subject = semester.subjects.find((s: any) => s.id === subjectId)
          if (subject) {
            foundSubject = subject
            foundYear = year
            foundSemester = semester
            break
          }
        }
        if (foundSubject) break
      }

      if (!foundSubject) {
        setSubjectDetails(null)
        setLoading(false)
        return
      }

      // Fetch materials only for this subject
      if (!cachedMaterialsRef.current && foundSubject.code) {
        try {
          const materials = await fetchMaterials(foundSubject.code)
          console.log(`Fetched materials for ${foundSubject.name}:`, materials)
          foundSubject.materials = materials
          cachedMaterialsRef.current = materials
        } catch (error) {
          console.error(`Error fetching materials for ${foundSubject.name}:`, error)
          foundSubject.materials = []
          cachedMaterialsRef.current = []
        }
      } else if (cachedMaterialsRef.current) {
        foundSubject.materials = cachedMaterialsRef.current
      }

      setSubjectDetails({
        subject: foundSubject,
        year: foundYear,
        semester: foundSemester,
      })
      setLoading(false)
    }

    if (subjectId) {
      loadDataForSubject()
    } else {
      setLoading(false)
    }
  }, [subjectId])

  const toggleBookmark = () => {
    if (!subjectId) return
    isAuthenticated ? (user?.bookmarks.includes(subjectId) ? removeBookmark(subjectId) : addBookmark(subjectId)) : null
  }

  // When Preview is clicked, set the selected material and directly open the PDF viewer
  const handlePreviewClick = (material: Material) => {
    // First make sure we have a valid URL
    if (!material.url) {
      console.error("Material URL is missing")
      return
    }

    // Extract the file ID properly
    const fileId = extractFileId(material.url)
    if (!fileId) {
      console.error("Could not extract file ID from URL:", material.url)
      // Fallback to opening the original URL
      window.open(material.url, "_blank")
      return
    }

    // Set the selected material to trigger the PDF viewer
    setSelectedMaterial(material)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <p className="text-xl">Loading...</p>
      </div>
    )
  }

  if (!subjectDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Subject not found</h2>
          <Link to="/years" className="text-blue-400 hover:underline">
            Back to years
          </Link>
        </div>
      </div>
    )
  }

  const { subject: foundSubject, year: foundYear, semester: foundSemester } = subjectDetails
  const isBookmarked = user?.bookmarks.includes(subjectId || "")

  return (
    <>
      {/* Normal Subject Page – Hidden when a material is selected for read mode */}
      <div className={`${selectedMaterial ? "hidden" : "block"} min-h-screen py-12 px-4 bg-gray-900 text-white`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Link
              to={`/year/${foundYear.id}/semester/${foundSemester.id}`}
              className="inline-flex items-center text-blue-400 hover:text-blue-300"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to {foundSemester.name}
            </Link>
          </div>

          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl p-8 mb-8">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">{foundSubject.name}</h1>
                <div className="flex items-center mb-4">
                  <span className="bg-blue-900 text-blue-200 text-sm px-2 py-1 rounded mr-3">{foundSubject.code}</span>
                  <span className="text-gray-400">
                    {foundYear.name} • {foundSemester.name}
                  </span>
                </div>
                <p className="text-gray-300 max-w-2xl">
                  Access all study materials for {foundSubject.name}. Click "Preview" below to read the document in full
                  screen.
                </p>
              </div>

              {isAuthenticated && (
                <div className="mt-4 md:mt-0">
                  <button
                    onClick={toggleBookmark}
                    className={`flex items-center px-4 py-2 rounded-lg ${
                      isBookmarked ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    } transition-colors duration-300`}
                  >
                    {isBookmarked ? (
                      <>
                        <span className="mr-2">✓</span>
                        Bookmarked
                      </>
                    ) : (
                      <>
                        <span className="mr-2">+</span>
                        Add Bookmark
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Materials List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.isArray(foundSubject.materials) && foundSubject.materials.length > 0 ? (
              foundSubject.materials.map((material: Material, index: number) => (
                <div
                  key={index}
                  className="border border-gray-700 bg-gray-800 p-4 rounded-md hover:border-gray-500 transition-colors"
                >
                  <h3 className="text-xl font-semibold">{material.name}</h3>
                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={() => handlePreviewClick(material)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Preview
                    </button>
                    <a
                      href={getDownloadUrl(material.url)}
                      download={material.name}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 transition-colors"
                      onClick={(e) => {
                        // Prevent default if we can't get a file ID
                        if (!extractFileId(material.url)) {
                          e.preventDefault()
                          alert("Download link could not be generated")
                        }
                      }}
                    >
                      Download
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-3 text-center py-12 bg-gray-800 rounded-lg">
                <p className="text-gray-400">No materials available for this subject yet.</p>
              </div>
            )}
          </div>

          <div className="mt-8">
            <Link to="/years" className="text-blue-400 hover:underline">
              Back to years
            </Link>
          </div>
        </div>
      </div>

      {/* Full-Screen PDF Viewer */}
      {selectedMaterial && (
        <FullScreenPdfViewer fileUrl={selectedMaterial.url} onClose={() => setSelectedMaterial(null)} />
      )}
    </>
  )
}

export default SubjectPage

