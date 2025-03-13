export interface Material {
  id: string;
  name: string;
  url: string;
}

export const fetchMaterials = async (subjectCode: string): Promise<Material[]> => {
  try {
    const response = await fetch(`https://aero-study.vercel.app/api/files/${subjectCode}`);
    if (!response.ok) throw new Error("Failed to fetch materials");
    const data = await response.json();
    console.log("Fetched data for", subjectCode, data);
    
    // If data is an array, map over it.
    if (Array.isArray(data)) {
      return data.map((file: any) => ({
        id: file.id,
        name: file.name,
        url: file.webViewLink,
      }));
    }
    
    // Otherwise, if data.files is an array, map over that.
    if (data && Array.isArray(data.files)) {
      return data.files.map((file: any) => ({
        id: file.id,
        name: file.name,
        url: file.webViewLink,
      }));
    }
    
    // If neither, return an empty array.
    return [];
  } catch (error) {
    console.error("Error fetching materials:", error);
    return [];
  }
};
