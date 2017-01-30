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
                        <div className="form-group">
                            <input className="form-control" name="lastname" onChange={ReactThis.handleChange} value={ReactThis.state.student.lastname}/>

                        </div>
                        <div className="form-group">
                            <input className="form-control" name="age" onChange={ReactThis.handleChange} value={ReactThis.state.student.age}/>

                        </div>
                        <div className="form-group">
                            <input className="form-control" name="school" onChange={ReactThis.handleChange} value={ReactThis.state.student.school}/>

                        </div>
                        <button className="btn btn-info pull-right" onClick={ReactThis.handleSave}>Save</button>
                        <div className="clearfix"></div>
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
            <div className="container">
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