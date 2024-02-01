import logo from './logo.svg';
import './App.css';
import contractAbi from './abi.json';
import {ethers} from 'ethers';
import {useState} from 'react';

function App() {
    const [text, setText] = useState();
  const contractAddress = "0x147855D8B62972c7ECEDD2991ad726abCc7FcD72"

  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function getMessage() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractAbi, signer);

      try {
        const transaction = await contract.getMessage();
        // await transaction.wait();
        console.log(transaction);
      } catch (err) {
        console.error('Error:', err);
      }
    }
  }

  async function setMessage() {
    if (typeof window.ethereum !== 'undefined') {
      await requestAccount();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractAbi, signer);

      try {
        const transaction = await contract.setMessage(text);
        await transaction.wait();
        console.log('Money withdrawn');
      } catch (err) {
        console.error('Error:', err);
      }
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p> */}
        <input onChange={(e)=>{setText(e.target.value)}}></input>
        <button onClick={()=>{setMessage()}} >send me 2k</button>

        <button onClick={()=>{getMessage()}} >2k received</button>
   
      </header>
    </div>
  );
}

export default App;
