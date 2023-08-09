import { ethers } from "hardhat";
// const { ethers } = require('hardhat');

async function main() {
  // Connect to the deployed contract
  const contractAddress = '0xD8A7e9D584dC4f43dc0532ABE5946664468ae37F'; // Replace with the actual contract address
  const provider = new ethers.providers.JsonRpcProvider(); // Use your Ethereum provider
  const contractABI = ['function getCompanyRating(address) view returns (uint8, uint8, uint8)']; // Replace with the correct ABI
  const esgContract = new ethers.Contract(contractAddress, contractABI, provider);

  // Interact with the contract
  const companyAddress = '0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266'; // Replace with your company's Ethereum address

  // Get company's ratings
  const [environmentalRating, socialRating, governanceRating] = await esgContract.getCompanyRating(companyAddress);

  console.log('Company Ratings:', {
    Environmental: environmentalRating,
    Social: socialRating,
    Governance: governanceRating,
  });
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
