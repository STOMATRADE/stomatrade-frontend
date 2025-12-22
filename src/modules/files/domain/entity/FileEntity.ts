export type FileEntity = {
    id: string;
    originalName: string;
    fileName: string;
    mimeType: string;
    size: number;
    path: string;
    referenceId?: string;
    referenceType?: string;
    uploadedBy: string;
    createdAt: string;
    updatedAt: string;
};