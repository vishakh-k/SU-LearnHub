import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useAlumniMentoring,
  type AlumniMentor,
} from "@/hooks/use-alumni-mentoring";
import { Star, Calendar, BookOpen, Clock, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AlumniMentoringDialog = () => {
  const [open, setOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState<AlumniMentor | null>(
    null
  );
  const [bookingOpen, setBookingOpen] = useState(false);
  const [topic, setTopic] = useState("");
  const [time, setTime] = useState("");
  const [specialization, setSpecialization] = useState("");

  const { mentors, isLoading, fetchMentors, bookSession } =
    useAlumniMentoring();
  const { toast } = useToast();

  useEffect(() => {
    if (open) {
      fetchMentors(specialization);
    }
  }, [open, specialization, fetchMentors]);

  const handleBookSession = async () => {
    if (!selectedMentor || !topic || !time) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      await bookSession(selectedMentor.id, topic, time);
      setBookingOpen(false);
      setTopic("");
      setTime("");
      setSelectedMentor(null);
    } catch (error) {
      // Error is handled in the hook
    }
  };

  const specializations = [
    "Full Stack Development",
    "Data Science & ML",
    "Cloud Architecture & DevOps",
    "Frontend & UI/UX",
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <BookOpen className="w-4 h-4" />
          Learn from Alumni
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-96 overflow-y-auto">
        <DialogHeader>
          <DialogTitle>🎓 Alumni Mentoring Portal</DialogTitle>
          <DialogDescription>
            Connect with successful alumni and get personalized guidance
          </DialogDescription>
        </DialogHeader>

        {/* Specialization Filter */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="spec">Filter by Specialization</Label>
            <Select value={specialization} onValueChange={setSpecialization}>
              <SelectTrigger id="spec">
                <SelectValue placeholder="All specializations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Specializations</SelectItem>
                {specializations.map((spec) => (
                  <SelectItem key={spec} value={spec}>
                    {spec}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Mentors Grid */}
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Loading mentors...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 max-h-64 overflow-y-auto">
              {mentors.map((mentor) => (
                <div
                  key={mentor.id}
                  className="border border-border rounded-lg p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-card-foreground">
                        {mentor.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {mentor.company}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-100 px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      <span className="text-sm font-medium">
                        {mentor.rating}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-card-foreground mb-2">
                    {mentor.bio}
                  </p>

                  <div className="grid grid-cols-3 gap-3 mb-4 text-sm">
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {mentor.specialization}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {mentor.yearsOfExperience}y exp
                      </span>
                    </div>
                    <div className="text-muted-foreground">
                      Helped {mentor.studentsHelped}+ students
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {mentor.slots.map((slot) => (
                      <span
                        key={slot}
                        className="text-xs bg-primary/10 text-primary px-2 py-1 rounded"
                      >
                        {slot}
                      </span>
                    ))}
                  </div>

                  <Button
                    className="w-full"
                    variant="outline"
                    onClick={() => {
                      setSelectedMentor(mentor);
                      setBookingOpen(true);
                    }}
                    disabled={!mentor.isAvailable}
                  >
                    {mentor.isAvailable ? "Book Session" : "Unavailable"}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>
      </DialogContent>

      {/* Booking Dialog */}
      <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Book Session with {selectedMentor?.name}</DialogTitle>
            <DialogDescription>
              Schedule a mentoring session on your chosen topic
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="topic">Topic *</Label>
              <Input
                id="topic"
                placeholder="e.g., React Hooks, Machine Learning Basics"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="time">Preferred Time Slot *</Label>
              <Select value={time} onValueChange={setTime}>
                <SelectTrigger id="time">
                  <SelectValue placeholder="Select a time slot" />
                </SelectTrigger>
                <SelectContent>
                  {selectedMentor?.slots.map((slot) => (
                    <SelectItem key={slot} value={slot}>
                      {slot}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <p className="text-sm text-muted-foreground">
              ⏱️ Duration: 30 minutes | 📹 Video Call via Google Meet
            </p>

            <div className="flex gap-2 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  setBookingOpen(false);
                  setTopic("");
                  setTime("");
                }}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleBookSession}
                disabled={!topic || !time}
              >
                Confirm Booking
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Dialog>
  );
};
