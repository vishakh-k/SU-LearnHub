import { useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface Material {
  id: string;
  title: string;
  description?: string;
  type: string;
  file_path?: string;
  file_size?: number;
  uploaded_by: string;
  course?: string;
  subject?: string;
  uploaded_at: string;
  downloads_count: number;
  views_count: number;
  is_public: boolean;
}

// In-memory storage for demo purposes
const materialsStore: Material[] = [
  {
    id: "1",
    title: "Introduction to React",
    description: "Basics of React and components",
    type: "pdf",
    uploaded_by: "Dr. Smith",
    course: "Web Development",
    subject: "Frontend",
    uploaded_at: new Date().toISOString(),
    downloads_count: 12,
    views_count: 45,
    is_public: true,
  },
  {
    id: "2",
    title: "TypeScript Guide",
    description: "Complete TypeScript tutorial",
    type: "pdf",
    uploaded_by: "Prof. Johnson",
    course: "Web Development",
    subject: "Backend",
    uploaded_at: new Date().toISOString(),
    downloads_count: 8,
    views_count: 30,
    is_public: true,
  },
];

export const useMaterials = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [materials, setMaterials] = useState<Material[]>(materialsStore);
  const { user } = useAuth();
  const { toast } = useToast();

  const uploadMaterial = useCallback(
    async (
      file: File,
      title: string,
      description: string,
      course: string,
      subject: string,
      isPublic: boolean = true
    ) => {
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to upload materials",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);
      try {
        // Simulate file upload delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newMaterial: Material = {
          id: Date.now().toString(),
          title,
          description,
          type: file.name.split(".").pop() || "file",
          uploaded_by: user.name || "Student",
          course,
          subject,
          uploaded_at: new Date().toISOString(),
          downloads_count: 0,
          views_count: 0,
          is_public: isPublic,
        };

        setMaterials((prev) => [newMaterial, ...prev]);

        toast({
          title: "Success",
          description: "Material uploaded successfully",
        });

        return newMaterial;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to upload material";
        toast({
          title: "Upload failed",
          description: errorMessage,
          variant: "destructive",
        });
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [user, toast]
  );

  const fetchMaterials = useCallback(
    async (filters?: { course?: string; subject?: string }) => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        let filtered = materialsStore;

        if (filters?.course) {
          filtered = filtered.filter(
            (m) => m.course?.toLowerCase() === filters.course?.toLowerCase()
          );
        }

        if (filters?.subject) {
          filtered = filtered.filter(
            (m) => m.subject?.toLowerCase() === filters.subject?.toLowerCase()
          );
        }

        setMaterials(filtered);
        return filtered;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to fetch materials";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        return [];
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  const downloadMaterial = useCallback(
    async (materialId: string) => {
      try {
        setMaterials((prev) =>
          prev.map((m) =>
            m.id === materialId
              ? { ...m, downloads_count: m.downloads_count + 1 }
              : m
          )
        );

        toast({
          title: "Success",
          description: "Download started",
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to download material";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      }
    },
    [toast]
  );

  const deleteMaterial = useCallback(
    async (materialId: string) => {
      setIsLoading(true);
      try {
        setMaterials((prev) => prev.filter((m) => m.id !== materialId));
        toast({
          title: "Success",
          description: "Material deleted successfully",
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to delete material";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  return {
    isLoading,
    materials,
    uploadMaterial,
    fetchMaterials,
    downloadMaterial,
    deleteMaterial,
  };
};
