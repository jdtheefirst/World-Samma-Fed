import "./App.css";
<<<<<<< HEAD
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
=======
import { Route, Routes, useLocation} from "react-router-dom";
import { ChatState } from "./components/Context/ChatProvider";
import { Suspense, lazy, useEffect, useState } from "react";
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Championships = lazy(() => import('./pages/InternationalChampionships'));
const CourseDetails = lazy(() => import('./pages/Courses'));
const Clubs = lazy(() => import('./pages/Clubs'));
const SubmissionPage = lazy(() => import('./pages/Submit'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const AdminWorkSlot = lazy(() => import('./pages/AdminWorkSlot'));
const AboutPage = lazy(() => import('./pages/About'));
const ClubDetailes = lazy(() => import('./pages/ClubDetails'));
const Provience = lazy(() => import('./pages/Provience'));
const National = lazy(() => import('./pages/National'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const NotFound = lazy(() => import('./pages/NotFound'));
import LoadingSpinner from './components/Loading';
import SessionExpirationMessage from "./components/SessionExpired";

>>>>>>> master

const courses = [
  {
    id: 1,
    title: "Yellow Belt",
    lessons: [
      {
        id: 1,
        title: "Lesson 1",
        video:
<<<<<<< HEAD
          "https://res.cloudinary.com/dvc7i8g1a/video/upload/v1706267491/WhatsApp_Video_2024-01-26_at_2.10.09_AM_hjvvsd.mp4",
        notes: "Notes for Lesson 1",
=======
          "https://res.cloudinary.com/dsdlgmgwi/video/upload/v1712945476/stances_e589zo.mp4",
        notes: `. Attention stance
. Natural stance
. Horse riding stance
. Raised rear heel stance
. Forward leaning stance
. Back leaning stance
. Cat stance
. Raised knee stance
. Cross stance
. Kneeling positions (one knee, both knees).
`,
>>>>>>> master
      },
      {
        id: 2,
        title: "Lesson 2",
<<<<<<< HEAD
        video: "video_url_2",
        notes: "Notes for Lesson 2",
      },
      // Add more lessons
=======
        video:
          "https://res.cloudinary.com/dsdlgmgwi/video/upload/v1712945467/step_annbdf.mp4",
        notes: `. STEPPING (each done in the forward and reverse motion)
     . Stepping through
     . Dragging/jumping
     . Crossing over`,
      },
      {
        id: 3,
        title: "Lesson 3",
        video:
          "https://res.cloudinary.com/dsdlgmgwi/video/upload/v1712945505/primary_kicks_azlg2p.mp4",
        notes: `. PRIMARY KICKS (use the front foot)
. Ball kick
. Outward crescent kick
. Inward crescent kick
. Side kick
. Roundhouse kick
. Hook/whip kick
. Back kick
`,
      },
      {
        id: 4,
        title: "Lesson 4",
        video:
          "https://res.cloudinary.com/dsdlgmgwi/video/upload/v1712945505/primary_kicks_azlg2p.mp4",
        notes: `. PRIMARY KICKS (use the front foot)
. Ball kick
. Outward crescent kick
. Inward crescent kick
. Side kick
. Roundhouse kick
. Hook/whip kick
. Back kick
`,
      },
      {
        id: 5,
        title: "Lesson 5",
        video:
          "https://res.cloudinary.com/dsdlgmgwi/video/upload/v1712947059/open_hand_r1lizr.mp4",
        notes: `. OPEN HAND STRIKES (with each hand)
. Chops
. Slaps (back & front hand)
. Pokes
. Claws
. Palm heel
. Ridge hand
`,
      },
      {
        id: 6,
        title: "Lesson 6",
        video:
          "https://res.cloudinary.com/dsdlgmgwi/video/upload/v1712945468/punches_wazdvv.mp4",
        notes: `. PUNCHES 
. Front punch
. Rear/reverse punch(circular, linear & back fist variations for each)
`,
      },
      {
        id: 7,
        title: "Lesson 7",
        video:
          "https://res.cloudinary.com/dsdlgmgwi/video/upload/v1712945249/evasion_wloadk.mp4",
        notes: `. EVASION
. Left
. Right
. Down
. Up
. Back
`,},{
        id: 8,
        title: "Lesson 8",
        video:
          "https://res.cloudinary.com/dsdlgmgwi/video/upload/v1712945296/blocks_kxtoxv.mp4",
        notes: `. BLOCKS (with each hand)
. Inward block
. Outward block
. Upward block
. Downward block
`,
      },
      {
        id: 9,
        title: "Lesson 9",
        video:
          "https://res.cloudinary.com/dsdlgmgwi/video/upload/v1712945257/falling_side_akrnvl.mp4",
        notes: `. SAFETY FALLS
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
        notes: `. SAFETY FALLS
.Face fall
`,
      },
>>>>>>> master
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
<<<<<<< HEAD
    title: "Black Belt",
=======
    title: "Black Belt 1",
>>>>>>> master
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

<<<<<<< HEAD
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
=======
const RouteChangeTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag('config', 'G-ZFWT8RB2MQ', {
        page_path: location.pathname,
      });
    }
  }, [location]);

  return null;
};

function App() {
  const { user, setUser } = ChatState();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) {
      setUser(userInfo);
    }
    setLoading(false); // Loading is complete
  }, []);

  const renderWithSessionCheck = (Component, props = {}) => {
    if (loading) {
      return <LoadingSpinner />; // Show loading spinner while checking session
    }
    if (!user) {
      return <SessionExpirationMessage />;
    }
    return <Component {...props} user={user} />;
  };


  return (
    <div className="App">
      <Suspense fallback={<LoadingSpinner />}>
        <RouteChangeTracker />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={renderWithSessionCheck(Dashboard, { courses })} />
          <Route path="/courses/:id" element={renderWithSessionCheck(CourseDetails, { courses })} />
          <Route path="/championships" element={renderWithSessionCheck(Championships)} />
          <Route path="/clubs" element={renderWithSessionCheck(Clubs)} />
          <Route path="/courses/:id/submit/:title" element={renderWithSessionCheck(SubmissionPage)} />
          <Route path="/profile" element={renderWithSessionCheck(ProfilePage)} />
          <Route path="/admin-work-slot" element={renderWithSessionCheck(AdminWorkSlot)} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/showclub/:clubId/:liveStream" element={renderWithSessionCheck(ClubDetailes)} />
          <Route path="/province" element={renderWithSessionCheck(Provience)} />
          <Route path="/national" element={renderWithSessionCheck(National)} />
          <Route path="/accountrecovery" element={<ForgotPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
>>>>>>> master
    </div>
  );
}

export default App;
