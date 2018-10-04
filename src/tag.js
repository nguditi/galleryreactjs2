import React, { Component } from 'react';
import './explore.css';
import axios from 'axios';
import Gallery from 'react-grid-gallery';
import {Container} from 'reactstrap';
const api = {
    baseUrl: `https://api.flickr.com/services/rest/?method=flickr.photos.search&`,
    extras: `url_l,owner_name,views`,
    key:`7d9089bab5d9509e10414f271835bdff`
};

class Tag extends Component {
    constructor(props) {
        super(props);
        this.state = {pics: [], requestSent: false, page: 1, maxpage:0, tag:''};
    }

    async loadPage()
    {
        let searchTag = await this.props.match.params.name;
        if (!searchTag) {
            searchTag = 'vietnam'
        }
        if (searchTag !== this.state.tag) {
            let res = await axios.get(api.baseUrl + `api_key=` + api.key + `&extras=` + api.extras
                + `&per_page=40&page=1&tags=`+ searchTag + `&text=`+ searchTag +`&sort=relevance&safe_search=1&format=json&nojsoncallback=1`);
            let data = res.data.photos.photo;
            let realList = data.filter((img) =>
            {
                if (!img.url_l)
                    return false;
                return true;
            });
            let maxpg = res.data.photos["pages"];
            this.setState({tag: searchTag})
            this.setState({pics: realList,maxpage: maxpg,page: 2});
        }
    }

    componentDidUpdate()
    {
        this.loadPage();
    }

    componentDidMount(){
        window.addEventListener('scroll',this.handleOnScroll);
        this.loadPage();
    }


    componentWillUnmount() {
        window.removeEventListener('scroll',this.handleOnScroll);
    }

    doQuery = async() => {
        if (this.state.page > this.state.maxpage)
            return;
        let res = await axios.get(api.baseUrl + `api_key=` + api.key + `&extras=` + api.extras
            + `&per_page=20&page=` + this.state.page + `&tags=`+ this.state.tag +`&sort=relevance&safe_search=1&format=json&nojsoncallback=1`);
        let data = this.state.pics.concat(res.data.photos.photo);
        let realList = data.filter((img) =>
        {
            if (!img.url_l)
                return false;
            return true;
        });
        this.setState({pics: realList});
        let pg = this.state.page + 1;
        this.setState({page: pg, requestSent: false});
    }

    handleOnScroll= () => {
        // http://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
        let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        let clientHeight = document.documentElement.clientHeight || window.innerHeight;
        let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        if (scrolledToBottom) {
            if (this.state.requestSent) {
                return;
            }
            // enumerate a slow query
            setTimeout(this.doQuery, 1000);
            this.setState({requestSent: true});
        }
    }

    jumptoDetail(i)
    {
        this.props.history.push(`/detail/`+this.state.pics[i].id);
    }

    render() {
        return (
            <Container>
                <Gallery enableImageSelection={false} rowHeight={280} onClickThumbnail = {(e)=>this.jumptoDetail(e)} images={this.state.pics.map((photo) =>
                {
                    let width = parseInt(photo.width_l,10);
                    let height = parseInt(photo.height_l,10);
                    return {src: photo.url_l,
                        thumbnail: photo.url_l,
                        thumbnailWidth: width,
                        thumbnailHeight: height,
                        caption:photo.title,
                        customOverlay: (
                            <div className="img__description">
                                <b>{photo.title}</b>
                                <div>Owner: {photo.ownername}</div>
                                <div>Views: {photo.views}</div>
                            </div>)}
                })}/>
                {
                    (()=> {
                        if (this.state.requestSent) {
                            return (
                                <div className="loading">Loading&#8230;</div>
                            );
                        }
                    })()
                }
            </Container>
        );
    }
}
export default Tag;
