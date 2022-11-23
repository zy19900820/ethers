const ethers = require("ethers");
require("dotenv").config();

const main = async () => {
    const mnemonic = ethers.utils.entropyToMnemonic(ethers.utils.randomBytes(32))
    console.log(mnemonic)

    //HD wallet
    const hdNode = ethers.utils.HDNode.fromMnemonic(mnemonic)
    console.log(hdNode)

    const numWallet = 20
    let basePath = "m/44'/60'/0'/0"
    let wallets = []
    for (let i = 0; i < numWallet; i++) {
        let hdNodeNew = hdNode.derivePath(basePath + "/" + i)
        let walletNew = new ethers.Wallet(hdNodeNew.privateKey)
        console.log(`${i+1} address:${walletNew.address}`)
        wallets.push(walletNew)
    }

    //save json
    // const wallet = ethers.Wallet.fromMnemonic(mnemonic)
    // const pwd = "password"
    // const json = await wallet.encrypt(pwd)
    // console.log(json)
}

main()