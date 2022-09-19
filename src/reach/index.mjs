import { loadStdlib } from '@reach-sh/stdlib';
import * as backend from './build/index.main.mjs';
import { ask, yesno } from '@reach-sh/stdlib/ask.mjs';
const stdlib = loadStdlib(process.env);

const startingBalance = stdlib.parseCurrency(100);
const acc = await stdlib.newTestAccount(startingBalance);

//Set up functions for checking balance
const fmt = (x) => stdlib.formatCurrency(x, 4);
const getBalance = async () => fmt(await stdlib.balanceOf(acc));

const before = await getBalance()
console.log('Your starting balance is: ' + before)
console.log(`Your address is ${acc.getAddress()}`)

const Alice = {

  donationAlert: (address, donation, progress) => {
    console.log(`${address} just made a donation of ${parseInt(donation)}. Current progress is ${parseInt(progress)}`)
  },

  checkBalance: async () => {
    console.log(`Your current balance is ${await getBalance()}`)
  },
}

const createStream = async () => {
  const isBlogOwner = await ask(
    `Do you want to create a crowdfund?`,
    yesno
  );
  const who = isBlogOwner ? 'Owner' : 'Subscriber';

  console.log(`Starting as ${who}`);

  let ctc = null;
  if (isBlogOwner) {
    const expected = await ask('How much is your target for the crowdfund?', parseInt)
    ctc = acc.contract(backend);
    backend.Alice(ctc, {
      ...Alice,
      expected
    })
    console.log('Deploying Contract...');
    const info = JSON.stringify(await ctc.getInfo(), null, 2);
    console.log('Contract info..')
    console.log(info);

  } 
  else {
    const info = await ask(
      `Please paste the contract information of the blog you want to subscribe to:`,
      JSON.parse
    );
    ctc = acc.contract(backend, info);

    console.log("...Successfully Connected...")

    while(true){
      try {
        const { progress, expected } = await ctc.apis.Bob.viewProgress();
        console.log(`Current progress = ${parseInt(progress)}`)
        console.log(`Expected = ${parseInt(expected)}`)
      } catch (error) {
        const proceed = await ask('Seems the crowdfund target has been achieved. Try again?' ,yesno)
        if(proceed) continue
        process.exit()
      }

      const donate = await ask('Do you want to donate?', yesno)
      if(donate){
        const donation = await ask('How much do you want to donate?', parseInt)
        try {
          await ctc.apis.Bob.donate(donation)
          console.log(`Successfully donated ${donation}`)
        } catch (error) {
          console.log(error)
          continue
        }
      }
    }
  }
};

await createStream();