import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import FaceRec from './components/FaceRec/FaceRec';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import Particles from "react-tsparticles";
import Signin from './components/Signin/Signin.js';
import Register from './components/Register/Register.jsx';
// import Clarifai from 'clarifai';

const initialtState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'Signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    password: '',
    entries: 0,
    joined: '',
    gigi: ''
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = initialtState
  }

  // componentDidMount() {
  //   fetch('http://localhost:3000/')
  //     .then(response => response.json())
  //     .then(console.log)
  // }

  onRouteChange = (route) => {
    this.setState({ route: route })
    if (route === 'signout') {
      this.setState(initialtState)
    } else if (route === 'home') {
      this.setState({ isSignedIn: true })
    }
  }

  onInputChange = (event) => {
    // console.log(event.target.value);
    this.setState({ input: event.target.value });
  }

  calculatefaceloc = (data) => {
    // console.log(data)
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    // console.log(clarifaiFace)
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    // console.log(width, height);
    // console.log(data.outputs[0].data.regions[0].region_info.bounding_box)
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    }
  }


  onButtonSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch('https://pacific-taiga-16060.herokuapp.com/imageurl', {
      method: 'post',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input,
      })
    })
      .then(response => response.json())
      .then(result => {
        // console.log(result);
        result = JSON.parse(result);
        if (result) {
          fetch('https://pacific-taiga-16060.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id,
            })
          })
            .then(response => response.json())
            .then(body => {
              // console.log(body)
              const entries = +(body.entries)
              this.setState(Object.assign(this.state.user, { entries: entries }))
            })
        }
        this.displayFaceBox(this.calculatefaceloc(result))
        // console.log(result.outputs[0].data.regions[0].region_info.bounding_box)
        // console.log(result.outputs[0].data.regions[0].value)
      })
      .catch(error => console.log('error', error));
  }

  loadUser = (data) => {
    // console.log('setting entries from loadUser', data.entries)
    this.setState({
      user:
      {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined,
        gigi: data.gigi,
      }
    })
  }

  displayFaceBox = (box) => {
    // console.log(box);
    this.setState({ box: box })
  }

  render() {
    const { isSignedIn, imageUrl, box, route } = this.state;
    return (
      <div className="App">

        <Particles className='particles'
          id="tsparticles"
          options={particlesOptions}
        />

        <Navigation
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn} />

        {route === 'home' ?
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit}
            />
            <FaceRec
              box={box}
              imageUrl={imageUrl}
            />
          </div> : (route === 'Signin' ?
            <div>
              <Signin
                onRouteChange={this.onRouteChange}
                loadUser={this.loadUser}
              />
            </div> :
            <div>
              <Register
                onRouteChange={this.onRouteChange}
                loadUser={this.loadUser}
              />
            </div>
          )
        }
      </div>
    );
  }
}

const particlesOptions = {
  background: { color: { value: "#0d47a1", }, opacity: 0 },
  fpsLimit: 100,
  interactivity: {
    events: { onClick: { enable: false, mode: "push", }, onHover: { enable: true, mode: "repulse", }, resize: true, },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40,
      },
      push: {
        quantity: 4,
      },
      repulse: {
        distance: 150,
        duration: 10,
      },
    },
  },
  particles: {
    color: {
      value: "#ffffff",
    },
    links: {
      color: "#ffffff",
      distance: 250,
      enable: true,
      opacity: 0.1,
      width: 1,
    },
    collisions: {
      enable: false,
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: true,
      speed: 3,
      straight: false,
    },
    number: {
      density: {
        enable: false,
        area: 800,
      },
      value: 40,
    },
    opacity: {
      value: 0.4,
    },
    shape: {
      type: "circle",
    },
    size: {
      random: true,
      value: 2,
    },
  },
  detectRetina: false,
}

export default App;
