import './App.css';
import React, { Component } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import Alert from './components/Alert';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {

constructor(props)
{
  super(props);
  this.state =
  {
      mode: "light",
      alert: {
        msg: null,
        type: null
      },
      progress: 0
  }
}

toggleMode = () => {
  const newMode = this.state.mode==='light'? "dark": 'light'
  if(newMode === 'light')
    {
      document.body.style.backgroundColor = newMode === 'light' ? 'white' : 'black';
    }
    else
    {
      document.body.style.backgroundColor = newMode === 'light' ? 'white' : 'black';
    }
  this.setState(
    {
      mode: newMode,
    },
    //this.showAlert(newMode==='light'? "'Dark Mode has been Enabled', 'success'": "'Dark Mode has been Enabled', 'success'")
    () =>{
      this.showAlert(`${newMode === 'dark' ? 'Dark Mode has been Enabled' : 'Light Mode has been Enabled'}`, 'success');
    }
  )
}

showAlert = (msg, type) =>
{
  this.setState(
    {
      alert: {
        msg: msg,
        type: type
      }
    }
  )
  setTimeout(()=>
  {
    this.setState(
      {
        alert:
        {
          msg: null,
          type: null
        }
      }
    )
  } ,3000)
}
pageSize = 15;

apiKey = process.env.REACT_APP_NEWS_API

setProgress = (progress) =>
{
    this.setState({progress: progress})
}

render() {
  return (
    <div>
      <BrowserRouter>
        <Navbar mode={this.state.mode} toggleMode={this.toggleMode} alert={this.showAlert} />

        <LoadingBar
          height={3}
          color='#fc0505'
          progress={this.state.progress}
        />
        <Alert mode={this.state.mode} alert={this.state.alert} />

        <Routes>
          <Route exact path="/" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='general' mode={this.state.mode} toggleMode={this.toggleMode} pageSize={this.pageSize} category="general" country="us" />}/>
          <Route exact path="/Business" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='business' mode={this.state.mode} toggleMode={this.toggleMode} pageSize={this.pageSize} category="business" country="us" />}/>
          <Route exact path="/Entertainment" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='entertainment' mode={this.state.mode} toggleMode={this.toggleMode} pageSize={this.pageSize} category="entertainment" country="us" />}/>
          <Route exact path="/General" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='general' mode={this.state.mode} toggleMode={this.toggleMode} pageSize={this.pageSize} category="general" country="us" />}/>
          <Route exact path="/Health" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='health' mode={this.state.mode} toggleMode={this.toggleMode} pageSize={this.pageSize} category="health" country="us" />}/>
          <Route exact path="/Science" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='science' mode={this.state.mode} toggleMode={this.toggleMode} pageSize={this.pageSize} category="science" country="us" />}/>
          <Route exact path="/Sports" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='sports' mode={this.state.mode} toggleMode={this.toggleMode} pageSize={this.pageSize} category="sports" country="us" />}/>
          <Route exact path="/Technology" element={<News setProgress={this.setProgress} apiKey={this.apiKey} key='technology' mode={this.state.mode} toggleMode={this.toggleMode} pageSize={this.pageSize} category="technology" country="us" />}/>
        </Routes>

      </BrowserRouter>
    </div>
  );
}
}
