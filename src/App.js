import RatioBox from "./components/RatioBox";

function App() {
  return (
    <div className="App">
        <RatioBox base="MATIC" quote="XRP" />
        <RatioBox base="ALGO" quote="HNT" />
        <RatioBox base="ALGO" quote="DOT" />
        <p>YADO: Reload all price boxes data at once.</p>
    </div>
  );
}

export default App;
