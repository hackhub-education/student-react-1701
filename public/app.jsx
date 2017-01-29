var Student = React.createClass({

    getInitialState: function() {
        return {
            student: {
                firstname: this.props.student.firstname,
                _id: this.props.student._id
            },
            showUpdate: false
        }
    },

    handleClick: function() {
        var ReactThis = this;
        axios.get('http://localhost:3000/students/' + this.props.student._id)
            .then(function(response) {
                ReactThis.setState({
                    student: response.data,
                    showUpdate: true
                })
            })
            .catch(function(err) {
                console.log(err)
            })

    },

    handleChange: function(event) {

        var studentObj = this.state.student;

        studentObj[event.target.name] = event.target.value;

        this.setState({
            student: studentObj
        })


    },

    handleSave: function() {

        axios.post('http://localhost:3000/students/update/', this.state.student)
            .then(function(response) {
                console.log(response.data);
            })
            .catch(function(err) {
                console.log(err);
            })

    },

    render: function() {

        var ReactThis = this;

        var updateForm = function() {
            if (ReactThis.state.showUpdate)
                return (
                    <div>
                        <input name="lastname" onChange={ReactThis.handleChange} value={ReactThis.state.student.lastname}/>
                        <input name="age" onChange={ReactThis.handleChange} value={ReactThis.state.student.age}/>
                        <input name="school" onChange={ReactThis.handleChange} value={ReactThis.state.student.school}/>
                        <button onClick={ReactThis.handleSave}>Save</button>
                    </div>
                )

        };

        return (
            <div>
                <h3 onClick={this.handleClick}>{this.props.student.firstname}</h3>
                {updateForm()}
            </div>
        )
    }

});


var StudentList = React.createClass({

    getInitialState: function() {
        return {
            studentlist: []
        }
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