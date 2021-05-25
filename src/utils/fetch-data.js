export function fetchData(onLoad) {
    const waitForAll = [];

    let month;
    waitForAll.push(new Promise((resolve, reject) => {
        fetch("https://ethermine-api.herokuapp.com/stats/allStats?interval=MONTH")
            .then(res => res.json())
            .then(res => {
                month = res;
                resolve(true);
            })
            .catch(err => reject(err));
    }));

    let week;
    waitForAll.push(new Promise((resolve, reject) => {
        fetch("https://ethermine-api.herokuapp.com/stats/allStats?interval=WEEK")
            .then(res => res.json())
            .then(res => {
                week = res;
                resolve(true);
            })
            .catch(err => reject(err));
    }));

    let day;
    waitForAll.push(new Promise((resolve, reject) => {
        fetch("https://ethermine-api.herokuapp.com/stats/allStats?interval=DAY")
            .then(res => res.json())
            .then(res => {
                day = res;
                resolve(true);
            })
            .catch(err => reject(err));
    }));

    let all;
    waitForAll.push(new Promise((resolve, reject) => {
        fetch("https://ethermine-api.herokuapp.com/alltimestats")
            .then(res => res.json())
            .then(res => {
                all = res;
                resolve(true);
            })
            .catch(err => reject(err));
    }));

    let paidETH;
    waitForAll.push(new Promise((resolve, reject) => {
        fetch('https://mainnet.infura.io/v3/e0adfa296971448280b404facf6c497e', {
            method: 'POST',
            body: JSON.stringify({
                "jsonrpc": "2.0",
                "id": 0,
                "method": "eth_getBalance",
                "params": [
                    "0x9af9008cc4B5ed2A245c4F0eA042B5396bEf13e0",
                    "latest"
                ],
            })
        })
            .then(res => res.json())
            .then(res => {
                paidETH = parseInt(res.result, 16) / 1000000000000000000;
                resolve(true);
            })
            .catch(err => reject(err));
    }));

    let unpaidETH;
    waitForAll.push(new Promise((resolve, reject) => {
        fetch("https://api.ethermine.org/miner/9af9008cc4B5ed2A245c4F0eA042B5396bEf13e0/currentStats")
            .then(res => res.json())
            .then(res => {
                unpaidETH = res.data.unpaid / 1000000000000000000;
                resolve(true);
            })
            .catch(err => reject(err));
    }));

    Promise.all(waitForAll)
        .then(() => {
            const result = {
                Monthly: month,
                Weekly: week,
                Daily: day,
                All: all,
                Balance: {
                    total: paidETH + unpaidETH,
                    paid: paidETH,
                    unpaid: unpaidETH
                }
            };
            console.log(result);
            onLoad(result);
        });
}