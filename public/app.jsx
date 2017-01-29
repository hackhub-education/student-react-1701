var Student = React.createClass({

    getInitialState: function() {
        return {
            student: {
                firstname: this.props.student.firstname,
                _id: this.props.student._id
            }
        }
    },

    handleClick: function() {
        var ReactThis = this;
        axios.get('http://localhost:3000/students/' + this.props.student._id)
            .then(function(response) {
                ReactThis.setState({
                    student: response.data
                })
            })
            .catch(function(err) {
                console.log(err)
            })

    },

    render: function() {
        return (
            <div>
                <p onClick={this.handleClick}>{this.props.student.firstname}</p>
                <p>{this.state.student.lastname}</p>
                <p>{this.state.student.age}</p>
                <p>{this.state.student.school}</p>
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