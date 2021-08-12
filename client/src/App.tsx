import './App.css';
import { TestProvider } from "./contexts/test/TestContext";
import Test from "./components/Test";

function App() {
  return (
    <TestProvider>
      <div className="App">
        <Test />
      </div>
    </TestProvider>
  );
}

export default App;
