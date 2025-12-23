# LearnHub Module Reference Guide

## 1. Authentication Module

### AuthContext Usage:

```tsx
import { useAuth } from "@/contexts/AuthContext";

const MyComponent = () => {
  const { user, session, isLoading, signUp, signIn, signOut, error } = useAuth();

  // user object structure:
  // {
  //   id: string,
  //   email: string,
  //   name?: string,
  //   role?: "student" | "faculty" | "admin"
  // }

  const handleSignUp = async () => {
    try {
      await signUp("user@example.com", "password", "User Name", "student");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignIn = async () => {
    try {
      await signIn("user@example.com", "password");
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    // Your component JSX
  );
};
```

## 2. Materials Management Module

### useMaterials Hook Usage:

```tsx
import { useMaterials } from "@/hooks/use-materials";

const MyComponent = () => {
  const {
    isLoading,
    materials,
    uploadMaterial,
    fetchMaterials,
    downloadMaterial,
    deleteMaterial,
  } = useMaterials();

  // Upload a material
  const handleUpload = async () => {
    const file = new File([], "document.pdf");
    try {
      await uploadMaterial(
        file,
        "Material Title",
        "Description",
        "Data Structures",
        "Notes",
        true // isPublic
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch materials with filters
  const handleFetchMaterials = async () => {
    await fetchMaterials({
      course: "Data Structures",
      subject: "Notes",
      uploadedBy: "userId",
    });
  };

  // Download material
  const handleDownload = (material) => {
    downloadMaterial(material);
  };

  // Delete material
  const handleDelete = async (materialId) => {
    await deleteMaterial(materialId);
  };

  return (
    <div>
      {materials.map((material) => (
        <div key={material.id}>
          <h3>{material.title}</h3>
          <p>
            {material.course} - {material.subject}
          </p>
          <p>Downloads: {material.downloads_count}</p>
          <button onClick={() => handleDownload(material)}>Download</button>
          <button onClick={() => handleDelete(material.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
```

## 3. Meetings Management Module

### useMeetings Hook Usage:

```tsx
import { useMeetings } from "@/hooks/use-meetings";

const MyComponent = () => {
  const {
    isLoading,
    meetings,
    createMeeting,
    fetchMeetings,
    joinMeeting,
    leaveMeeting,
    fetchMeetingParticipants,
  } = useMeetings();

  // Create a meeting
  const handleCreateMeeting = async () => {
    try {
      await createMeeting({
        title: "Data Structures Class",
        description: "Unit 3 - Trees and Graphs",
        meeting_type: "LECTURE",
        start_time: "2025-12-25T10:00:00",
        end_time: "2025-12-25T11:30:00",
        meeting_link: "https://meet.google.com/...",
        location: "Room 101",
        max_participants: 100,
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Fetch meetings
  const handleFetchMeetings = async () => {
    await fetchMeetings({
      status: "SCHEDULED",
      meetingType: "LECTURE",
      upcomingOnly: true,
    });
  };

  // Join a meeting
  const handleJoinMeeting = async (meetingId) => {
    await joinMeeting(meetingId);
  };

  // Leave a meeting
  const handleLeaveMeeting = async (meetingId) => {
    await leaveMeeting(meetingId);
  };

  // Get meeting participants
  const handleFetchParticipants = async (meetingId) => {
    const participants = await fetchMeetingParticipants(meetingId);
    console.log(participants);
  };

  return (
    <div>
      {meetings.map((meeting) => (
        <div key={meeting.id}>
          <h3>{meeting.title}</h3>
          <p>
            {meeting.meeting_type} - {meeting.status}
          </p>
          <p>{new Date(meeting.start_time).toLocaleString()}</p>
          <button onClick={() => handleJoinMeeting(meeting.id)}>
            Join Meeting
          </button>
        </div>
      ))}
    </div>
  );
};
```

## 4. UploadMaterialDialog Component

### Usage:

```tsx
import { UploadMaterialDialog } from "@/components/UploadMaterialDialog";

const MyComponent = () => {
  const handleUploadSuccess = () => {
    // Refresh materials list
    console.log("Material uploaded successfully!");
  };

  return (
    <div>
      <UploadMaterialDialog onSuccess={handleUploadSuccess} />
    </div>
  );
};
```

