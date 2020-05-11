import React from "react";
import Card from "./Card";
import axios from "axios";
import "./App.css";

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            statewise: null,
            timeseries: null,
            state: 0,
            show: false,
            isloading: true,
        };
        this.handleSelect = this.handleSelect.bind(this);
    }

    async componentDidMount() {
        try {
            let { data } = await axios.get("https://api.covid19india.org/data.json");
            this.setState({
                timeseries: data.cases_time_series,
                statewise: data.statewise,
                state: 0,
                isloading: false,
            });
        } catch (err) {}
    }

    handleSelect(e) {
        this.setState({
            state: e.target.value,
        });
    }

    getLasteUpdateTime(x) {
        let oldDate = new Date(x);
        let curDate = new Date();
        let h = (24 + curDate.getHours() - oldDate.getHours()) % 24;
        let m = (60 + curDate.getMinutes() - oldDate.getMinutes()) % 60;
        let res = "";
        if (h >= 24) {
            let d = Math.floor(h / 24);
            h %= 24;
            res += `${d} day${d > 1 ? "s" : ""} `;
        }
        if (h > 0) res += `${h} hour${h > 1 ? "s" : ""} `;
        if (m > 0) res += `${m} minute${m > 1 ? "s" : ""} `;
        if (h || m) res += " ago";
        return " " + res;
    }

    render() {
        const { statewise, state, isloading } = this.state;
        return (
            <>
                {isloading ? (
                    <div className="loader"></div>
                ) : (
                    <>
                        <div className="heading">
                            <h1>
                                <span className="left">C</span>
                                <span>
                                    <img alt="virus.png" className="image" src="virus2.png" />
                                </span>
                                <span className="right">vid-19 India Tracker</span>
                            </h1>
                        </div>

                        <div style={{ width: "100%" }} className="outer-box">
                            {statewise ? (
                                <div className="block-2">
                                    <Card
                                        color1={"rgba(255,7,58,.6)"}
                                        color2={"#ff073a"}
                                        color3={"rgba(255,7,58,.13)"}
                                        delta={statewise[state] ? statewise[state].deltaconfirmed : 0}
                                        value={statewise[state] ? statewise[state].confirmed : 0}
                                        title={"Confirmed"}
                                    />
                                    <Card
                                        color1={"rgba(0,123,255,.6)"}
                                        color2={"#007bff"}
                                        color3={"rgba(0,123,255,.18)"}
                                        value={statewise[state] ? statewise[state].active : 0}
                                        title={"Active"}
                                    />
                                    <Card
                                        color1={"rgba(40,167,69,.6)"}
                                        color2={"#28a745"}
                                        color3={"rgba(40,167,69,.2)"}
                                        delta={statewise[state] ? statewise[state].deltarecovered : 0}
                                        value={statewise[state] ? statewise[state].recovered : 0}
                                        title={"Recovered"}
                                    />
                                    <Card
                                        color1={"rgba(108,117,125,.6)"}
                                        color2={"#6c757d"}
                                        color3={"rgba(108,117,125,.13)"}
                                        delta={statewise[state] ? statewise[state].deltadeaths : 0}
                                        value={statewise[state] ? statewise[state].deaths : 0}
                                        title={"Deaths"}
                                    />
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                        <div className="updated-time">
                            <p>
                                Last updated :{" "}
                                {statewise && statewise[state]
                                    ? this.getLasteUpdateTime(statewise[state].lastupdatedtime)
                                    : 0}
                            </p>
                        </div>

                        <div className="form-group">
                            <select onChange={this.handleSelect} className="form-control" id="exampleFormControlSelect1">
                                {statewise.map((i, j) => (
                                    <option key={j} value={j}>
                                        {i.state}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                )}
            </>
        );
    }
}
