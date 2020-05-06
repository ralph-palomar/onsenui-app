window.fn = {};

window.fn.open = function() {
  const menu = document.getElementById('menu');
  menu.open();
};

window.fn.load = function(page) {
  const content = document.getElementById('content');
  const menu = document.getElementById('menu');
  content.load(page)
    .then(menu.close.bind(menu));
};

class Greeting extends React.Component {
  constructor(props) {
    super(props);
    this.props = {
      firstname: null,
    }
  }
	render() {
	  return (
		<ons-list-item>
		  Hello {this.props.firstname}!
		</ons-list-item>
	  );
	}
}