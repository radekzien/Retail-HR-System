import HomeLinks from '../components/HomeLinks'
import TimeDisplay from '../components/TimeDisplay'


const Home = () => {
    return(
        <div className="home">
            <h3>Welcome User!</h3>
            <h5>Role</h5>
            <br></br>
            <h2>It is Currently:</h2>
            <TimeDisplay />
            <HomeLinks />
        </div>
    )
}

export default Home