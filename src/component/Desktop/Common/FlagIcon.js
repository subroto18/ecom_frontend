import React, {Component,Fragment} from 'react';
import 'react-bootstrap-country-select/dist/react-bootstrap-country-select.css';
import CountrySelect from 'react-bootstrap-country-select';
class FlagIcon extends Component {
constructor() {
    super();
    this.state =  {
        value:null
    }
}
onChangeValue (e) {
   this.setState({
       value:e.id
   })
}
    render() {
        return (
            <Fragment>
                <CountrySelect
                    value={this.state.value}
                    onChange={this.onChangeValue.bind(this)}
                />
            </Fragment>
        );
    }
}
export default FlagIcon;