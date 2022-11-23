const ethers = require("ethers");
require("dotenv").config();

const main = async () => {
    const ALCHEMY_MAINNET_URL = 'https://eth-mainnet.g.alchemy.com/v2/oKmOQKbneVkxgHZfibs-iFhIlIAl6HDN';
    const provider = new ethers.providers.JsonRpcProvider(ALCHEMY_MAINNET_URL);

    // 合约abi
    const abiERC721 = [
        "function name() view returns (string)",
        "function symbol() view returns (string)",
        "function supportsInterface(bytes4) public view returns(bool)",
    ];
    // ERC721的合约地址，这里用的BAYC
    const addressBAYC = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
    const contractERC721 = new ethers.Contract(addressBAYC, abiERC721, provider)

    const nameERC721 = await contractERC721.name()
    const symbolERC721 = await contractERC721.symbol()

    console.log("name:", nameERC721)
    console.log("symbolERC721:", symbolERC721)

    // 2. 利用ERC165的supportsInterface，确定合约是否为ERC721标准
    // ERC721接口的ERC165 identifier
    const selectorERC721 = "0x80ac58cd"
    const isERC721 = await contractERC721.supportsInterface(selectorERC721)
    console.log(isERC721)
}

main()