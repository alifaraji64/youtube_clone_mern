import { Link } from "react-router-dom"
function WelcomeScreen() {
    return ( <>
    <h1 className="p-4 text-4xl text-center">Welcome to Youtube Clone where you can surf all the fun videos and also uplaod your stuff</h1>
    <h3 className="text-center">all of the videos and images are saved in a decentralized database aka filecoin</h3>
    <div className="text-center mt-6">
        <Link to='/register' className="bg-red-500 p-1 text-lg text-white rounded-sm mr-4 hover:bg-red-600 transition-colors no-underline">Register</Link>
        <Link to='/login' className="bg-red-500 p-1 text-lg text-white rounded-sm ml-4 hover:bg-red-600 transition-colors no-underline">Login</Link>
    </div>
    </> );
}

export default WelcomeScreen;