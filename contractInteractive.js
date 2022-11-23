const ethers = require("ethers")
require("dotenv").config()

const main = async () => {
    const provider = new ethers.providers.JsonRpcProvider(process.env.BSC_URL)
    const privateKey = process.env.KEY
    const wallet = new ethers.Wallet(privateKey, provider)

    const abi = [
        "function balanceOf(address) public view returns(uint)",
        "function transfer(address, uint) public returns (bool)",
    ];

    const addressTToken = "0xDbAa6fb2FaaF929fAC4eFe8B9E5752a7A289780E"
    const ContractTToken = new ethers.Contract(addressTToken, abi, wallet)

    const myAddress = await wallet.getAddress();
    const balanceTToken = await ContractTToken.balanceOf(myAddress)
    console.log("address balance:", ethers.utils.formatEther(balanceTToken))

    const targetAddress = "0x404E4949Db2f9df22a153fb91a9df0b777fFbD0A"
    const tx = await ContractTToken.transfer(targetAddress, ethers.utils.parseEther("1"))
    await tx.wait()

    console.log(tx)

    const balance1 = await ContractTToken.balanceOf(myAddress)
    const balance2 = await ContractTToken.balanceOf(targetAddress)
    console.log(`1:${balance1}, 2:${balance2}`)
}

main()