import React from 'react';
import './App.css';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      datas: []
    };
  };

 

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    
    fetch('http://localhost:9000/insert', {
      method: 'POST',
      body: data,
    });

    console.log("FORM POSTED");
    window.location.reload();
  }
  
  componentDidMount(){
    fetch("http://localhost:9000/users").then(res => res.json())
    .then(
      (result) => {
        this.setState({
          isLoaded: true,
          datas: result
        });
      },
      (error) => {
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }
  
  
  render(){
    const { error, datas } = this.state;
    if (error) {
      return (
        <div className="col">
          Error: {error.message}
        </div>
      );
    }
    return (
      <div className="App">
        <header>

        </header>
        <form onSubmit={this.handleSubmit} className="col-md-4" style={{
            backgroundColor: 'rgb(225,200,200)',
            margin: 'auto',
            marginTop: '25px',
            border: '1px solid red'
          }}>
    
          <label htmlFor="fname"><b>First name:</b></label><br/>
          <input type="text" id="fname" name="fname"/><br/><br/>
          <label htmlFor="lname"><b>Last name:</b></label><br/>
          <input type="text" id="lname" name="lname"/><br/><br/>
          <label><b>Gender:</b></label><br/>
          <div>
            <input type="radio" value="Male" id ="Male" name="gender" defaultChecked/>
            <label htmlFor="0">Male</label><br/>
            <input type="radio" value="Female" id ="Female" name="gender" />
            <label htmlFor="1">Female</label><br/>
          </div><br/>
          <label htmlFor="cskills"><b>Computer Skills:</b></label><br/>
          <input type="text" id="cskills" name="cskills"/><br/><br/>
          <label><b>Department:</b></label><br/>
          <select name="department" id="cars">
            <option value="Information Technologies">Information Technologies</option>
            <option value="Human Resources">Human Resources</option>
            <option value="Production">Production</option>
            <option value="Marketing">Marketing</option>
          </select><br/><br/>
          <button className="btn btn-success" type="submit">Send Data!</button>
          <br/><br/>
        </form>
        <hr/>

        <Table striped bordered hover variant="dark" style={{margin: 'auto'}}>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">İsim</th>
              <th scope="col">Soyisim</th>
              <th scope="col">Cinsiyet</th>
              <th scope="col">Çalıştığı Birim</th>
              <th scope="col">Bilgisayar Bilgisi</th>
            </tr>
          </thead>
            <tbody>
              {datas.map((value) => 
                      <tr><td>{value.id}</td>
                      <td>{value.name}</td>
                      <td>{value.surname}</td>
                      <td>{value.gender ? 'Kadın': 'Erkek'}</td>
                      <td>{value.department}</td>
                      <td>{value.computer_skills}</td></tr>
              )}
            </tbody>
        </Table>
        
        <hr/>
      </div>
    );
  }
}

export default App;
