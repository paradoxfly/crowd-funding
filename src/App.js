import './App.css';
import { loadStdlib } from '@reach-sh/stdlib';
import { ALGO_MyAlgoConnect as MyAlgoConnect } from '@reach-sh/stdlib';
import * as backend from './reach/build/index.main.mjs'
import { useState } from 'react';
import { views, Loader } from './utils/';
import { ConnectAccount, PasteContractInfo, SelectRole, CrowdFund, Donate } from './screens';


const reach = loadStdlib('ALGO');
reach.setWalletFallback(reach.walletFallback( { providerEnv: 'TestNet', MyAlgoConnect } ))

function App() {
  const [ account, setAccount ] = useState({})
  const [ contract, setContract ] =  useState()
  const [ view, setView ] = useState(views.CONNECT_ACCOUNT)
  const [ contractInfo, setContractInfo ] = useState(`{"type":"BigNumber","hex":"0xlade"}`)
  const [ expected, setExpected ] = useState()
  const [ donors, setDonors ] = useState([
    // {address: 'Adamudanburuba', donation: 40}, 
    // {address: 'Adamudanburuba', donation: 40},
    // {address: 'Adamudanburuba', donation: 40},
    // {address: 'Adamudanburuba', donation: 40},
  ])
  const [ update, setUpdate ] = useState(1)
  const [ progress, setProgress ] = useState(0)
  const [ completed, setCompleted ] = useState(false)

  const reachFunctions = {
    connect: async (secret, mnemonic = false) => {
      let result = ""
      try {
        const account = mnemonic ? await reach.newAccountFromMnemonic(secret) : await reach.getDefaultAccount();
        setAccount(account);
        setView(views.DEPLOY_OR_ATTACH);
        result = 'success';
      } catch (error) {
        result = 'failed';
      }
      return result;
    },

    setAsDeployer: (deployer = true) => {
      if(deployer){
        setView(views.SET_TOKEN_INFO);
      }
      else{
        setView(views.PASTE_CONTRACT_INFO);
      }
    },

    deploy: async () => {
      const contract = account.contract(backend);
      backend.Alice(contract, { expected, ...Alice});
      setView(views.DEPLOYING);
      const ctcInfo = JSON.stringify(await contract.getInfo(), null, 2)
      setContractInfo(`${ctcInfo}`);
      setView(views.CROWD_FUND)
    },

    attach: async (contractInfo) => {
      const contract = account.contract(backend, JSON.parse(contractInfo));
      setContract(contract)
      // backend.Attacher(contract, Bob)
      setView(views.ATTACHING)

      try {
        const hexProgress = await contract.apis.Bob.viewProgress()
        console.log(hexProgress)
        setExpected(parseFloat(hexProgress.expected))
        setProgress(parseFloat(hexProgress.progress))
        setView(views.DONATE)
      } catch (error) {
        console.log(error)
        setView(views.DEPLOY_OR_ATTACH)
      }
    }
  }

  const Alice = {
    //expected: UInt,
    checkBalance: () => {
      setCompleted(true)
    },

    donationAlert: (donor, amountHex, pHex) => {
      const amount = parseFloat(amountHex)
      const p = parseFloat(pHex)
      setDonors(d => {
        const copy = [ ...d ]
        copy.push({
          address: donor,
          donation: amount
        })
        return copy
      })
      setProgress(p)
      setUpdate(Math.random())
    },
  }

  console.log(donors)
  
  return (
    <div className="App">
      <div className='top'>
        <h1>Crowd Funding</h1>
      </div>
      <header className="App-header">
        {
          view === views.CONNECT_ACCOUNT && 
          <ConnectAccount connect={reachFunctions.connect}/>
        }

        {
          view === views.DEPLOY_OR_ATTACH &&
          <SelectRole deploy={reachFunctions.deploy} attach={() => setView(views.PASTE_CONTRACT_INFO)} expected={expected} setExpected={setExpected}/>
        }

        {
          (view === views.DEPLOYING || view === views.ATTACHING) &&
          <Loader />
        }

        {
          view === views.PASTE_CONTRACT_INFO &&
          <PasteContractInfo attach={reachFunctions.attach}/>
        }

        {
          view === views.CROWD_FUND &&
          <CrowdFund 
            info={contractInfo} 
            expected={expected}
            donors={donors}
            progress={progress}
            update={update}
            complete={completed}
          />
        }

        {
          view === views.DONATE &&
          <Donate
            contract={contract}
            progress={progress}
            expected={expected}
            setExpected={setExpected}
            setProgress={setProgress}
          />
        }
      </header>
    </div>
  );
}

export default App;
