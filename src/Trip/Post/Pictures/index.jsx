import { Component } from 'react';
import { withStyles } from 'vitaminjs';
import classnames from 'classnames';
import s from './style.css';

class Pictures extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentPicture: 0
        };
    }
    componentDidMount() {
        setInterval(
            () => this.setState(({ currentPicture }) => ({ 
                currentPicture: (currentPicture + 1) % this.props.pictures.length 
            })), 
            10000,
        );
    }
    render () {
        const { pictures } = this.props; 
        return (
            <div className={s.pictures} >
                {
                    pictures.map((picture, i) => 
                        <div
                            className={classnames(s.picture, { [s.show]: this.state.currentPicture === i})}
                            key={picture}
                            style={{ backgroundImage: `url(${picture})` }}
                        /> 
                    )
                }
            </div>
        );
    }
}

export default withStyles(s)(Pictures);
