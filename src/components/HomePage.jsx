'use strict';

const React = require('react');
const { Component, PropTypes } = React;
const {
    Button,
    Jumbotron,
    Grid,
    Row,
    Col,
    Panel,
    ListGroup,
    ListGroupItem,
    DropdownButton,
    MenuItem,
    Badge
} = require('react-bootstrap');
const TextTagger = require('./TextTagger');

const style = require('../scss/main.scss');

const { bindActionCreators } = require('redux');
const { connect } = require('react-redux');
const { getSights } = require('../actions/apiActions');
const { tags_list } = require('../config');

class HomePage extends Component {

    constructor(props) {
        super(props);

        this.addTag = this.addTag.bind(this);
        this.deleteTag = this.deleteTag.bind(this);
        this.changeTag = this.changeTag.bind(this);
        this.setCharAt = this.setCharAt.bind(this);
        this.next = this.next.bind(this);
        this.state = {
            tags: [],
            text: '',
            actual_text: ''
        };
    }

    componentDidMount() {
        const testowy_teks = "poprosze 2kg marchewki, 3 cukinie, 1kg pomidoriw,  1 duza kapuste i kilo ziemniakow";
        this.setState({text: testowy_teks, actual_text: testowy_teks});
        document.onkeypress = (e) => {
            if (e.key === 'd' && this.state.tags.length > 0) { //delete last tag
                this.deleteTag(0, true);
            }
            if (e.key === 'c' && this.state.tags.length > 0) { // fast tag change
                let tags = Object.assign([], this.state.tags);
                let last_tag = tags[tags.length-1];
                last_tag.tag = tags_list[++last_tag.tag_id % tags_list.length];
                this.setState({tags: tags});
            }
        };
    }

    componentWillUnmount() {
        document.onkeypress = null;
    }

    next() {
        let data = {
            sentence: this.state.actual_text,
            annotation: []
        };
        this.state.tags.map(tag =>
            data.annotation.push({
                value: tag.text,
                entity: tag.tag,
                end: tag.end,
                start: tag.start
            })
        );
        console.log('OUTPUT HERE:');
        console.log(data);
        alert('Check console.log output: press ctrl + shift + j');
    }

    setCharAt(index, chr, str=this.state.text) {
        if (index > str.length-1) return str;
        return str.substr(0,index) + chr + str.substr(index + chr.length);
    }

    addTag(data) {
        let tags = Object.assign([], this.state.tags);
        tags.push(data);
        const change_to = ' '.repeat(data.end - data.start);
        this.setState({
            tags: tags,
            text: this.setCharAt(data.start, change_to)
        });
    }

    changeTag(tag_id, label_id) {
        let tags = Object.assign([], this.state.tags);
        for(let i = 0; i < tags.length; i++) {
            if(tag_id == tags[i].id) {
                tags[i].tag = tags_list[label_id];
                tags[i].tag_id = label_id;
                this.setState({tags: tags});
                break;
            }
        }
    }

    deleteTag(id, last=false) {
        let tags = Object.assign([], this.state.tags);
        let new_text = '';
        if (last) {
            let tag = tags.pop();
            new_text = this.setCharAt(tag.start, tag.text);
        } else {
            for(let i = 0; i < tags.length; i++) {
                if(id == tags[i].id) {
                    new_text = this.setCharAt(tags[i].start, tags[i].text);
                    tags.splice(i, 1);
                    break;
                }
            }
        }
        this.setState({
            tags: tags,
            text: new_text
        });
    }

    render() {
        return (
            <Grid>
                <Row className="show-grid" style={{marginTop: '10px'}}>
                    <Panel className={style.center}>
                        <Panel.Body>Use <Badge>c</Badge> to change tag label and <Badge>d</Badge> to delete last tag</Panel.Body>
                    </Panel>
                </Row>
                <Row className="show-grid">
                    <Col xs={6} md={4}>
                        <Panel>
                            <Panel.Heading>Tags</Panel.Heading>
                            <ListGroup>
                                {this.state.tags.map((tag) => {
                                    return (
                                        <ListGroupItem key={tag.id}>
                                            <Row className="show-grid">
                                                <Col xs={10} md={10}>
                                                    <Badge>{tag.tag}</Badge>
                                                    {` [${tag.text}]`}
                                                </Col>
                                                <div style={{float: 'right', position: 'relative'}}>
                                                    <DropdownButton id={tag.id} title=''>
                                                        <MenuItem header>Tags</MenuItem>
                                                        {tags_list.map((tag_label, i) => {
                                                            if (tag_label != tag.tag) {
                                                                return <MenuItem key={i} onClick={()=>this.changeTag(tag.id, i)} eventKey={i}>{tag_label}</MenuItem>;
                                                            } else return null;
                                                        })}
                                                        <MenuItem divider />
                                                        <MenuItem onClick={()=>this.deleteTag(tag.id)}>Delete</MenuItem>
                                                    </DropdownButton>
                                                </div>
                                            </Row>
                                        </ListGroupItem>
                                    );
                                })}
                            </ListGroup>
                        </Panel>
                    </Col>
                    <Col xs={12} md={8}>
                        <Jumbotron>
                            <TextTagger tags={this.state.tags} addTag={this.addTag} text={this.state.text}/>
                            <p>
                                <Button bsStyle="primary" onClick={this.next}>Next</Button>
                                <Button bsStyle="danger" style={{float: 'right'}}>Delete</Button>
                            </p>
                        </Jumbotron>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

function mapStateToProps(state) {
    return {
        userIsLoggedIn: state.session.user.isLoggedIn,
        Name: state.session.user.user.Name,
        sights: state.data.sights,
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getSights: getSights
    }, dispatch);
}

module.exports = connect(mapStateToProps, matchDispatchToProps)(HomePage);