import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Logins from "./pages/Logins";
import { Dashboard } from "./pages/Dashboard";
import CourseDetails from "./pages/Courses";
import { Clubs } from "./pages/Clubs";
import ClubDetailes from "./pages/ClubDetails";
import { ChatState } from "./components/Context/ChatProvider";
import SubmissionPage from "./pages/Submit";
import ProfilePage from "./pages/ProfilePage";
import AdminWorkSlot from "./pages/AdminWorkSlot";
import Provience from "./pages/Provience";

const courses = [
  {
    id: 1,
    title: "Yellow Belt",
    lessons: [
      {
        id: 1,
        title: "Lesson 1",
        video:
          "https://res.cloudinary.com/dvc7i8g1a/video/upload/v1706267491/WhatsApp_Video_2024-01-26_at_2.10.09_AM_hjvvsd.mp4",
        notes: "Notes for Lesson 1",
      },
      {
        id: 2,
        title: "Lesson 2",
        video: "video_url_2",
        notes: "Notes for Lesson 2",
      },
      // Add more lessons
    ],
  },
  {
    id: 2,
    title: "Orange Belt",
    lessons: [
      {
        id: 1,
        title: "Lesson 1",
        video: "video_url_1",
        notes: "Notes for Lesson 1",
      },
      {
        id: 2,
        title: "Lesson 2",
        video: "video_url_2",
        notes: "Notes for Lesson 2",
      },
      // Add more lessons
    ],
  },
  {
    id: 3,
    title: "Red Belt",
    lessons: [
      {
        id: 1,
        title: "Lesson 1",
        video: "video_url_1",
        notes: "Notes for Lesson 1",
      },
      {
        id: 2,
        title: "Lesson 2",
        video: "video_url_2",
        notes: "Notes for Lesson 2",
      },
      // Add more lessons
    ],
  },
  {
    id: 4,
    title: "Purple Belt",
    lessons: [
      {
        id: 1,
        title: "Lesson 1",
        video: "video_url_1",
        notes: "Notes for Lesson 1",
      },
      {
        id: 2,
        title: "Lesson 2",
        video: "video_url_2",
        notes: "Notes for Lesson 2",
      },
      // Add more lessons
    ],
  },
  {
    id: 5,
    title: "Green Belt",
    lessons: [
      {
        id: 1,
        title: "Lesson 1",
        video: "video_url_1",
        notes: "Notes for Lesson 1",
      },
      {
        id: 2,
        title: "Lesson 2",
        video: "video_url_2",
        notes: "Notes for Lesson 2",
      },
      // Add more lessons
    ],
  },
  {
    id: 6,
    title: "Blue Belt",
    lessons: [
      {
        id: 1,
        title: "Lesson 1",
        video: "video_url_1",
        notes: "Notes for Lesson 1",
      },
      {
        id: 2,
        title: "Lesson 2",
        video: "video_url_2",
        notes: "Notes for Lesson 2",
      },
      // Add more lessons
    ],
  },
  {
    id: 7,
    title: "Brown Belt",
    lessons: [
      {
        id: 1,
        title: "Lesson 1",
        video: "video_url_1",
        notes: "Notes for Lesson 1",
      },
      {
        id: 2,
        title: "Lesson 2",
        video: "video_url_2",
        notes: "Notes for Lesson 2",
      },
      // Add more lessons
    ],
  },
  {
    id: 8,
    title: "Black Belt",
    lessons: [
      {
        id: 1,
        title: "Lesson 1",
        video: "video_url_1",
        notes: "Notes for Lesson 1",
      },
      {
        id: 2,
        title: "Lesson 2",
        video: "video_url_2",
        notes: "Notes for Lesson 2",
      },
      // Add more lessons
    ],
  },
];

function App() {
  const { user, setUser } = ChatState();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  if (!user && userInfo) {
    setUser(userInfo);
  }
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Logins />} />
        <Route path="/dashboard" element={<Dashboard courses={courses} />} />
        <Route
          path="/courses/:id"
          element={<CourseDetails courses={courses} />}
        />
        <Route path="/clubs" element={<Clubs />} />
        <Route
          path="/courses/:id/submit"
          element={<SubmissionPage user={user} />}
        />
        <Route path="/profile" element={<ProfilePage user={user} />} />
        <Route
          path="/admin-work-slot"
          element={<AdminWorkSlot user={user} />}
        />
        <Route
          path="/showclub/:clubId/:liveStream"
          element={<ClubDetailes user={user} />}
        />
        <Route path="/province" element={<Provience user={user} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
