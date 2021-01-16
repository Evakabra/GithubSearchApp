import React, { Component } from 'react';
import axios from 'axios';
import Title from "../component/Title";
import UserImage from '../component/UserImage';
import SearchBar from "material-ui-search-bar";
import Simplecard from '../component/Card';

class SearchRepository extends Component {

    constructor(props) {
        super(props)
        this.state = {
            imgError: false,
            dataSet: [],
            showTable: false,
            currentPage: 1,
            reposPerPage: 5,
            value: ""
        }
    }

    getDetail = async (e) => {
        const user = e
        axios.get(`https://api.github.com/users/${user}/repos?all`)
            .then(api_call => {
                const fullData = api_call.data;
                this.setState({ dataSet: fullData, showTable: true, imgError: false });
            })
            .catch(error => {
                this.setState({ imgError: true });
            });
    }

    removeDetail = () => {
        this.setState({ showTable: false, dataSet: [], imgError: false });
    }

    errorimg = () => {
        return (
            <div className="text-center">
                <h1 className="display-5" style={{ color: 'red' }}>USER NOT FOUND</h1>
                <img src="./images/NoUser.jpg" alt="error" />
            </div>
        )
    }

    handleClick = (event) => {
        this.setState({
            currentPage: Number(event.target.id)
        });
    }

    render() {

        const { dataSet, currentPage, reposPerPage } = this.state;
        // Logic for displaying current repos
        const indexOfLastTodo = currentPage * reposPerPage;
        const indexOfFirstTodo = indexOfLastTodo - reposPerPage;
        const currentTodos = dataSet && dataSet.slice(indexOfFirstTodo, indexOfLastTodo);
        // Logic for displaying page numbers
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(dataSet.length / reposPerPage); i++) {
            pageNumbers.push(i);
        }
        const renderPageNumbers = pageNumbers.map(number => {
            return (
                <li className="page-item" key={number} >
                    <a className="page-link" onClick={this.handleClick} id={number}> {number} </a>
                </li>
            );
        });

        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-lg-4">
                        <Title />
                        <SearchBar
                            value={this.state.value}
                            onChange={(newValue) => this.setState({ value: newValue })}
                            onRequestSearch={() => this.getDetail(this.state.value)}
                            onCancelSearch={() => this.removeDetail()}
                        />
                    </div>

                    <div className="col-lg-4">
                        {
                            Array.isArray(dataSet) && dataSet.length > 0 &&
                            <h3>User Name :-<b>{this.state.dataSet[0].owner.login}</b></h3>
                        }
                    </div>

                    <div className="col-lg-4">
                        {Array.isArray(dataSet) && dataSet.length > 0 && <UserImage userIMG={this.state.dataSet[0].owner.avatar_url} />}
                    </div>

                </div>

                <div>
                    {
                        this.state.showTable &&
                        <h5>Number of Results :- {dataSet.length}</h5>
                    }
                </div>

                <div className="row mt-5">
                    <div className="col-md-12">
                        {this.state.imgError && this.errorimg()}
                        {
                            dataSet && Array.isArray(currentTodos) && currentTodos.length > 0 && currentTodos.map((row) => <Simplecard key={row.id} data={row} />)
                        }
                    </div>
                </div>

                {
                    dataSet.length >= 10 &&
                    <ul className="pagination" style={{ float: 'right' }}>
                        {renderPageNumbers}
                    </ul>
                }
                
            </div>
        );
    }
}

export default SearchRepository;