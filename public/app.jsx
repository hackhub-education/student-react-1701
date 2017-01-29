var Student = React.createClass({

    handleClick: function() {

        console.log(this.props.student._id);


    },

    render: function() {
        return (
            <div>
                <p onClick={this.handleClick}>{this.props.student.firstname}</p>
                <p>{this.state.student.age}</p>
            </div>
        )
    }

});


var StudentList = React.createClass({

    getInitialState: function() {
        return ({
            studentlist: []
        })
    },

    componentWillMount: function() {

        var ReactThis = this;

        axios.get('http://localhost:3000/students')
            .then(function(response) {
                ReactThis.setState({
                    studentlist: response.data
                })
            })
            .catch(function(err) {
                console.log(err);
            });

    },

    render: function() {
        return (
            <div>
                { this.state.studentlist.map(function(student) {
                return <Student student={student} key={student._id}/>
            }) }
            </div>
        );

    }

});


ReactDOM.render(
    <StudentList/>
    , document.getElementById('app')
);