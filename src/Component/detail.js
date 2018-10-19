import React, {Component} from 'react';
import './detail.css';
import axios from 'axios';
import {Container} from 'reactstrap';
import {Link} from "react-router-dom";

const api = {
    infoUrl: ` https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&`,
    picUrl: `https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&`,
    key: `7d9089bab5d9509e10414f271835bdff`
};

class Detail extends Component {
    constructor(props) {
        super(props);
        this.state = {photo: ``, info: ``};
        this.loadData();
    }


    loadData = async () => {
        let id = await this.props.match.params.id;
        let res = await axios.get(api.picUrl + `api_key=` + api.key + `&photo_id=`
            + id + `&format=json&nojsoncallback=1`);
        let data = res.data.sizes.size.pop().source;

        let res1 = await axios.get(api.infoUrl + `api_key=` + api.key + `&photo_id=`
            + id + `&format=json&nojsoncallback=1`);
        let data1 = res1.data.photo;
        this.setState({photo: data, info: data1});
    }

    render() {
        if (this.state.info === ``) {
            return (
                <Container>
                </Container>
            );
        }
        return (
            <Container>
                <img className={"mainPhoto"}
                    // onMouseEnter={(e)=>this._mouseEnter(e)}
                    // onMouseLeave={(e)=>this._mouseLeave(e)}
                     src={this.state.photo}
                     alt={this.state.info.title}
                />
                <div className={"sub-photo-left-view"}>
                        <div className={"content"}>{this.state.info.owner.realname}</div>
                        <div className={"sub-content"}>{this.state.info.title._content}</div>
                        <div className={"sub-content"}>Views:{this.state.info.views}</div>
                        <div className={"decription"}>Description: {this.state.info.description._content}</div>
                        <div className={"sub-content"}>{this.state.info.dates.taken}</div>

                </div>
                <div className={"tag-view"}>
                    {this.state.info.tags.tag.map(data =>
                    {
                        let link = `/tag/`+ data.raw;
                        return (<Link to={link} className={"tag"} key={data.id}> {data.raw} </Link>);
                    })}
                </div>
            </Container>
        );
    }
}

export default Detail;
