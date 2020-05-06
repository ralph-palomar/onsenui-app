/////// EVENT LISTENERS ////////
document.addEventListener('show', (event) => {
    if (event.target.matches('ons-page#basicinfo')) {
        const basic_dob = document.querySelector('div#basic_dob');
        ReactDOM.render(<DatePickerComponent/>, basic_dob);
    }
});

import DatePicker from './datepicker.min';

class DatePickerComponent extends React.Component {
    state = {
		date: new Date(),
	  }
	
	  onChange = date => this.setState({ date })
	
	  render() {
		return (
		  <div>
			<DatePicker
			  onChange={this.onChange}
			  value={this.state.date}
			/>
		  </div>
		);
	  }
}