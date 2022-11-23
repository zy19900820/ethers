const ethers = require("ethers");
require("dotenv").config();

const main = async () => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.BSC_URL)
    const privateKey = process.env.KEY
    const wallet = new ethers.Wallet(privateKey, provider)

    const abiTToken = [
        "function balanceOf(address) public view returns(uint)",
        "function transfer(address, uint) public returns (bool)",
    ];
    const addressTToken = "0xDbAa6fb2FaaF929fAC4eFe8B9E5752a7A289780E"
    const ContractTToken = new ethers.Contract(addressTToken, abiTToken, wallet)

    //balance
    const param1 = ContractTToken.interface.encodeFunctionData(
        "balanceOf",
        [wallet.address]
    )
    console.log("param1:", param1)

    const tx1 = {
        to:addressTToken,
        data:param1
    }
    const balance = await provider.call(tx1)
    console.log("balance:", ethers.utils.formatEther(balance))

    //transfer
    const param2 = ContractTToken.interface.encodeFunctionData(
        "transfer",
        ["0x404E4949Db2f9df22a153fb91a9df0b777fFbD0A", ethers.utils.parseEther("1")]
    )
    console.log("param2:", param2)
    const tx2 = {
        to: addressTToken,
        data: param2
    }
    //write use wallet
    const receipt1 = await wallet.sendTransaction(tx2)
    await receipt1.wait()
    console.log("receipt1:", receipt1)

    const newBalance = await ContractTToken.balanceOf(wallet.address)
    console.log("new balance:", ethers.utils.formatEther(newBalance))
}

main()