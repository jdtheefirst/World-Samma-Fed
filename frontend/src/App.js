import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import { Suspense, lazy, useEffect, useState } from "react";
const Home = lazy(() => import("./pages/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Championships = lazy(() => import("./pages/InternationalChampionships"));
const CourseDetails = lazy(() => import("./pages/Courses"));
const Clubs = lazy(() => import("./pages/Clubs"));
const SubmissionPage = lazy(() => import("./pages/Submit"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const AdminWorkSlot = lazy(() => import("./pages/AdminWorkSlot"));
const AboutPage = lazy(() => import("./pages/About"));
const ClubDetailes = lazy(() => import("./pages/ClubDetails"));
const Provience = lazy(() => import("./pages/Provience"));
const National = lazy(() => import("./pages/National"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));
import LoadingSpinner from "./components/Loading";
import DelayedRender from "./components/Render";
const MeetingComponent = lazy(() => import("./pages/Meetings"));
const JanusRtmpStreamer = lazy(() => import("./pages/LivePage"));
const StreamViewPage = lazy(() => import("./pages/StreamViewing"));

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
      },
      {
        id: 2,
        title: "Lesson 2",
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
`,
      },
      {
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
    title: "Black Belt 1",
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

const RouteChangeTracker = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-ZFWT8RB2MQ", {
        page_path: location.pathname,
      });
    }
  }, [location]);

  return null;
};

function App() {
  return (
    <div className="App">
      <Suspense fallback={<LoadingSpinner />}>
        <RouteChangeTracker />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={<DelayedRender Component={Dashboard} courses={courses} />}
          />
          <Route path="/admin" element={<AdminWorkSlot />} />
          <Route path="/live" element={<JanusRtmpStreamer />} />
          <Route path="/streams" element={<StreamViewPage />} />
          <Route
            path="/courses/:id"
            element={
              <DelayedRender Component={CourseDetails} courses={courses} />
            }
          />
          <Route
            path="/championships"
            element={<DelayedRender Component={Championships} />}
          />
          <Route
            path="/stream"
            element={<DelayedRender Component={StreamViewPage} />}
          />
          <Route
            path="/meeting"
            element={<DelayedRender Component={MeetingComponent} />}
          />
          <Route path="/clubs" element={<DelayedRender Component={Clubs} />} />
          <Route
            path="/courses/:id/submit/:title"
            element={<DelayedRender Component={SubmissionPage} />}
          />
          <Route
            path="/profile"
            element={<DelayedRender Component={ProfilePage} />}
          />
          <Route
            path="/admin-work-slot"
            element={<DelayedRender Component={AdminWorkSlot} />}
          />
          <Route path="/about" element={<AboutPage />} />
          <Route
            path="/showclub/:clubId/:liveStream"
            element={<DelayedRender Component={ClubDetailes} />}
          />
          <Route
            path="/province"
            element={<DelayedRender Component={Provience} />}
          />
          <Route
            path="/national"
            element={<DelayedRender Component={National} />}
          />
          <Route path="/accountrecovery" element={<ForgotPassword />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
