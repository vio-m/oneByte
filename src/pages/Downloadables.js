import "../styles/Downloadables.css"
import { Link } from "react-router-dom";


function Downloadables() {
    return (
        <div className="download-page">
            <div className="dld-container">

                <div className="dld-card">
                    <div className="card-body">
                        <div className="card-title">7 Day Meal Planner</div>
                        <div className="card-text"> A free 7-day, flexible weight loss meal plan including breakfast, lunch and dinner ideas.</div>
                        <div className="btn-wrap">
                            <Link className="buttonDownload" to="7-day-meal-planner.pdf" target="_blank" download>Download</Link>
                        </div>
                    </div>
                    <img className="card-img" src="https://img.freepik.com/free-photo/chicken-wings-barbecue-sweetly-sour-sauce-picnic-summer-menu-tasty-food-top-view-flat-lay_2829-6471.jpg?w=2000"  alt="..."></img>
                </div>

                <div className="dld-card">
                    <div className="card-body">
                        <div className="card-title">28 Day Eating Plan</div>
                        <div className="card-text">The 28 Day Diet Menu from Day 1 to 28, including breakfast, lunch and dinner.</div>
                        <div className="btn-wrap">
                            <Link className="buttonDownload" to="28-day-eating-plan.pdf" target="_blank" download>Download</Link>
                        </div>
                    </div>
                    <img className="card-img" src="https://media.istockphoto.com/id/1341976416/photo/healthy-eating-and-diet-concepts-top-view-of-spring-salad-shot-from-above-on-rustic-wood-table.jpg?b=1&s=170667a&w=0&k=20&c=xYV0gZRXSLeAGJAPaNFaLH1V3VLNLY3KZGVL-neS1js="  alt="..."></img>
                </div>

                <div className="dld-card">
                    <div className="card-body">
                        <div className="card-title">8 Tips For Eating Well</div>
                        <div className="card-text">These practical tips can help you make healthier nutrition choices. </div>
                        <div className="btn-wrap">
                            <Link className="buttonDownload" to="8-tips-for-eating-well.pdf" target="_blank" download>Download</Link>
                        </div>
                    </div>
                    <img className="card-img" src="https://assets.gqindia.com/photos/60816771071aa8b0d84289cf/master/pass/50-super-healthy-foods.jpg"  alt="..."></img>
                </div>

                <div className="dld-card">
                    <div className="card-body">
                        <div className="card-title">Tips For Healthy Eating</div>
                        <div className="card-text">Dedicate yourself to a healthy lifestyle with these food, and exercise tips. </div>
                        <div className="btn-wrap">
                            <Link className="buttonDownload" to="Tips-for-Healthy-Eating.pdf" target="_blank" download>Download</Link>
                        </div>
                    </div>
                    <img className="card-img" src="https://img.freepik.com/free-photo/buddha-bowl-dish-with-vegetables-legumes-top-view_1150-42589.jpg"  alt="..."></img>
                </div>

            </div>
        </div>
    )
}

export default Downloadables;

