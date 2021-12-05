/* display 404 error page when question is not found */
// REquirement: The application asks the user to sign in and shows a 404 page if that poll does not exist. (In other words, if a user creates a poll and then the same or another user tries to access that poll by its url, the user should be asked to sign in and then be shown a 404 page. Please keep in mind that new polls will not be accessible at their url because of the way the backend is set up in this application.) 
import { Component } from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css'
// Page not Found 
export class NotFound extends Component {
    render() {
        return (
            <div id="notfound">
                <div class="notfound-bg"></div>
                <div class="notfound">
                    <div class="notfound-404">
                        <h1>404</h1>
                    </div>
                    <h2>we are sorry, but the page you requested was not found</h2>
                    <Link to="/home" className="home-btn">Go Home</Link>
                </div>
            </div>
        );
    }
}
