// Automatically generated with Reach 0.1.11 (7d2358ff)
/* eslint-disable */
export const _version = '0.1.11';
export const _versionHash = '0.1.11 (7d2358ff)';
export const _backendVersion = 17;

export function getExports(s) {
  const stdlib = s.reachStdlib;
  return {
    };
  };
export function _getEvents(s) {
  const stdlib = s.reachStdlib;
  return {
    };
  };
export function _getViews(s, viewlib) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_UInt;
  
  return {
    infos: {
      },
    views: {
      3: [ctc0, ctc1, ctc1, ctc1]
      }
    };
  
  };
export function _getMaps(s) {
  const stdlib = s.reachStdlib;
  const ctc0 = stdlib.T_Tuple([]);
  return {
    mapDataTy: ctc0
    };
  };
export async function Alice(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Alice expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Alice expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_UInt;
  const ctc1 = stdlib.T_Tuple([ctc0]);
  const ctc2 = stdlib.T_Tuple([]);
  const ctc3 = stdlib.T_Data({
    Bob_donate0_38: ctc1,
    Bob_viewProgress0_38: ctc2
    });
  const ctc4 = stdlib.T_Null;
  const ctc5 = stdlib.T_Bool;
  const ctc6 = stdlib.T_Object({
    expected: ctc0,
    progress: ctc0
    });
  
  
  const v347 = stdlib.protect(ctc0, interact.expected, 'for Alice\'s interact field expected');
  
  const txn1 = await (ctc.sendrecv({
    args: [v347],
    evt_cnt: 1,
    funcNum: 0,
    lct: stdlib.checkedBigNumberify('./index.rsh:19:9:dot', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc0],
    pay: [stdlib.checkedBigNumberify('./index.rsh:19:9:decimal', stdlib.UInt_max, '0'), []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v351], secs: v353, time: v352, didSend: v27, from: v350 } = txn1;
      
      ;
      const v355 = stdlib.checkedBigNumberify('./index.rsh:22:25:decimal', stdlib.UInt_max, '0');
      const v356 = v352;
      const v359 = stdlib.checkedBigNumberify('./index.rsh:14:9:after expr stmt semicolon', stdlib.UInt_max, '0');
      
      if (await (async () => {
        const v362 = stdlib.lt(v355, v351);
        
        return v362;})()) {
        sim_r.isHalt = false;
        }
      else {
        sim_r.txns.push({
          kind: 'from',
          to: v350,
          tok: undefined /* Nothing */
          });
        
        sim_r.txns.push({
          kind: 'halt',
          tok: undefined /* Nothing */
          })
        sim_r.isHalt = true;
        }
      return sim_r;
      }),
    soloSend: true,
    timeoutAt: undefined /* mto */,
    tys: [ctc0],
    waitIfNotPresent: false
    }));
  const {data: [v351], secs: v353, time: v352, didSend: v27, from: v350 } = txn1;
  ;
  let v355 = stdlib.checkedBigNumberify('./index.rsh:22:25:decimal', stdlib.UInt_max, '0');
  let v356 = v352;
  let v359 = stdlib.checkedBigNumberify('./index.rsh:14:9:after expr stmt semicolon', stdlib.UInt_max, '0');
  
  while (await (async () => {
    const v362 = stdlib.lt(v355, v351);
    
    return v362;})()) {
    const txn2 = await (ctc.recv({
      didSend: false,
      evt_cnt: 1,
      funcNum: 2,
      out_tys: [ctc3],
      timeoutAt: undefined /* mto */,
      waitIfNotPresent: false
      }));
    const {data: [v399], secs: v401, time: v400, didSend: v254, from: v398 } = txn2;
    switch (v399[0]) {
      case 'Bob_donate0_38': {
        const v402 = v399[1];
        undefined /* setApiDetails */;
        const v407 = v402[stdlib.checkedBigNumberify('./index.rsh:33:12:spread', stdlib.UInt_max, '0')];
        const v408 = stdlib.addressEq(v398, v350);
        const v409 = v408 ? false : true;
        stdlib.assert(v409, {
          at: 'reach standard library:57:5:application',
          fs: ['at ./index.rsh:34:14:application call to "check" (defined at: reach standard library:49:32:function exp)', 'at ./index.rsh:33:36:application call to [unknown function] (defined at: ./index.rsh:33:36:function exp)', 'at ./index.rsh:22:19:application call to [unknown function] (defined at: ./index.rsh:33:36:function exp)', 'at ./index.rsh:22:19:application call to [unknown function] (defined at: ./index.rsh:22:19:function exp)'],
          msg: 'Not Deployer',
          who: 'Alice'
          });
        const v416 = stdlib.add(v359, v407);
        ;
        const v423 = stdlib.add(v355, v407);
        stdlib.protect(ctc4, await interact.donationAlert(v398, v407, v423), {
          at: './index.rsh:37:39:application',
          fs: ['at ./index.rsh:37:39:application call to [unknown function] (defined at: ./index.rsh:37:39:function exp)', 'at ./index.rsh:37:39:application call to "liftedInteract" (defined at: ./index.rsh:37:39:application)', 'at ./index.rsh:36:38:application call to [unknown function] (defined at: ./index.rsh:36:38:function exp)'],
          msg: 'donationAlert',
          who: 'Alice'
          });
        
        const v425 = true;
        await txn2.getOutput('Bob_donate', 'v425', ctc5, v425);
        const cv355 = v423;
        const cv356 = v400;
        const cv359 = v416;
        
        v355 = cv355;
        v356 = cv356;
        v359 = cv359;
        
        continue;
        break;
        }
      case 'Bob_viewProgress0_38': {
        const v448 = v399[1];
        undefined /* setApiDetails */;
        const v458 = stdlib.addressEq(v398, v350);
        const v459 = v458 ? false : true;
        stdlib.assert(v459, {
          at: 'reach standard library:57:5:application',
          fs: ['at ./index.rsh:26:14:application call to "check" (defined at: reach standard library:49:32:function exp)', 'at ./index.rsh:25:34:application call to [unknown function] (defined at: ./index.rsh:25:34:function exp)', 'at ./index.rsh:22:19:application call to [unknown function] (defined at: ./index.rsh:25:34:function exp)', 'at ./index.rsh:22:19:application call to [unknown function] (defined at: ./index.rsh:22:19:function exp)'],
          msg: 'Not Deployer',
          who: 'Alice'
          });
        ;
        const v485 = {
          expected: v351,
          progress: v355
          };
        await txn2.getOutput('Bob_viewProgress', 'v485', ctc6, v485);
        const cv355 = v355;
        const cv356 = v400;
        const cv359 = v359;
        
        v355 = cv355;
        v356 = cv356;
        v359 = cv359;
        
        continue;
        break;
        }
      }
    
    }
  ;
  stdlib.protect(ctc4, await interact.checkBalance(), {
    at: './index.rsh:44:34:application',
    fs: ['at ./index.rsh:44:34:application call to [unknown function] (defined at: ./index.rsh:44:34:function exp)', 'at ./index.rsh:44:34:application call to "liftedInteract" (defined at: ./index.rsh:44:34:application)'],
    msg: 'checkBalance',
    who: 'Alice'
    });
  
  return;
  
  
  };
