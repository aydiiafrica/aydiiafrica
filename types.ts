/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Project {
  title: string;
  description: string;
  category: string;
  mainImage: any;
  imageGallery: Media[];
  videoGallery: Media[];
  documentGallery: Media[];
  content: any[];
}

export interface Media {
  type: 'image' | 'video';
  title?: string;
  file: any;
  asset?: any;
  thumbnail?: any;
  video?: any;
  videoFile?: any;
  documentFile?: any;
  documentName?: any;
}

export interface TeamMember {
  _id?: string;
  slug: any;
  fullName: string;
  avatar: any;
  content: any;
  specificity?: any;
  role: string;
}
