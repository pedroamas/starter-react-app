import React , {useState , useEffect} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const URL = '/videos';

function Streaming(props) {
    const [videos , setVideos] = useState([]);
    console.log(URL);

    useEffect(() => {
      const response = axios.get(URL)
      response.then(res =>{
        
        
      setVideos( res.data );
      })
    } , []);

    return (
      <div className="container  separe-margin">
        <div className="separe-margin">
          <h2 className="separe-margin">Videos Streaming</h2>
          <div className="row">
            {videos.map(video =>
              <div className="col-md-4" key={video.id}>
                <Link to={`/player/${video.id}`}>
                  <div className="card ">
                    <img className="img-video" src={`images/video.png`} alt={video.name} />
                    <div className="card-body">
                      <p>{video.name}</p>
                      <p>{video.duration}</p>
                    </div>
                  </div>
                </Link>
              </div>
              )} 
          </div>
        </div>
      </div>
      );
}

export default Streaming;