### Component Props:

- `onSuccess?: () => void` - Callback after successful upload

### Supported File Types:

- PDF (.pdf)
- Documents (.doc, .docx)
- Presentations (.ppt, .pptx)
- Text (.txt)
- Archives (.zip)
- Max size: 50MB

## 5. Protected Route Component

### Usage:

```tsx
import { ProtectedRoute } from "@/components/ProtectedRoute";
import MyDashboard from "./pages/MyDashboard";

// In your router setup
<Route
  path="/dashboard"
  element={
    <ProtectedRoute allowedRoles={["student", "faculty"]}>
      <MyDashboard />
    </ProtectedRoute>
  }
/>;
```

### Props:

- `children: React.ReactNode` - Component to protect
- `allowedRoles?: ("student" | "faculty" | "admin")[]` - Optional role restriction

## 6. Database Tables Reference

### materials

```sql
{
  id: UUID (PK),
  title: TEXT,
  description: TEXT,
  type: TEXT,
  file_path: TEXT,
  file_size: INTEGER,
  uploaded_by: UUID (FK → auth.users),
  course: TEXT,
  subject: TEXT,
  uploaded_at: TIMESTAMP,
  downloads_count: INTEGER,
  views_count: INTEGER,
  is_public: BOOLEAN,
  created_at: TIMESTAMP
}
```

### meetings

```sql
{
  id: UUID (PK),
  title: TEXT,
  description: TEXT,
  meeting_type: TEXT (LECTURE|DISCUSSION|STUDY_GROUP|WORKSHOP),
  scheduled_by: UUID (FK → auth.users),
  start_time: TIMESTAMP,
  end_time: TIMESTAMP,
  meeting_link: TEXT,
  location: TEXT,
  max_participants: INTEGER,
  status: TEXT (SCHEDULED|ONGOING|COMPLETED|CANCELLED),
  created_at: TIMESTAMP
}
```

### meeting_participants

```sql
{
  id: UUID (PK),
  meeting_id: UUID (FK → meetings),
  user_id: UUID (FK → auth.users),
  joined_at: TIMESTAMP,
  left_at: TIMESTAMP,
  attendance_status: TEXT (REGISTERED|ATTENDED|ABSENT),
  created_at: TIMESTAMP
}
```

### user_profiles

```sql
{
  id: UUID (PK, FK → auth.users),
  name: TEXT,
  email: TEXT,
  role: TEXT (student|faculty|admin),
  department: TEXT,
  bio: TEXT,
  avatar_url: TEXT,
  phone: TEXT,
  is_active: BOOLEAN,
  created_at: TIMESTAMP,
  updated_at: TIMESTAMP
}
```

## 7. Error Handling

All hooks use the `useToast` hook for error display:

```tsx
import { useToast } from "@/hooks/use-toast";

const MyComponent = () => {
  const { toast } = useToast();

  const handleAction = async () => {
    try {
      // Your action
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    }
  };
};
```

## 8. Real-time Features

All Supabase operations support real-time updates via Realtime subscriptions:

```tsx
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const MyComponent = () => {
  useEffect(() => {
    // Subscribe to materials changes
    const subscription = supabase
      .from("materials")
      .on("*", (payload) => {
        console.log("Change received!", payload);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);
};
```

## 9. Environment Variables Required

Create `.env.local` file:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_public_key
```

Get these from your Supabase project settings.

## 10. Common Patterns

### Loading State

```tsx
const { isLoading } = useMaterials();

if (isLoading) {
  return <div>Loading...</div>;
}
```

### Filter Data

```tsx
const filteredMaterials = materials.filter(
  (m) => m.course === "Data Structures"
);
```

### Pagination (Add Later)

```tsx
const itemsPerPage = 10;
const [page, setPage] = useState(1);

const paginatedMaterials = materials.slice(
  (page - 1) * itemsPerPage,
  page * itemsPerPage
);
```

---

## Quick Start Checklist

- [ ] Create Supabase project
- [ ] Set environment variables
- [ ] Run migrations
- [ ] Create test accounts
- [ ] Test login flow
- [ ] Test file upload
- [ ] Test meeting creation
- [ ] Test notifications (if added)
- [ ] Deploy to production

For more details, see `IMPLEMENTATION_GUIDE.md`
