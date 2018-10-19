import React, { Component } from 'react';
import * as Action from  '../Actions/index';
import {connect} from  'react-redux';
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

    async loadPage()
    {
        let searchTag = await this.props.match.params.name;
        if (!searchTag) {
            searchTag = 'vietnam'
        }
        if (searchTag !== this.props.tag) {
            this.props.changeTag(searchTag);
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
            this.props.setMaxpage(maxpg);
            this.props.cleanPhoto();
            this.props.addPhoto(realList);
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
        this.props.cleanPhoto();
        this.props.changeTag('');
    }

    doQuery = async() => {
        if (this.props.page > this.props.maxpage)
            return;
        let res = await axios.get(api.baseUrl + `api_key=` + api.key + `&extras=` + api.extras
            + `&per_page=40&page=` + this.props.page + `&tags=`+ this.props.tag + `&text=`+  this.props.tag +`&sort=relevance&safe_search=1&format=json&nojsoncallback=1`);
        let data = res.data.photos.photo;
        let realList = data.filter((img) =>
        {
            if (!img.url_l)
                return false;
            return true;
        });
        this.props.setRequesting(false);
        this.props.addPhoto(realList);
    }

    handleOnScroll= () => {
        // http://stackoverflow.com/questions/9439725/javascript-how-to-detect-if-browser-window-is-scrolled-to-bottom
        let scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        let scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        let clientHeight = document.documentElement.clientHeight || window.innerHeight;
        let scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        if (scrolledToBottom) {
            if (this.props.requestSent) {
                return;
            }
            // enumerate a slow query
            setTimeout(this.doQuery, 1000);
            this.props.setRequesting(true);

        }
    }

    jumptoDetail(i)
    {
        this.props.history.push(`/detail/`+this.props.pics[i].id);
    }

    render() {
        return (
            <Container>
                <Gallery enableImageSelection={false} rowHeight={280} onClickThumbnail = {(e)=>this.jumptoDetail(e)} images={this.props.pics.map((photo) =>
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
                        if (this.props.requestSent) {
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

const mapStateToProps = (state) => {
    return {
        pics: state.updatePhoto.photo,
        page: state.updatePhoto.page,
        tag: state.changeTag,
        requestSent: state.setRequesting,
        maxpage: state.maxPage,
    }
}

const mapDispatchToProps = (dispatch, action) => {
    return {
        addPhoto: (realList) => {
            dispatch(Action.addPhoto(realList));
        },
        cleanPhoto: () => {
            dispatch(Action.cleanPhoto());
        },
        changeTag: (tag) => {
            dispatch(Action.changeTag(tag));
        },
        setRequesting: (isReq) => {
            dispatch(Action.setRequesting(isReq));
        },
        setMaxpage: (maxpage) => {
            dispatch(Action.setMaxpage(maxpage));
        }

}
}

export default connect(mapStateToProps, mapDispatchToProps)(Tag);
