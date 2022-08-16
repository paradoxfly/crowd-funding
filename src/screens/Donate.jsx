import { useState } from "react"
import { Loader } from "../utils"


export function Donate({ contract, progress, expected, setProgress, setExpected }) {
  const [ loading, setLoading ] = useState(false)
  const [ donation, setDonation ] = useState(5)
  const [ error, setError ] = useState('')

  const refresh = async () => {
    setError('')
    setLoading(true)
    try {
      const hexProgress = await contract.apis.Bob.viewProgress()
      console.log(hexProgress)
      setExpected(parseFloat(hexProgress.expected))
      setProgress(parseFloat(hexProgress.progress))
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      setError('Refresh failed')
    }
  }

  const donate = async () => {
    setError('')
    setLoading(true)
    try {
      const d = await contract.apis.Bob.donate(donation)
      console.log(d)
      setProgress(p => parseFloat(p) + parseFloat(donation))
      setDonation(0)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
      setError('Donation failed')
    }
  }  

  return(
    <div className="section flex-column">
      {
        loading ?
        <Loader />
        :
        <>
          <h5>Total Donated: {progress} ALG ({(progress/expected) * 100}%)</h5>
          <h5>Expected: {expected} ALG</h5>
          <div>
            <input
              className="space-out"
              type='number'
              value={donation}
              onChange={e => setDonation(e.target.value)}
            />
            <button onClick={donate} className="button">Donate</button>
          </div>
          <button onClick={refresh} className="button space-out max-width">Refresh Data</button>
          { error && <small className="error">There was an error: {error}</small>  }
        </>
      }
    </div>
  )
}