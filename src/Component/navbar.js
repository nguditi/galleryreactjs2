import React, { Component } from 'react';
import {
    withRouter,
    Link
} from 'react-router-dom';
import {
    Collapse,
    Navbar,
    Nav,
    NavbarToggler,
    Input,
    Button, FormGroup,
    NavItem,} from 'reactstrap';

class MyNav extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            dropdownOpen: false,
            inputValue: ''
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    updateInputValue(e) {
        this.setState({
            inputValue: e.target.value
        });
    }

    keySearchTag(e) {
        if (e.key === 'Enter') {
            this.props.history.push(`/tag/`+this.state.inputValue);
        }
    }

    searchTag() {
        this.props.history.push(`/tag/`+this.state.inputValue);
    }

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="md">
                    <Link to="/" className = "navbar-brand">Gallery</Link>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <FormGroup className="mb-0">
                                <Input className="text-right" onKeyPress={(e)=>this.keySearchTag(e)} value={this.state.inputValue} onChange={(e) => this.updateInputValue(e)}/>
                            </FormGroup>
                            <Button outline color="info" onClick={() => this.searchTag()}>Search</Button>{' '}
                            <NavItem>
                                <Link to="/" className ="nav-link">Explore</Link>
                            </NavItem>
                            <NavItem>
                               <Link to="/tag" className ="nav-link">Tags</Link>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}
export default withRouter(MyNav);