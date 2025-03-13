export interface User {
  id: string;
  name: string;
  email: string;
  bookmarks: string[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  materials: Material[];
}

export interface Material {
   id: string;
  name: string;
  // type: 'pdf' | 'doc' | 'ppt' | 'image' | 'other';
  // driveId: string;
  // previewUrl: string;
  url: string;
  
}

export interface Year {
  id: number;
  name: string;
  planet: string;
  planetImage: string;
  semesters: Semester[];
}

export interface Semester {
  id: string;
  name: string;
  subjects: Subject[];
}