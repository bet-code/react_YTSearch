import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyBNYerktY2iWXAPJb-kF6HwcuMOJBdAZl4';


class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            videos: [],
            selectedVideo: null
        };
            this.videoSearch('HackerYou');
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({ 
                videos: videos,
                selectedVideo: videos[0]
            });
        });
    }

    render() {
        const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 400);

        return (
            <div>
                <header>
                    <SearchBar handleSearchTermChange={videoSearch} />
                </header>
                <div className="wrapper">
                    <VideoDetail video={this.state.selectedVideo} />
                    <VideoList 
                        handleVideoSelect={selectedVideo => this.setState({selectedVideo})}
                        videos={this.state.videos} />                
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));
