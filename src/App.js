import './App.css';
import './style.css';
import { Provider } from 'react-redux';
import { store } from './component/redux/store';
import logo from './assets/reduxlogo.jpg';
import FormCRUD from './component/FormCRUD';

function App() {
  
  let internalStyles={
    height:'25px',
    width:'40px'
  };

  return (
    <div className="App">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-secondary py-3">
  <div className="container-fluid">
    <div className="d-flex justify-content-between w-100">
      <div></div> {/* Empty div to take up space on the left side */}
      <span className="navbar-brand mb-0 h4 text-white mx-auto">
        React thunk + axios with Redux
      </span>
      <div className="text-white h5">
        <span>
          <img src={logo} alt="loading..." style={internalStyles} />
        </span>
      </div>
    </div>
  </div>
</nav>


      {/* Main Content */}
      <div className="container mt-4">
        <Provider store={store}>
        <FormCRUD/>
        </Provider>
        
      </div>

      {/* Footer */}
      <footer className="text-center text-light bg-dark py-3 mt-4">
        <small>© 2024 React-Redux Demo | Made with ❤️ by Anubhav</small>
      </footer>
    </div>
  );
}

export default App;
