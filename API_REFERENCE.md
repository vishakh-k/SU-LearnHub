# 🔌 LearnHub API & Hooks Reference

## Overview

This document provides complete API reference for all hooks and Supabase operations in the LearnHub platform.

---

## 🔐 Authentication API

### `useAuth()` Hook

```tsx
import { useAuth } from "@/contexts/AuthContext";

const MyComponent = () => {
  const {
    user, // Current user object
    session, // Supabase session
    isLoading, // Loading state
    signUp, // Sign up function
    signIn, // Sign in function
    signOut, // Sign out function
    error, // Error message
  } = useAuth();
};
```

### User Object Structure

```typescript
interface User {
  id: string; // UUID from auth
  email: string; // User email
  name?: string; // Full name
  role?: "student" | "faculty" | "admin"; // User role
}
```

### Methods

#### Sign Up

```tsx
await signUp(
  email: string,
  password: string,
  name: string,
  role: "student" | "faculty" | "admin"
)
```

**Example:**

```tsx
try {
  await signUp("john@example.com", "SecurePassword123", "John Doe", "student");
  console.log("Account created successfully");
} catch (error) {
  console.error("Signup failed:", error.message);
}
```

#### Sign In

```tsx
await signIn(
  email: string,
  password: string
)
```

**Example:**

```tsx
try {
  await signIn("john@example.com", "SecurePassword123");
  console.log("Logged in successfully");
  // User state automatically updated
} catch (error) {
  console.error("Login failed:", error.message);
}
```

#### Sign Out

```tsx
await signOut();
```

**Example:**

```tsx
await signOut();
// User state cleared, redirected to home
```

---

## 📚 Materials API

### `useMaterials()` Hook

```tsx
import { useMaterials } from "@/hooks/use-materials";

const {
  isLoading, // Loading state
  materials, // Array of materials
  uploadMaterial, // Upload function
  fetchMaterials, // Fetch function
  downloadMaterial, // Download function
  deleteMaterial, // Delete function
} = useMaterials();
```

### Material Object Structure

```typescript
interface Material {
  id: string; // UUID
  title: string; // Material title
  description?: string; // Description
  type: string; // File type (PDF, DOC, etc.)
  file_path?: string; // Storage path
  file_size?: number; // File size in bytes
  uploaded_by: string; // Uploader UUID
  course?: string; // Course name
  subject?: string; // Subject type
  uploaded_at: string; // ISO timestamp
  downloads_count: number; // Download count
  views_count: number; // View count
  is_public: boolean; // Public/private
}
```

### Methods

#### Upload Material

```tsx
await uploadMaterial(
  file: File,
  title: string,
  description: string,
  course: string,
  subject: string,
  isPublic?: boolean  // Default: true
): Promise<Material>
```

**Example:**

```tsx
const fileInput = document.getElementById("file") as HTMLInputElement;
const file = fileInput.files?.[0];

if (file) {
  try {
    const material = await uploadMaterial(
      file,
      "Advanced Algorithms Notes",
      "Complete coverage of Algorithm Design",
      "Data Structures",
      "Notes",
      true
    );
    console.log("Uploaded:", material.id);
  } catch (error) {
    console.error("Upload failed:", error.message);
  }
}
```

#### Fetch Materials

```tsx
await fetchMaterials(filters?: {
  course?: string;
  subject?: string;
  uploadedBy?: string;
}): Promise<Material[]>
```

**Example:**

```tsx
// Get all public materials
const allMaterials = await fetchMaterials();

// Get materials from specific course
const dsNotes = await fetchMaterials({
  course: "Data Structures",
  subject: "Notes",
});

// Get my uploaded materials
const myMaterials = await fetchMaterials({
  uploadedBy: user.id,
});
```

#### Download Material

```tsx
await downloadMaterial(
  material: Material
): void
```

**Example:**

```tsx
const material = materials[0];
downloadMaterial(material);
// File opens in new tab
// Download count increments
// Activity logged
```

#### Delete Material

```tsx
await deleteMaterial(
  materialId: string
): Promise<void>
```

**Example:**

```tsx
try {
  await deleteMaterial(material.id);
  console.log("Material deleted");
  // Refresh materials list
  await fetchMaterials();
} catch (error) {
  console.error("Delete failed:", error.message);
}
```

---

## 🎥 Meetings API

### `useMeetings()` Hook

```tsx
import { useMeetings } from "@/hooks/use-meetings";

const {
  isLoading, // Loading state
  meetings, // Array of meetings
  createMeeting, // Create function
  fetchMeetings, // Fetch function
  joinMeeting, // Join function
  leaveMeeting, // Leave function
  fetchMeetingParticipants, // Get participants
} = useMeetings();
```

