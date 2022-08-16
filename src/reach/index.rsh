'reach 0.1';

export const main = Reach.App(() => {
  const Alice =  Participant('Alice', {
    expected: UInt,
    checkBalance: Fun([], Null),
    donationAlert: Fun([Address, UInt, UInt], Null)
  });
  const Bob = API('Bob', {
    viewProgress: Fun([], Object({ progress: UInt, expected: UInt})),
    donate: Fun([UInt], Bool),
  });

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