export async function _Bob_donate3(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for _Bob_donate3 expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for _Bob_donate3 expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_UInt;
  const ctc2 = stdlib.T_Tuple([ctc1]);
  const ctc3 = stdlib.T_Tuple([]);
  const ctc4 = stdlib.T_Data({
    Bob_donate0_38: ctc2,
    Bob_viewProgress0_38: ctc3
    });
  const ctc5 = stdlib.T_Bool;
  const ctc6 = stdlib.T_Null;
  
  
  const [v350, v351, v355, v359] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'), [ctc0, ctc1, ctc1, ctc1]);
  const v374 = ctc.selfAddress();
  const v376 = stdlib.protect(ctc2, await interact.in(), {
    at: './index.rsh:1:23:application',
    fs: ['at ./index.rsh:33:36:application call to [unknown function] (defined at: ./index.rsh:33:36:function exp)', 'at ./index.rsh:22:19:application call to "runBob_donate0_38" (defined at: ./index.rsh:33:12:function exp)', 'at ./index.rsh:22:19:application call to [unknown function] (defined at: ./index.rsh:22:19:function exp)'],
    msg: 'in',
    who: 'Bob_donate'
    });
  const v377 = v376[stdlib.checkedBigNumberify('./index.rsh:1:23:application', stdlib.UInt_max, '0')];
  const v379 = stdlib.addressEq(v374, v350);
  const v380 = v379 ? false : true;
  stdlib.assert(v380, {
    at: 'reach standard library:57:5:application',
    fs: ['at ./index.rsh:34:14:application call to "check" (defined at: reach standard library:49:32:function exp)', 'at ./index.rsh:33:36:application call to [unknown function] (defined at: ./index.rsh:33:36:function exp)', 'at ./index.rsh:22:19:application call to "runBob_donate0_38" (defined at: ./index.rsh:33:12:function exp)', 'at ./index.rsh:22:19:application call to [unknown function] (defined at: ./index.rsh:22:19:function exp)'],
    msg: 'Not Deployer',
    who: 'Bob_donate'
    });
  const v387 = ['Bob_donate0_38', v376];
  
  const txn1 = await (ctc.sendrecv({
    args: [v350, v351, v355, v359, v387],
    evt_cnt: 1,
    funcNum: 2,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc4],
    pay: [v377, []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v399], secs: v401, time: v400, didSend: v254, from: v398 } = txn1;
      
      switch (v399[0]) {
        case 'Bob_donate0_38': {
          const v402 = v399[1];
          sim_r.txns.push({
            kind: 'api',
            who: "Bob_donate"
            });
          const v407 = v402[stdlib.checkedBigNumberify('./index.rsh:33:12:spread', stdlib.UInt_max, '0')];
          const v416 = stdlib.add(v359, v407);
          sim_r.txns.push({
            amt: v407,
            kind: 'to',
            tok: undefined /* Nothing */
            });
          const v423 = stdlib.add(v355, v407);
          const v425 = true;
          const v426 = await txn1.getOutput('Bob_donate', 'v425', ctc5, v425);
          
          const v600 = v423;
          const v602 = v416;
          const v603 = stdlib.lt(v423, v351);
          if (v603) {
            sim_r.isHalt = false;
            }
          else {
            sim_r.txns.push({
              kind: 'from',
              to: v350,
              tok: undefined /* Nothing */
              });
            sim_r.txns.push({
              kind: 'halt',
              tok: undefined /* Nothing */
              })
            sim_r.isHalt = true;
            }
          break;
          }
        case 'Bob_viewProgress0_38': {
          const v448 = v399[1];
          
          break;
          }
        }
      return sim_r;
      }),
    soloSend: false,
    timeoutAt: undefined /* mto */,
    tys: [ctc0, ctc1, ctc1, ctc1, ctc4],
    waitIfNotPresent: false
    }));
  const {data: [v399], secs: v401, time: v400, didSend: v254, from: v398 } = txn1;
  switch (v399[0]) {
    case 'Bob_donate0_38': {
      const v402 = v399[1];
      undefined /* setApiDetails */;
      const v407 = v402[stdlib.checkedBigNumberify('./index.rsh:33:12:spread', stdlib.UInt_max, '0')];
      const v408 = stdlib.addressEq(v398, v350);
      const v409 = v408 ? false : true;
      stdlib.assert(v409, {
        at: 'reach standard library:57:5:application',
        fs: ['at ./index.rsh:34:14:application call to "check" (defined at: reach standard library:49:32:function exp)', 'at ./index.rsh:33:36:application call to [unknown function] (defined at: ./index.rsh:33:36:function exp)', 'at ./index.rsh:22:19:application call to [unknown function] (defined at: ./index.rsh:33:36:function exp)', 'at ./index.rsh:22:19:application call to [unknown function] (defined at: ./index.rsh:22:19:function exp)'],
        msg: 'Not Deployer',
        who: 'Bob_donate'
        });
      const v416 = stdlib.add(v359, v407);
      ;
      const v423 = stdlib.add(v355, v407);
      const v425 = true;
      const v426 = await txn1.getOutput('Bob_donate', 'v425', ctc5, v425);
      if (v254) {
        stdlib.protect(ctc6, await interact.out(v402, v426), {
          at: './index.rsh:33:13:application',
          fs: ['at ./index.rsh:33:13:application call to [unknown function] (defined at: ./index.rsh:33:13:function exp)', 'at ./index.rsh:38:18:application call to "resolve" (defined at: ./index.rsh:36:38:function exp)', 'at ./index.rsh:36:38:application call to [unknown function] (defined at: ./index.rsh:36:38:function exp)'],
          msg: 'out',
          who: 'Bob_donate'
          });
        }
      else {
        }
      
      const v600 = v423;
      const v602 = v416;
      const v603 = stdlib.lt(v423, v351);
      if (v603) {
        return;
        }
      else {
        ;
        return;
        }
      break;
      }
    case 'Bob_viewProgress0_38': {
      const v448 = v399[1];
      return;
      break;
      }
    }
  
  
  };
