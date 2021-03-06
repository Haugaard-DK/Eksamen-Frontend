import authFacade from "./helperFacades/AuthFacade";
import jokeFacade from "./helperFacades/JokeFacade";
import tokenFacade from "./helperFacades/TokenFacade";
import userFacade from "./helperFacades/UserFacade";
import bookingFacade from "./helperFacades/BookingFacade";

function Facade() {
  /** Auth related */
  const login = (username, password) => {
    return authFacade.login(username, password);
  };

  const logout = () => {
    authFacade.logout();
  };

  const isLoggedIn = () => {
    return authFacade.isLoggedIn();
  };

  const register = (username, password, firstname, lastname) => {
    return authFacade.register(username, password, firstname, lastname);
  };

  const isAdmin = () => {
    return authFacade.isAdmin();
  };

  /** User related */
  const getProfile = () => {
    let decodedToken = tokenFacade.getDecodedToken();
    let username = decodedToken.username;

    return lookupUser(username);
  };

  const lookupUser = (username) => {
    let token = tokenFacade.getToken();
    return userFacade.lookup(username, token);
  };

  const getAllUsers = () => {
    let token = tokenFacade.getToken();
    return userFacade.getAllUsers(token);
  };

  /** Joke related */
  const getJokes = () => {
    let token = tokenFacade.getToken();
    return jokeFacade.getRandomJokes(token);
  };

  /** Booking related */
  const getBookings = () => {
    let token = tokenFacade.getToken();
    return bookingFacade.getBookings(token);
  };

  const bookHotel = () => {
    let token = tokenFacade.getToken();
    return bookingFacade.bookHotel(token);
  };

  return {
    /** Auth related */
    login,
    logout,
    isLoggedIn,
    register,
    isAdmin,

    /** User related */
    getProfile,
    lookupUser,
    getAllUsers,

    /** Joke related */
    getJokes,

    /** Booking related */
    getBookings,
    bookHotel,
  };
}

const facade = Facade();
export default facade;
