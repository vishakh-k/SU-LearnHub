import { useState, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface Meeting {
  id: string;
  title: string;
  description?: string;
  meeting_type: "LECTURE" | "DISCUSSION" | "STUDY_GROUP" | "WORKSHOP";
  scheduled_by: string;
  start_time: string;
  end_time: string;
  meeting_link?: string;
  location?: string;
  max_participants?: number;
  status: "SCHEDULED" | "ONGOING" | "COMPLETED" | "CANCELLED";
  created_at: string;
}

// In-memory storage for demo purposes
const meetingsStore: Meeting[] = [
  {
    id: "1",
    title: "Introduction to React Hooks",
    description: "Learn about React Hooks and how to use them effectively",
    meeting_type: "LECTURE",
    scheduled_by: "Dr. Smith",
    start_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(
      Date.now() + 2 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000
    ).toISOString(),
    meeting_link: "https://meet.google.com/xyz",
    status: "SCHEDULED",
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Web Development Q&A Session",
    description: "Ask your questions about web development",
    meeting_type: "DISCUSSION",
    scheduled_by: "Prof. Johnson",
    start_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    end_time: new Date(
      Date.now() + 3 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000
    ).toISOString(),
    status: "SCHEDULED",
    created_at: new Date().toISOString(),
  },
];

export const useMeetings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [meetings, setMeetings] = useState<Meeting[]>(meetingsStore);
  const { user } = useAuth();
  const { toast } = useToast();

  const createMeeting = useCallback(
    async (meetingData: {
      title: string;
      description?: string;
      meeting_type: "LECTURE" | "DISCUSSION" | "STUDY_GROUP" | "WORKSHOP";
      start_time: string;
      end_time: string;
      meeting_link?: string;
      location?: string;
      max_participants?: number;
    }) => {
      if (!user) {
        toast({
          title: "Error",
          description: "You must be logged in to create meetings",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const newMeeting: Meeting = {
          id: Date.now().toString(),
          ...meetingData,
          scheduled_by: user.name || "Faculty",
          status: "SCHEDULED",
          created_at: new Date().toISOString(),
        };

        setMeetings((prev) => [newMeeting, ...prev]);

        toast({
          title: "Success",
          description: "Meeting created successfully",
        });

        return newMeeting;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to create meeting";
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
    [user, toast]
  );

  const fetchMeetings = useCallback(
    async (filters?: {
      upcomingOnly?: boolean;
      status?: "SCHEDULED" | "ONGOING" | "COMPLETED" | "CANCELLED";
    }) => {
      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        let filtered = meetingsStore;

        if (filters?.upcomingOnly) {
          const now = new Date();
          filtered = filtered.filter((m) => new Date(m.start_time) > now);
        }

        if (filters?.status) {
          filtered = filtered.filter((m) => m.status === filters.status);
        }

        setMeetings(filtered);
        return filtered;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to fetch meetings";
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

  const joinMeeting = useCallback(
    async (meetingId: string) => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        toast({
          title: "Success",
          description: "Joined meeting successfully",
        });

        // In a real app, open the meeting link
        const meeting = meetings.find((m) => m.id === meetingId);
        if (meeting?.meeting_link) {
          window.open(meeting.meeting_link, "_blank");
        }

        return true;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to join meeting";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        return false;
      }
    },
    [meetings, toast]
  );

  const leaveMeeting = useCallback(
    async (meetingId: string) => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        toast({
          title: "Success",
          description: "Left meeting successfully",
        });

        return true;
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Failed to leave meeting";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        return false;
      }
    },
    [toast]
  );

  const fetchMeetingParticipants = useCallback(
    async (meetingId: string) => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        return [
          { id: "1", name: "John Doe", status: "joined" },
          { id: "2", name: "Jane Smith", status: "joined" },
        ];
      } catch (error) {
        const errorMessage =
          error instanceof Error
            ? error.message
            : "Failed to fetch participants";
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        });
        return [];
      }
    },
    [toast]
  );

  return {
    isLoading,
    meetings,
    createMeeting,
    fetchMeetings,
    joinMeeting,
    leaveMeeting,
    fetchMeetingParticipants,
  };
};
