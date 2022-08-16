import { useState } from 'react'
import './index.css'

export function SelectRole({deploy, attach, expected, setExpected}){
  const [ deployer, setDeployer ] = useState(false)

  return(
    <>
      {
        deployer ?
          <div className='section'>
            <p>Set Target Amount</p>
            <input 
              type={'number'}
              value={expected}
              onChange={e => setExpected(e.target.value)}
            />
            <br />
            <button style={{width: '70%'}} className='button' onClick={() => deploy()}>Next</button>
          </div>
          :
          <div className='section'>
            <button className='button' onClick={() => setDeployer(true)}>Deploy Contract</button>
            <hr />
            <button className='button' onClick={() => attach()}>Attach to existing contract</button>
          </div>
      }
    </>
  )
}