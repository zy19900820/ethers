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
    const contract = new ethers.Contract(addressTToken, abiTToken, provider)

    const address = await wallet.getAddress()
    const balance = await contract.balanceOf(address)
    console.log("balance:", ethers.utils.formatEther(balance))

    const tx = await contract.callStatic.transfer("0x50090919b6faa78fabc108c6e0d38afc92dbaa5e", 
        ethers.utils.parseEther("1"), {from:address})
    console.log("tx:", tx)

    const tx2 = await contract.callStatic.transfer("0x50090919b6faa78fabc108c6e0d38afc92dbaa5e", 
        ethers.utils.parseEther("1"), {from:"0x50090919b6faa78fabc108c6e0d38afc92dbaa5e"})
    console.log("tx2:", tx2)

}

main()