import './index.css'

export function CrowdFund({info, expected, progress, donors, update, complete}){
  
  return(
    <div className='section' style={{display: 'flex', flexDirection: 'column'}}>
      {
        complete ? 
        <h6>Target Amount Successfully Raised</h6>
        :
        <h6>Contract Address: {info}</h6>
      }
      <h5>Progress: {(progress/expected) * 100}%</h5>
      <h5>Expected: {expected} ALG</h5>
      <small style={{color: 'transparent'}}>{update}</small>
      <table className='donors'>
        <thead>
          <tr>
            <td>Donor</td>
            <td>Amount (ALG)</td>
          </tr>
        </thead>
        <tbody>
          {
            donors.length === 0 ?
            <tr>
              <td>-</td>
              <td>-</td>
            </tr>
            :
            donors.map((donor, index) => (
              <tr key={index}>
                <td>{donor.address}</td>
                <td>{donor.donation}</td>
              </tr>
            ))
          }
        </tbody>
        <tfoot>
          <tr>
            <td>Total</td>
            <td>{progress}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}