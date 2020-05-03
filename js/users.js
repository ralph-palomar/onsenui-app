/////// EVENT LISTENERS ////////
document.addEventListener('show', (event) => {
    if (event.target.matches('ons-page#users')) {
        const user_list = document.querySelector('div#user_list');
        ReactDOM.render(<Users/>, user_list);
    }
});

class Users extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userList: []
        }
    }
    componentDidMount() {
        const config = {
            "url": props.users_api_base_url + "/v1/users/all",
            "method": "GET",
            "timeout": 60000,
        };
        callApi(config, (data) => {
            this.setState({
                userList: data
            });
        }, 'users');   
    }
    render() {
        return (
            this.state.userList.map((value) =>
                <ons-list-item>
                    <div class="center">
                        <span class="list-item__title">{value.firstname + " " + value.lastname}</span>
                        <span class="list-item__subtitle">{value.email}</span>
                    </div>
                    <div class="right">
                        <ons-switch checked={value.enabled}></ons-switch>
                    </div>
                </ons-list-item>
            )
        );
    }
}