export async function _Bob_viewProgress3(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for _Bob_viewProgress3 expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for _Bob_viewProgress3 expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const ctc0 = stdlib.T_Address;
  const ctc1 = stdlib.T_UInt;
  const ctc2 = stdlib.T_Tuple([]);
  const ctc3 = stdlib.T_Tuple([ctc1]);
  const ctc4 = stdlib.T_Data({
    Bob_donate0_38: ctc3,
    Bob_viewProgress0_38: ctc2
    });
  const ctc5 = stdlib.T_Object({
    expected: ctc1,
    progress: ctc1
    });
  const ctc6 = stdlib.T_Null;
  
  
  const [v350, v351, v355, v359] = await ctc.getState(stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3'), [ctc0, ctc1, ctc1, ctc1]);
  const v363 = ctc.selfAddress();
  const v365 = stdlib.protect(ctc2, await interact.in(), {
    at: './index.rsh:1:23:application',
    fs: ['at ./index.rsh:25:34:application call to [unknown function] (defined at: ./index.rsh:25:34:function exp)', 'at ./index.rsh:22:19:application call to "runBob_viewProgress0_38" (defined at: ./index.rsh:25:12:function exp)', 'at ./index.rsh:22:19:application call to [unknown function] (defined at: ./index.rsh:22:19:function exp)'],
    msg: 'in',
    who: 'Bob_viewProgress'
    });
  const v366 = stdlib.addressEq(v363, v350);
  const v367 = v366 ? false : true;
  stdlib.assert(v367, {
    at: 'reach standard library:57:5:application',
    fs: ['at ./index.rsh:26:14:application call to "check" (defined at: reach standard library:49:32:function exp)', 'at ./index.rsh:25:34:application call to [unknown function] (defined at: ./index.rsh:25:34:function exp)', 'at ./index.rsh:22:19:application call to "runBob_viewProgress0_38" (defined at: ./index.rsh:25:12:function exp)', 'at ./index.rsh:22:19:application call to [unknown function] (defined at: ./index.rsh:22:19:function exp)'],
    msg: 'Not Deployer',
    who: 'Bob_viewProgress'
    });
  const v372 = ['Bob_viewProgress0_38', v365];
  
  const txn1 = await (ctc.sendrecv({
    args: [v350, v351, v355, v359, v372],
    evt_cnt: 1,
    funcNum: 2,
    lct: stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '0'),
    onlyIf: true,
    out_tys: [ctc4],
    pay: [stdlib.checkedBigNumberify('./index.rsh:28:18:decimal', stdlib.UInt_max, '0'), []],
    sim_p: (async (txn1) => {
      const sim_r = { txns: [], mapRefs: [], maps: [] };
      let sim_txn_ctr = stdlib.UInt_max;
      const getSimTokCtr = () => { sim_txn_ctr = sim_txn_ctr.sub(1); return sim_txn_ctr; };
      
      
      const {data: [v399], secs: v401, time: v400, didSend: v254, from: v398 } = txn1;
      
      switch (v399[0]) {
        case 'Bob_donate0_38': {
          const v402 = v399[1];
          
          break;
          }
        case 'Bob_viewProgress0_38': {
          const v448 = v399[1];
          sim_r.txns.push({
            kind: 'api',
            who: "Bob_viewProgress"
            });
          ;
          const v485 = {
            expected: v351,
            progress: v355
            };
          const v486 = await txn1.getOutput('Bob_viewProgress', 'v485', ctc5, v485);
          
          const v612 = v355;
          const v614 = v359;
          const v615 = stdlib.lt(v355, v351);
          if (v615) {
            sim_r.isHalt = false;
            }
          else {
            sim_r.txns.push({
              kind: 'from',
              to: v350,
              tok: undefined /* Nothing */
              });
            sim_r.txns.push({
              kind: 'halt',
              tok: undefined /* Nothing */
              })
            sim_r.isHalt = true;
            }
          break;
          }
        }
      return sim_r;
      }),
    soloSend: false,
    timeoutAt: undefined /* mto */,
    tys: [ctc0, ctc1, ctc1, ctc1, ctc4],
    waitIfNotPresent: false
    }));
  const {data: [v399], secs: v401, time: v400, didSend: v254, from: v398 } = txn1;
  switch (v399[0]) {
    case 'Bob_donate0_38': {
      const v402 = v399[1];
      return;
      break;
      }
    case 'Bob_viewProgress0_38': {
      const v448 = v399[1];
      undefined /* setApiDetails */;
      const v458 = stdlib.addressEq(v398, v350);
      const v459 = v458 ? false : true;
      stdlib.assert(v459, {
        at: 'reach standard library:57:5:application',
        fs: ['at ./index.rsh:26:14:application call to "check" (defined at: reach standard library:49:32:function exp)', 'at ./index.rsh:25:34:application call to [unknown function] (defined at: ./index.rsh:25:34:function exp)', 'at ./index.rsh:22:19:application call to [unknown function] (defined at: ./index.rsh:25:34:function exp)', 'at ./index.rsh:22:19:application call to [unknown function] (defined at: ./index.rsh:22:19:function exp)'],
        msg: 'Not Deployer',
        who: 'Bob_viewProgress'
        });
      ;
      const v485 = {
        expected: v351,
        progress: v355
        };
      const v486 = await txn1.getOutput('Bob_viewProgress', 'v485', ctc5, v485);
      if (v254) {
        stdlib.protect(ctc6, await interact.out(v448, v486), {
          at: './index.rsh:25:13:application',
          fs: ['at ./index.rsh:25:13:application call to [unknown function] (defined at: ./index.rsh:25:13:function exp)', 'at ./index.rsh:29:18:application call to "resolve" (defined at: ./index.rsh:28:31:function exp)', 'at ./index.rsh:28:31:application call to [unknown function] (defined at: ./index.rsh:28:31:function exp)'],
          msg: 'out',
          who: 'Bob_viewProgress'
          });
        }
      else {
        }
      
      const v612 = v355;
      const v614 = v359;
      const v615 = stdlib.lt(v355, v351);
      if (v615) {
        return;
        }
      else {
        ;
        return;
        }
      break;
      }
    }
  
  
  };
