import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import SignIn from "./pages/SignIn";
import Footer from "./components/Footer";
import { useAppContext } from "./contexts/AppContext";
import Recommendation from './pages/RecommendedTours'
import Search from "./pages/Search";
import Details from "./pages/Details";
import Booking from "./pages/Booking";
import Register from "./pages/Register";
import MyBooking from "./pages/MyBooking";
import AdminNavigator from "./navigator/AdminNavigator";
import HomePage from "./pages/HomePage";
import ChatPage from "./components/chatPage";


const App = () => {
  const {userData,isLoggedIn} = useAppContext()
  const isAdmin=userData&&userData.user?.role==='admin'
  console.log(isAdmin)
  if(isAdmin) return <AdminNavigator />
  return (
    <div className="">
        <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register/>} />
        <Route path="/signin" element={<SignIn />} />
         <Route path="/searchtour" element={<Search/>} />
         {/* <Route path="/get-tour" element={<MyTour />} /> */}
            {/* <Route path="/details/$"/> */}
            <Route path="/details/:tourId"  element={<Details/>}/>
            <Route path="/search-tour/:tourId/booking" element={<Booking/>}/>

        {isLoggedIn && (
          <>
           <Route path="/recommendedTours" element={<Recommendation/>} />
           <Route path="/my-bookings" element={<MyBooking/>}/>
           <Route path="/chats" element={<ChatPage/>}/>
          </>
        )}
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
