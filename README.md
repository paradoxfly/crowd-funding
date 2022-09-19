# CROWD FUNDING

In this workshop, we'll design a simple crowdfunding application. The application will allow a deployer set a target amount they need, then have other users make donations to the application until the donations reach this target amount. After that, the donations get transferred to the deployer. The donations will be held by a smart contract, which then transfers them to the deployer after the termination condition has been met.

---

We'll assume that you'll go through this workshop in a directory named `~/reach/workshop-crowdfunding`

```
$ mkdir -p ~/reach/workshop-crowdfunding && cd ~/reach/workshop-crowdfunding
```

And that you have a copy of Reach [installed](https://docs.reach.sh/tool/#ref-install) in `~/reach` so you can write 

```
$ ../reach version
```
And it will run Reach. You should start off by initializing your Reach program:

```
$ ../reach init
```


## Problem Analysis
The first step in a reach program design is an analysis of the participants involved in the program. We'll need to answer the following questions:

* Who is involved in this application?
* What information do they know at the start of the program?
* What information are they going to discover and use in the program?
* What funds change ownership during the application and how?

You should write your answers in your Reach program (index.rsh) using a comment.

`/* Remember comments are written like this */`

#### Write down the problem analysis of this program as a comment.

Let's see how your answers compare to our answers:

* Two kinds of users are involved in the application: 
    * The deployer who deploys the crowdfund and sets the target amount
    * The attachers who donate to the crowdfund until the target amount is reached.
* At the start of the program, the deployer knows the target amount. The attachers dont know anything yet.
* As the program progresses, the attachers find out the target amount and how much has been donated, while the deployer finds out who has donated and how much they donated.
* Funds flow in one direction in the program; attacher to smart contract, then smart contract to deployer. The latter transfer only happens after the target amount has been met.

Its okay if your answers are different as long as they encapsulate the crowdfund concept.

---

## Data Definition
Now we know what information our program will deal with, next thing we have to do is decide how to translate that information into concrete data.

First things first, we'll need to define our [participants](https://docs.reach.sh/model/#term_participant%20instances).
* What participant type will the Deployer be?
* What participant type will the Attacher be?

Next we'll need to define the data types for the information that would be shared across the program, by answering these questions:
* What data type will the target amount be?
* What data type will the progress of the crowdfund be?
* What data type will the alert of a donation be?

After deciding these things, you should think about how the program will be provided with these values. In other words, 
* What participant interact interface will the participants use?
* What API function would they use if any?

You should refer to your problem analysis to do this step. Whenever a participant starts off knowing something, then it is a field in the [interact](https://docs.reach.sh/rsh/local/#rsh_interact) object. If they learn something, then it will be an argument of a function. If they provide something later, then it will be the result of the function. This is also the case for [API functions](https://docs.reach.sh/rsh/appinit/#rsh_API).

Write down your answers in your Reach file as the participant interact interface for each of the participants.

Let's compare notes again. 
* The Deployer will be a Participant.
* The Attacher will be an API.
* The target amount will be an unsigned integer (`UInt`)
* The progress of the crowdfund will be an unsigned integer (`UInt`)
* The alert of a donation will consist of three variables:
  * The Address of the donor whose data type would be `Address`
  * The amount donated which will be `UInt`
  * The updated progress of the crowdfund which will be a `UInt`

We write this in our program as:
```
const Alice =  Participant('Alice', {
    expected: UInt,
    checkBalance: Fun([], Null),
    donationAlert: Fun([Address, UInt, UInt], Null)
});

const Bob = API('Bob', {
    viewProgress: Fun([], Object({ progress: UInt, expected: UInt})),
    donate: Fun([UInt], Bool),
});
```

At this point you can modify your Javascript file (`index.mjs`) to contain definitions of these values.

## Program Flow
Now that our data have all been defined, we can design the flow of the program. We do this by chronologically outlining the steps our program takes, after which we translate this outline to Reach syntax. Now write out the steps our program will take.

Let's compare notes again.

* The deployer publishes the target amount for the crowdfund.
* We define a loop that lets the attachers repeatedly donate to the crowdfund until the target amount is met.
* In line with the [token linearity property](https://docs.reach.sh/model/#term_token%20linearity%20property), the balance of the contract gets transferred to the creator. 

> Since the actions of the attachers are API functions, we use a [parallelReduce](https://docs.reach.sh/rsh/consensus/#parallelreduce). The parallelReduce is a mixture of a [while loop](https://docs.reach.sh/rsh/consensus/#rsh_while) and a [fork](https://docs.reach.sh/rsh/step/#rsh_fork), the fork is embedded in the loop. Only one branch of the fork gets executed everytime the loop runs again

Now we define the branches of the parallelReduce. Each branch represents an API function.
* The attacher sees the target amount and current progress of the crowdfund.
* The attacher donates an amount of their choosing to the crowdfund, and the deployer gets notified.

Now we translate this to Reach code.

```
init();

Alice.only(() => {
    const expected = declassify(interact.expected);
})
Alice.publish(expected);

const [ counter, progress ] = 
    parallelReduce([ 0, 0 ])
        .invariant(balance() == progress)
        .while(progress < expected)
        .api_(Bob.viewProgress, () => {
            check( this != Alice, "Not Deployer");

            return [ 0, (resolve) => {
                resolve({ progress, expected });
                return [ counter, progress ];
            }];
        })
        .api_(Bob.donate, (donation) => {
            check( this != Alice, "Not Deployer");

            return [ donation, (resolve) => {
                Alice.interact.donationAlert(this, donation, progress+donation);
                resolve(true);
                return [ counter + 1, progress + donation ];
            }];
        });

transfer(balance()).to(Alice);
Alice.interact.checkBalance();

commit();
exit(); 
})
```

At this point, when we 
```
$ ../reach compile
```

we get a happy message that all our theorems are true and our program was compiled without any errors. Great job! But we still need to run our program!

## Deployment Decisions
Now that our smart contract is ready, we'll need to decide how we want to test and deploy it. 

First we start with a simple testing console program to show the application. Here's the code for it: 

```
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
```

Now  when we run the command `$ ../reach run` we get a console execution of the program. We can use one terminal instance as Alice and any number of others as Bobs. A web frontend implementation of this program can be seen [here](https://reach-crowdfunding.netlify.app/), and its code can be found [here](https://github.com/Gene027/praise/tree/main/crowd-funding-umoja-III-team-39).

## Discussion

You did it!
You implemented a Reach program by yourself, with a little guidance. If you found this workshop rewarding, please let us know on [Discord](https://discord.gg/G5SA5QWT). If you have any questions, don't hesitate to ask our discord community.