import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";

export interface AlumniMentor {
  id: string;
  name: string;
  email: string;
  specialization: string;
  bio: string;
  company?: string;
  yearsOfExperience: number;
  rating: number;
  studentsHelped: number;
  isAvailable: boolean;
  slots: string[];
}

export interface MentorSession {
  id: string;
  mentorId: string;
  mentorName: string;
  studentId: string;
  topic: string;
  scheduledTime: string;
  duration: number; // in minutes
  status: "scheduled" | "ongoing" | "completed" | "cancelled";
  meetingLink: string;
}

// Mock alumni mentors data
const alumniMentorsData: AlumniMentor[] = [
  {
    id: "alum1",
    name: "Arjun Kumar",
    email: "arjun.kumar@techcorp.com",
    specialization: "Full Stack Development",
    bio: "Senior Developer at TechCorp with 5+ years of experience in React and Node.js",
    company: "TechCorp Solutions",
    yearsOfExperience: 5,
    rating: 4.8,
    studentsHelped: 127,
    isAvailable: true,
    slots: ["Monday 6PM", "Wednesday 7PM", "Saturday 3PM"],
  },
  {
    id: "alum2",
    name: "Priya Sharma",
    email: "priya.sharma@datainsights.com",
    specialization: "Data Science & ML",
    bio: "Data Scientist at DataInsights, expert in machine learning and Python",
    company: "DataInsights Inc",
    yearsOfExperience: 4,
    rating: 4.9,
    studentsHelped: 95,
    isAvailable: true,
    slots: ["Tuesday 6PM", "Thursday 7PM", "Sunday 4PM"],
  },
  {
    id: "alum3",
    name: "Rahul Patel",
    email: "rahul.patel@cloudtech.com",
    specialization: "Cloud Architecture & DevOps",
    bio: "Cloud Architect at CloudTech, specializing in AWS and containerization",
    company: "CloudTech Systems",
    yearsOfExperience: 6,
    rating: 4.7,
    studentsHelped: 110,
    isAvailable: true,
    slots: ["Monday 7PM", "Friday 6PM"],
  },
  {
    id: "alum4",
    name: "Neha Singh",
    email: "neha.singh@webdesign.com",
    specialization: "Frontend & UI/UX",
    bio: "UI/UX Designer at WebDesign Co, passionate about creating beautiful interfaces",
    company: "WebDesign Co",
    yearsOfExperience: 3,
    rating: 4.9,
    studentsHelped: 82,
    isAvailable: true,
    slots: ["Tuesday 5PM", "Thursday 6PM", "Saturday 2PM"],
  },
];

export const useAlumniMentoring = () => {
  const [mentors, setMentors] = useState<AlumniMentor[]>(alumniMentorsData);
  const [sessions, setSessions] = useState<MentorSession[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const fetchMentors = useCallback(
    async (specialization?: string) => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        let filtered = alumniMentorsData;

        if (specialization) {
          filtered = filtered.filter((m) =>
            m.specialization
              .toLowerCase()
              .includes(specialization.toLowerCase())
          );
        }

        setMentors(filtered);
        return filtered;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to fetch mentors";
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

  const bookSession = useCallback(
    async (
      mentorId: string,
      topic: string,
      scheduledTime: string,
      duration: number = 30
    ) => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mentor = alumniMentorsData.find((m) => m.id === mentorId);
        if (!mentor) {
          throw new Error("Mentor not found");
        }

        const newSession: MentorSession = {
          id: Date.now().toString(),
          mentorId,
          mentorName: mentor.name,
          studentId: "student1", // In real app, from auth context
          topic,
          scheduledTime,
          duration,
          status: "scheduled",
          meetingLink: `https://meet.google.com/${Date.now()}`,
        };

        setSessions((prev) => [newSession, ...prev]);

        toast({
          title: "Success",
          description: `Mentoring session booked with ${mentor.name}`,
        });

        return newSession;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to book session";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  const fetchSessions = useCallback(
    async (studentId?: string) => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        let filtered = sessions;

        if (studentId) {
          filtered = filtered.filter((s) => s.studentId === studentId);
        }

        return filtered;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to fetch sessions";
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
    [sessions, toast]
  );

  const cancelSession = useCallback(
    async (sessionId: string) => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        setSessions((prev) =>
          prev.map((s) =>
            s.id === sessionId ? { ...s, status: "cancelled" } : s
          )
        );

        toast({
          title: "Success",
          description: "Session cancelled",
        });
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to cancel session";
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
    mentors,
    sessions,
    isLoading,
    fetchMentors,
    bookSession,
    fetchSessions,
    cancelSession,
  };
};