export async function Bob_donate(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Bob_donate expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Bob_donate expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep()
  if (step == 3) {return _Bob_donate3(ctcTop, interact);}
  throw stdlib.apiStateMismatchError({ _stateSourceMap }, [stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3')], stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, step))
  };
export async function Bob_viewProgress(ctcTop, interact) {
  if (typeof(ctcTop) !== 'object' || ctcTop._initialize === undefined) {
    return Promise.reject(new Error(`The backend for Bob_viewProgress expects to receive a contract as its first argument.`));}
  if (typeof(interact) !== 'object') {
    return Promise.reject(new Error(`The backend for Bob_viewProgress expects to receive an interact object as its second argument.`));}
  const ctc = ctcTop._initialize();
  const stdlib = ctc.stdlib;
  const step = await ctc.getCurrentStep()
  if (step == 3) {return _Bob_viewProgress3(ctcTop, interact);}
  throw stdlib.apiStateMismatchError({ _stateSourceMap }, [stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, '3')], stdlib.checkedBigNumberify('<builtin>', stdlib.UInt_max, step))
  };
const _ALGO = {
  ABI: {
    impure: [`Bob_donate(uint64)byte`, `Bob_viewProgress()(uint64,uint64)`],
    pure: [],
    sigs: [`Bob_donate(uint64)byte`, `Bob_viewProgress()(uint64,uint64)`]
    },
  appApproval: `BiAGAAECCMraurkNAyYDAAEAAQEiNQAxGEEB0ShkSSJbNQElWzUCNhoAF0lBADIiNQQjNQZJIQQMQAARIQQSRCg1/yo0/1Alr1BCACqB0L/Kjg0SRDYaATX/KTT/UEIAFjYaAhc1BDYaAzYaARdJJAxAAK0kEkQhBTQBEkQ0BEkiEkw0AhIRRClkSTUDSUpXACA1/4EgWzX+gShbNf2BMFs1/Ek1BTX7gAQeBuawNPtQsDT7IlVAADk0+1cBCDX6NPoXNfkxADT/E0Q0+YgBOoAJAAAAAAAAAakBsCo1BzT/NP40/TT5CDIGNPw0+QhCAGUxADT/E0SACAAAAAAAAAHlNP4WNP0WUFCwNP4WNP0WUDUHNP80/jT9MgY0/EIANiISRIGgjQaIAN8iNAESRDQESSISTDQCEhFESTUFFzX/gASCxGH+NP8WULAxADT/IjIGIkIAADX/Nf41/TX8Nfs0/TT8DEEAITT7NPwWUDT9FlA0/xZQKUsBVwA4Z0ghBTUBMgY1AkIAL7EisgE0/7III7IQNPuyB7NCAAAxGYEFEkSxIrIBIrIII7IQMgmyCTIKsgezQgAFMRkiEkQoNAEWNAIWUGc0BkEACoAEFR98dTQHULA0AEkjCDIEEkQxFhJEI0MxGSISREL/3yIxNBJEJDE1EkQiMTYSRCIxNxJEIjUBIjUCQv+vNABJSiMINQA4BzIKEkQ4ECMSRDgIEkSJ`,
  appClear: `Bg==`,
  companionInfo: null,
  extraPages: 0,
  mapDataKeys: 0,
  mapDataSize: 0,
  stateKeys: 1,
  stateSize: 56,
  unsupported: [],
  version: 10,
  warnings: []
  };
const _ETH = {
  ABI: `[
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "v351",
                "type": "uint256"
              }
            ],
            "internalType": "struct T3",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T4",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "stateMutability": "payable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "msg",
        "type": "uint256"
      }
    ],
    "name": "ReachError",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "internalType": "uint256",
                "name": "v351",
                "type": "uint256"
              }
            ],
            "internalType": "struct T3",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T4",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e0",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "address",
        "name": "_who",
        "type": "address"
      },
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "enum _enum_T8",
                    "name": "which",
                    "type": "uint8"
                  },
                  {
                    "components": [
                      {
                        "internalType": "uint256",
                        "name": "elem0",
                        "type": "uint256"
                      }
                    ],
                    "internalType": "struct T6",
                    "name": "_Bob_donate0_38",
                    "type": "tuple"
                  },
                  {
                    "internalType": "bool",
                    "name": "_Bob_viewProgress0_38",
                    "type": "bool"
                  }
                ],
                "internalType": "struct T8",
                "name": "v399",
                "type": "tuple"
              }
            ],
            "internalType": "struct T10",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "indexed": false,
        "internalType": "struct T11",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_e2",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bool",
        "name": "v0",
        "type": "bool"
      }
    ],
    "name": "_reach_oe_v425",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "_expected",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_progress",
            "type": "uint256"
          }
        ],
        "indexed": false,
        "internalType": "struct T9",
        "name": "v0",
        "type": "tuple"
      }
    ],
    "name": "_reach_oe_v485",
    "type": "event"
  },
  {
    "stateMutability": "payable",
    "type": "fallback"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_a0",
        "type": "uint256"
      }
    ],
    "name": "Bob_donate",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "Bob_viewProgress",
    "outputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "_expected",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "_progress",
            "type": "uint256"
          }
        ],
        "internalType": "struct T9",
        "name": "",
        "type": "tuple"
      }
    ],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCreationTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCurrentState",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "",
        "type": "bytes"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "_reachCurrentTime",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "components": [
          {
            "internalType": "uint256",
            "name": "time",
            "type": "uint256"
          },
          {
            "components": [
              {
                "components": [
                  {
                    "internalType": "enum _enum_T8",
                    "name": "which",
                    "type": "uint8"
                  },
                  {
                    "components": [
                      {
                        "internalType": "uint256",
                        "name": "elem0",
                        "type": "uint256"
                      }
                    ],
                    "internalType": "struct T6",
                    "name": "_Bob_donate0_38",
                    "type": "tuple"
                  },
                  {
                    "internalType": "bool",
                    "name": "_Bob_viewProgress0_38",
                    "type": "bool"
                  }
                ],
                "internalType": "struct T8",
                "name": "v399",
                "type": "tuple"
              }
            ],
            "internalType": "struct T10",
            "name": "msg",
            "type": "tuple"
          }
        ],
        "internalType": "struct T11",
        "name": "_a",
        "type": "tuple"
      }
    ],
    "name": "_reach_m2",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "stateMutability": "payable",
    "type": "receive"
  }
]`,
  Bytecode: `0x60806040526040516200106138038062001061833981016040819052620000269162000358565b6000805543600355604080513381528251602080830191909152830151518183015290517f28822ae872174fb8917549901c639f920e5c2ef0fb881ea78a94dee578586e9d9181900360600190a16200008234156007620000c9565b6200008c6200022c565b805133905260208083015151825182015280820180516000908190528151439301929092525160400152620000c181620000f3565b505062000437565b81620000ef5760405163100960cb60e01b81526004810182905260240160405180910390fd5b5050565b805160209081015190820151511015620001cc576200013c604051806080016040528060006001600160a01b031681526020016000815260200160008152602001600081525090565b8151516001600160a01b0316808252825160209081015181840190815281850180515160408087019182529151820151606080880191825260036000554360015583519586019690965292519184019190915251928201929092529051608082015260a00160405160208183030381529060405260029080519060200190620001c792919062000278565b505050565b805151602082015160409081015190516001600160a01b039092169181156108fc0291906000818181858888f1935050505015801562000210573d6000803e3d6000fd5b5060008080556001819055620002299060029062000307565b50565b604080516080810182526000918101828152606082019290925290819081526020016200027360405180606001604052806000815260200160008152602001600081525090565b905290565b8280546200028690620003fa565b90600052602060002090601f016020900481019282620002aa5760008555620002f5565b82601f10620002c557805160ff1916838001178555620002f5565b82800160010185558215620002f5579182015b82811115620002f5578251825591602001919060010190620002d8565b506200030392915062000341565b5090565b5080546200031590620003fa565b6000825580601f1062000326575050565b601f0160209004906000526020600020908101906200022991905b5b8082111562000303576000815560010162000342565b60008183036040808212156200036d57600080fd5b80518082016001600160401b0380821183831017156200039d57634e487b7160e01b600052604160045260246000fd5b818452865183526020601f1986011215620003b757600080fd5b835194506020850191508482108183111715620003e457634e487b7160e01b600052604160045260246000fd5b5090915260209384015182529283015250919050565b600181811c908216806200040f57607f821691505b602082108114156200043157634e487b7160e01b600052602260045260246000fd5b50919050565b610c1a80620004476000396000f3fe6080604052600436106100565760003560e01c80631e93b0f11461005f5780636ebd2b991461008357806383230757146100a6578063ab53f2c6146100bb578063b18b0fb0146100de578063e2196a671461010157005b3661005d57005b005b34801561006b57600080fd5b506003545b6040519081526020015b60405180910390f35b61008b610114565b6040805182518152602092830151928101929092520161007a565b3480156100b257600080fd5b50600154610070565b3480156100c757600080fd5b506100d0610156565b60405161007a9291906108b2565b6100f16100ec36600461090f565b6101f3565b604051901515815260200161007a565b61005d61010f366004610928565b61022a565b60408051808201909152600080825260208201526101306106c9565b602081015151600190526101426106e8565b61014c828261024e565b6020015192915050565b60006060600054600280805461016b90610956565b80601f016020809104026020016040519081016040528092919081815260200182805461019790610956565b80156101e45780601f106101b9576101008083540402835291602001916101e4565b820191906000526020600020905b8154815290600101906020018083116101c757829003601f168201915b50505050509050915091509091565b60006101fd6106c9565b602081810180515160009052515101518390526102186106e8565b610222828261024e565b519392505050565b6102326106e8565b61024a61024436849003840184610a24565b8261024e565b5050565b61025e600360005414600c610572565b815161027990158061027257508251600154145b600d610572565b60008080556002805461028b90610956565b80601f01602080910402602001604051908101604052809291908181526020018280546102b790610956565b80156103045780601f106102d957610100808354040283529160200191610304565b820191906000526020600020905b8154815290600101906020018083116102e757829003601f168201915b505050505080602001905181019061031c9190610ace565b9050610326610719565b7f458d15ab73b8dc0c4c1f9d2ce4f1acf0a55f31ebf1e3f374653041f2849b98123385604051610357929190610b57565b60405180910390a1600060208501515151600181111561037957610379610940565b141561046a57602084810151510151815281516103b0906001600160a01b031633146103a65760016103a9565b60005b6008610572565b8051516103c09034146009610572565b604051600181527fc7f6a2000e8654b76acb0b8880b19f04018d1254377ec6028a35dbb89bf3f1cf9060200160405180910390a160018352610400610750565b825181516001600160a01b039091169052602080840151825190910152815151604084015161042f9190610bbe565b602080830180519290925290514391015281515160608401516104529190610bbe565b60208201516040015261046481610597565b5061056c565b600160208501515151600181111561048457610484610940565b141561056c5781516104b0906001600160a01b031633146104a65760016104a9565b60005b600a610572565b6104bc3415600b610572565b6020828101518282018051919091526040808501518251840152905181518151815290830151928101929092527fe4aae6a26f90322151de0067c8a503bf9a22987378520377b86de1255c98daea910160405180910390a160208082015190840152610526610750565b825181516001600160a01b039091169052602080840151825182015260408085015182840180519190915280514393019290925260608501519151015261046481610597565b50505050565b8161024a5760405163100960cb60e01b81526004810182905260240160405180910390fd5b80516020908101519082015151101561066c576105de604051806080016040528060006001600160a01b031681526020016000815260200160008152602001600081525090565b8151516001600160a01b0316808252825160209081015181840190815281850180515160408087019182529151820151606080880191825260036000554360015583519586019690965292519184019190915251928201929092529051608082015260a00160405160208183030381529060405260029080519060200190610667929190610796565b505050565b805151602082015160409081015190516001600160a01b039092169181156108fc0291906000818181858888f193505050501580156106af573d6000803e3d6000fd5b50600080805560018190556106c69060029061081a565b50565b6040518060400160405280600081526020016106e3610854565b905290565b60405180604001604052806000151581526020016106e3604051806040016040528060008152602001600081525090565b60408051606081018252600091810191825290819081526020016106e3604051806040016040528060008152602001600081525090565b604080516080810182526000918101828152606082019290925290819081526020016106e360405180606001604052806000815260200160008152602001600081525090565b8280546107a290610956565b90600052602060002090601f0160209004810192826107c4576000855561080a565b82601f106107dd57805160ff191683800117855561080a565b8280016001018555821561080a579182015b8281111561080a5782518255916020019190600101906107ef565b50610816929150610867565b5090565b50805461082690610956565b6000825580601f10610836575050565b601f0160209004906000526020600020908101906106c69190610867565b60405180602001604052806106e361087c565b5b808211156108165760008155600101610868565b604080516060810190915280600081526020016108a56040518060200160405280600081525090565b8152600060209091015290565b82815260006020604081840152835180604085015260005b818110156108e6578581018301518582016060015282016108ca565b818111156108f8576000606083870101525b50601f01601f191692909201606001949350505050565b60006020828403121561092157600080fd5b5035919050565b60006080828403121561093a57600080fd5b50919050565b634e487b7160e01b600052602160045260246000fd5b600181811c9082168061096a57607f821691505b6020821081141561093a57634e487b7160e01b600052602260045260246000fd5b6040805190810167ffffffffffffffff811182821017156109bc57634e487b7160e01b600052604160045260246000fd5b60405290565b6040516020810167ffffffffffffffff811182821017156109bc57634e487b7160e01b600052604160045260246000fd5b6040516060810167ffffffffffffffff811182821017156109bc57634e487b7160e01b600052604160045260246000fd5b60008183036080811215610a3757600080fd5b610a3f61098b565b833581526060601f1983011215610a5557600080fd5b610a5d6109c2565b610a656109f3565b602086013560028110610a7757600080fd5b81526020603f1985011215610a8b57600080fd5b610a936109c2565b604087013581526020820152606086013593508315158414610ab457600080fd5b604081019390935291825260208101919091529392505050565b600060808284031215610ae057600080fd5b6040516080810181811067ffffffffffffffff82111715610b1157634e487b7160e01b600052604160045260246000fd5b60405282516001600160a01b0381168114610b2b57600080fd5b808252506020830151602082015260408301516040820152606083015160608201528091505092915050565b6001600160a01b0383168152815160208083019190915282015151805160a08301919060028110610b9857634e487b7160e01b600052602160045260246000fd5b806040850152506020810151516060840152604081015115156080840152509392505050565b60008219821115610bdf57634e487b7160e01b600052601160045260246000fd5b50019056fea264697066735822122014e0860e655fef0a8747f7d07b2249e580e9c9529b47cda4aef84a794a4b65e164736f6c634300080c0033`,
  BytecodeLen: 4193,
  Which: `oD`,
  version: 7,
  views: {
    }
  };
export const _stateSourceMap = {
  2: {
    at: './index.rsh:46:15:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    },
  3: {
    at: './index.rsh:22:19:after expr stmt semicolon',
    fs: [],
    msg: null,
    who: 'Module'
    }
  };
export const _Connectors = {
  ALGO: _ALGO,
  ETH: _ETH
  };
export const _Participants = {
  "Alice": Alice,
  "Bob_donate": Bob_donate,
  "Bob_viewProgress": Bob_viewProgress
  };
export const _APIs = {
  Bob: {
    donate: Bob_donate,
    viewProgress: Bob_viewProgress
    }
  };
