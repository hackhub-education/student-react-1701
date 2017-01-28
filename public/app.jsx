var Student = React.createClass({

    render: function() {
        return (
            <div>
                <p>{this.props.student.firstname}</p>
                <p>{this.props.student.age}</p>
                <p>{this.props.student.school}</p>
            </div>
        )
    }

});


var StudentList = React.createClass({

    getInitialState: function() {
        return ({
            studentlist: [
                {
                    firstname: 'Yan',
                    age: 26,
                    school: 'sfu'
                },
                {
                    firstname: 'John',
                    age: 26,
                    school: 'ubc'
                },
                {
                    firstname: 'Leo',
                    age: 30,
                    school: 'ubc'
                }
            ]
        })
    },

    render: function() {
        console.log(this.state.studentlist);
        return (
            <div>
                { this.state.studentlist.map(function(student) {
                return <Student student={student}/>
            }) }
            </div>
        );

    }

});


ReactDOM.render(
    <StudentList/>
    , document.getElementById('app')
);