### Meeting Object Structure

```typescript
interface Meeting {
  id: string; // UUID
  title: string; // Meeting title
  description?: string; // Description
  meeting_type: "LECTURE" | "DISCUSSION" | "STUDY_GROUP" | "WORKSHOP"; // Meeting type
  scheduled_by: string; // Creator UUID
  start_time: string; // ISO timestamp
  end_time: string; // ISO timestamp
  meeting_link?: string; // Zoom/Meet link
  location?: string; // Physical location
  max_participants?: number; // Participant limit
  status: "SCHEDULED" | "ONGOING" | "COMPLETED" | "CANCELLED"; // Status
  created_at: string; // ISO timestamp
}
```

### Methods

#### Create Meeting

```tsx
await createMeeting({
  title: string;
  description?: string;
  meeting_type: "LECTURE" | "DISCUSSION" | "STUDY_GROUP" | "WORKSHOP";
  start_time: string;      // ISO format
  end_time: string;        // ISO format
  meeting_link?: string;   // Zoom/Google Meet URL
  location?: string;
  max_participants?: number;
}): Promise<Meeting>
```

**Example:**

```tsx
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(10, 0, 0, 0);

const endTime = new Date(tomorrow);
endTime.setHours(11, 30, 0, 0);

try {
  const meeting = await createMeeting({
    title: "Data Structures - Lecture 5",
    description: "Trees and Binary Search Trees",
    meeting_type: "LECTURE",
    start_time: tomorrow.toISOString(),
    end_time: endTime.toISOString(),
    meeting_link: "https://meet.google.com/abc-defg-hij",
    location: "Room 101",
    max_participants: 60,
  });
  console.log("Meeting created:", meeting.id);
} catch (error) {
  console.error("Failed to create meeting:", error.message);
}
```

#### Fetch Meetings

```tsx
await fetchMeetings(filters?: {
  status?: string;
  meetingType?: string;
  upcomingOnly?: boolean;
}): Promise<Meeting[]>
```

**Example:**

```tsx
// Get all scheduled meetings
const all = await fetchMeetings({ status: "SCHEDULED" });

// Get only upcoming meetings
const upcoming = await fetchMeetings({ upcomingOnly: true });

// Get lectures only
const lectures = await fetchMeetings({
  meetingType: "LECTURE",
  upcomingOnly: true,
});
```

#### Join Meeting

```tsx
await joinMeeting(
  meetingId: string
): Promise<void>
```

**Example:**

```tsx
try {
  await joinMeeting(meeting.id);
  console.log("You've joined the meeting");

  // Open meeting link if available
  if (meeting.meeting_link) {
    window.open(meeting.meeting_link, "_blank");
  }
} catch (error) {
  console.error("Failed to join:", error.message);
}
```

#### Leave Meeting

```tsx
await leaveMeeting(
  meetingId: string
): Promise<void>
```

**Example:**

```tsx
await leaveMeeting(meeting.id);
console.log("You've left the meeting");
```

#### Fetch Meeting Participants

```tsx
await fetchMeetingParticipants(
  meetingId: string
): Promise<Participant[]>
```

**Example:**

```tsx
const participants = await fetchMeetingParticipants(meeting.id);
console.log(`${participants.length} people in this meeting`);

participants.forEach((p) => {
  console.log(`${p.user_profiles.name} - ${p.attendance_status}`);
});
```

---

## 🛡️ Protected Route API

### `ProtectedRoute` Component

```tsx
import { ProtectedRoute } from "@/components/ProtectedRoute";

<Route
  path="/student"
  element={
    <ProtectedRoute allowedRoles={["student"]}>
      <StudentDashboard />
    </ProtectedRoute>
  }
/>;
```

### Props

```typescript
interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: ("student" | "faculty" | "admin")[];
}
```

### Behavior

- **Not logged in** → Redirects to `/auth`
- **Wrong role** → Redirects to `/`
- **Correct role** → Shows component
- **Loading** → Shows loading spinner

---

## 📤 Upload Material Dialog

### `UploadMaterialDialog` Component

```tsx
import { UploadMaterialDialog } from "@/components/UploadMaterialDialog";

<UploadMaterialDialog onSuccess={handleRefresh} />;
```

### Props

```typescript
interface Props {
  onSuccess?: () => void; // Callback after upload
}
```

### Supported File Types

- PDF (.pdf)
- Documents (.doc, .docx, .txt)
- Presentations (.ppt, .pptx)
- Archives (.zip)
- Maximum size: 50MB

---

## 🔄 Supabase Direct Access

### Client Instance

