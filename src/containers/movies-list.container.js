import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Pagination} from "react-bootstrap";

import {MoviesList} from "../components";
import {fetchMoviesList} from '../actions';

class MoviesContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            paginationIndex: 1
        }
    }

    initMovies(pageNumber) {
        const {dispatch} = this.props;
        dispatch(fetchMoviesList(pageNumber));
    }

    componentDidMount() {
        this.initMovies(1);
    }

    handleSelect(eventKey) {
        this.setState({
            paginationIndex: eventKey
        });
        this.initMovies(eventKey);
    }

    render() {
        const {movies} = this.props;
        return (
            <div>
                <MoviesList movies={movies}/>
                <div style={{display: 'flex'}}>
                    <div style={{margin: '0 auto'}}>
                        <Pagination
                            bsSize="medium"
                            prev
                            next
                            first
                            last
                            ellipsis
                            items={1000}  // maximum API /movie/{movie_id}/lists page number
                            maxButtons={5}
                            activePage={this.state.paginationIndex}
                            onSelect={(number) => this.handleSelect(number)}/>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    const {movieList} = state;
    const {isFetcing_movieList, items: movies, error_movieList} = movieList;
    const keyword = ownProps.params.keyword;
    return {movies, keyword}
}

export default connect(mapStateToProps)(MoviesContainer);