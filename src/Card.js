import React from "react";
import CountUp from "react-countup";
import "./Card.css";

class Card extends React.Component {
    render() {
        return (
            <div style={{ backgroundColor: this.props.color3 }} className="card-main">
                <div style={{ color: this.props.color2 }} className="card-number">
                    <CountUp separator={","} start={0} end={Number(this.props.value)} duration={0.5} />
                </div>
                <div style={{ color: this.props.color1 }} className="card-delta">
                    {this.props.delta ? (
                        <>
                            [+
                            <CountUp separator={","} start={0} end={Number(this.props.delta)} duration={0.5} />]
                        </>
                    ) : (
                        ""
                    )}
                </div>
                <div style={{ color: this.props.color1 }} className="card-title">
                    {this.props.title}
                </div>
            </div>
        );
    }
}

export default Card;
