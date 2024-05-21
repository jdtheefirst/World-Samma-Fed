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
import National from "./pages/National";
import ForgotPassword from "./pages/ForgotPassword";
import AboutPage from "./pages/About";
import ParticlesPage from "./pages/Particles";
import { useEffect } from "react";
import InstallButton from "./components/config/InstallButton";

const courses = [
  {
    id: 1,
    title: "Yellow Belt",
    lessons: [
      {
        id: 1,
        title: "Lesson 1",
        video:
          "https://res.cloudinary.com/dsdlgmgwi/video/upload/v1712945476/stances_e589zo.mp4",
        notes: `.Attention stance
.Natural stance
.Horse riding stance
.Raised rear heel stance
.Forward leaning stance
.Back leaning stance
.Cat stance
.Raised knee stance
.Cross stance
.Kneeling positions (one knee, both knees).
`,
      },
      {
        id: 2,
        title: "Lesson 2",
        video:
          "https://res.cloudinary.com/dsdlgmgwi/video/upload/v1712945467/step_annbdf.mp4",
        notes: `.STEPPING (each done in the forward and reverse motion)
     .Stepping through
     .Dragging/jumping
     .Crossing over`,
      },
      {
        id: 3,
        title: "Lesson 3",
        video:
          "https://res.cloudinary.com/dsdlgmgwi/video/upload/v1712945505/primary_kicks_azlg2p.mp4",
        notes: `PRIMARY KICKS (use the front foot)
.Ball kick
.Outward crescent kick
.Inward crescent kick
.Side kick
.Roundhouse kick
.Hook/whip kick
.Back kick
`,
      },
      {
        id: 4,
        title: "Lesson 4",
        video:
          "https://res.cloudinary.com/dsdlgmgwi/video/upload/v1712945505/primary_kicks_azlg2p.mp4",
        notes: `PRIMARY KICKS (use the front foot)
.Ball kick
.Outward crescent kick
.Inward crescent kick
.Side kick
.Roundhouse kick
.Hook/whip kick
.Back kick

`,
      },
      {
        id: 5,
        title: "Lesson 5",
        video:
          "https://res.cloudinary.com/dsdlgmgwi/video/upload/v1712947059/open_hand_r1lizr.mp4",
        notes: `OPEN HAND STRIKES (with each hand)
.Chops
.Slaps (back & front hand)
.Pokes
.Claws
.Palm heel
.Ridge hand
`,
      },
      {
        id: 6,
        title: "Lesson 6",
        video:
          "https://res.cloudinary.com/dsdlgmgwi/video/upload/v1712945468/punches_wazdvv.mp4",
        notes: `
PUNCHES 
.Front punch
.Rear/reverse punch
 
(circular, linear & back fist variations for each)

`,
      },
      {
        id: 7,
        title: "Lesson 7",
        video:
          "https://res.cloudinary.com/dsdlgmgwi/video/upload/v1712945249/evasion_wloadk.mp4",
        notes: `EVASION
.Left
.Right
.Down
.Up
.Back
`,
      },
      {
        id: 8,
        title: "Lesson 8",
        video:
          "https://res.cloudinary.com/dsdlgmgwi/video/upload/v1712945296/blocks_kxtoxv.mp4",
        notes: `BLOCKS (with each hand)
.Inward block
.Outward block
.Upward block
.Downward block
`,
      },
      {
        id: 9,
        title: "Lesson 9",
        video:
          "https://res.cloudinary.com/dsdlgmgwi/video/upload/v1712945257/falling_side_akrnvl.mp4",
        notes: `SAFETY FALLS
.Side fall
`,
      },
      {
        id: 10,
        title: "Lesson 10",
        video:
          "https://res.cloudinary.com/dsdlgmgwi/video/upload/v1712945246/falling_back_ggt6ko.mp4",
        notes: `SAFETY FALLS
.Back fall
`,
      },
      {
        id: 11,
        title: "Lesson 11",
        video:
          "https://res.cloudinary.com/dsdlgmgwi/video/upload/v1712945243/falling_face_sbvruy.mp4",
        notes: `SAFETY FALLS
.Face fall
`,
      },
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

  useEffect(() => {
    if (!user && userInfo) {
      setUser(userInfo);
    }

    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/service-worker.js")
          .then((registration) => {
            console.log("SW registered: ", registration);
          })
          .catch((registrationError) => {
            console.log("SW registration failed: ", registrationError);
          });
      });
    }
  }, [user, userInfo, setUser]);

  return (
    <div className="App">
      <InstallButton
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 1000,
        }}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/particles" element={<ParticlesPage />} />
        <Route path="/login" element={<Logins />} />
        <Route path="/dashboard" element={<Dashboard courses={courses} />} />
        <Route
          path="/courses/:id"
          element={<CourseDetails courses={courses} user={user} />}
        />
        <Route path="/clubs" element={<Clubs />} />
        <Route
          path="/courses/:id/submit/:title"
          element={<SubmissionPage user={user} />}
        />
        <Route path="/profile" element={<ProfilePage user={user} />} />
        <Route
          path="/admin-work-slot"
          element={<AdminWorkSlot user={user} />}
        />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/showclub/:clubId/:liveStream"
          element={<ClubDetailes user={user} />}
        />
        <Route path="/province" element={<Provience user={user} />} />
        <Route path="national" element={<National />} />
        <Route path="/accountrecovery" Component={ForgotPassword} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