```tsx
import { supabase } from "@/integrations/supabase/client";

// Access Supabase directly for advanced queries
const { data, error } = await supabase
  .from("materials")
  .select("*")
  .eq("course", "Data Structures")
  .gt("downloads_count", 100);
```

### Common Operations

#### Insert

```tsx
const { data, error } = await supabase
  .from("table_name")
  .insert(record)
  .select()
  .single();
```

#### Update

```tsx
const { data, error } = await supabase
  .from("table_name")
  .update(updates)
  .eq("id", recordId);
```

#### Delete

```tsx
const { error } = await supabase.from("table_name").delete().eq("id", recordId);
```

#### Real-time Subscription

```tsx
const subscription = supabase
  .from("materials")
  .on("*", (payload) => {
    console.log("Change:", payload);
  })
  .subscribe();

// Cleanup
subscription.unsubscribe();
```

---

## 📊 Database Queries

### Get All Materials for Course

```typescript
const { data } = await supabase
  .from("materials")
  .select("*")
  .eq("course", "Data Structures")
  .order("created_at", { ascending: false });
```

### Get User's Uploaded Materials

```typescript
const { data } = await supabase
  .from("materials")
  .select("*")
  .eq("uploaded_by", userId)
  .order("created_at", { ascending: false });
```

### Get Top Downloaded Materials

```typescript
const { data } = await supabase
  .from("materials")
  .select("*")
  .order("downloads_count", { ascending: false })
  .limit(10);
```

### Get All Meetings for User

```typescript
const { data } = await supabase
  .from("meeting_participants")
  .select("meetings(*)")
  .eq("user_id", userId);
```

### Get Meeting Attendees with Names

```typescript
const { data } = await supabase
  .from("meeting_participants")
  .select(
    `
    *,
    user_profiles(name, email, avatar_url)
  `
  )
  .eq("meeting_id", meetingId);
```

### Get Activity Logs

```typescript
const { data } = await supabase
  .from("activity_logs")
  .select("*")
  .order("created_at", { ascending: false })
  .limit(50);
```

---

## 🔒 Storage Operations

### Upload File to Storage

```typescript
const { data, error } = await supabase.storage
  .from("materials")
  .upload(`materials/${userId}/${fileName}`, file);
```

### Get Public URL

```typescript
const { data } = supabase.storage.from("materials").getPublicUrl(filePath);

console.log(data.publicUrl);
```

### Create Signed URL (Private Files)

```typescript
const { data, error } = await supabase.storage
  .from("materials")
  .createSignedUrl(filePath, 3600); // 1 hour expiry
```

### Delete File from Storage

```typescript
const { error } = await supabase.storage.from("materials").remove([filePath]);
```

---

## 🧪 Testing Examples

### Test Authentication

```tsx
// Test signup
await signUp("test@example.com", "Test@1234", "Test User", "student");

// Test login
await signIn("test@example.com", "Test@1234");

// Verify user object
expect(user.email).toBe("test@example.com");
expect(user.role).toBe("student");
```

### Test Material Upload

```tsx
// Create test file
const blob = new Blob(["test content"], { type: "text/plain" });
const file = new File([blob], "test.txt");

// Upload
const material = await uploadMaterial(
  file,
  "Test Material",
  "Test Description",
  "Test Course",
  "Test Subject"
);

// Verify
expect(material.title).toBe("Test Material");
expect(material.downloads_count).toBe(0);
```

### Test Meeting Creation

```tsx
const meeting = await createMeeting({
  title: "Test Meeting",
  meeting_type: "LECTURE",
  start_time: new Date().toISOString(),
  end_time: new Date(Date.now() + 3600000).toISOString(),
  scheduled_by: userId,
});

expect(meeting.status).toBe("SCHEDULED");
```

---

## 🚨 Error Handling

All hooks automatically show toast errors. For custom handling:

```tsx
import { useToast } from "@/hooks/use-toast";

const { toast } = useToast();

try {
  await uploadMaterial(...);
} catch (error) {
  toast({
    title: "Upload Failed",
    description: error instanceof Error ? error.message : "Unknown error",
    variant: "destructive"
  });
}
```

---

## 📈 Rate Limiting

Supabase has built-in rate limits:

- API: 100 requests per second
- Auth: 5 attempts per minute
- Storage: 10 GB per month (free tier)

---

## 🔑 Environment Variables

Required in `.env.local`:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_public_key
```

---

## 📚 Additional Resources

- [Supabase JS Client Docs](https://supabase.com/docs/reference/javascript/)
- [PostgREST API Docs](https://postgrest.org/en/stable/api.html)
- [React Query Docs](https://tanstack.com/query/latest)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Last Updated:** December 24, 2025
**Version:** 1.0
