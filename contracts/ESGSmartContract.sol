// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ESGSmartContract {
    address public owner; // Contract owner
    uint256 public totalCompanies; // Total registered companies
    
    enum Rating { NotRated, Low, Medium, High }
    
    struct Company {
        string name;
        string industry;
        Rating environmentalRating;
        Rating socialRating;
        Rating governanceRating;
    }
    
    mapping(address => Company) public companies; // Stores company details
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can perform this action");
        _;
    }
    
    constructor() {
        owner = msg.sender;
    }
    
    function registerCompany(
        string memory _name,
        string memory _industry,
        Rating _environmentalRating,
        Rating _socialRating,
        Rating _governanceRating
    ) external {
        require(companies[msg.sender].environmentalRating == Rating.NotRated, "Company already registered");
        
        companies[msg.sender] = Company({
            name: _name,
            industry: _industry,
            environmentalRating: _environmentalRating,
            socialRating: _socialRating,
            governanceRating: _governanceRating
        });
        
        totalCompanies++;
    }
    
    function updateRatings(
        Rating _environmentalRating,
        Rating _socialRating,
        Rating _governanceRating
    ) external {
        require(companies[msg.sender].environmentalRating != Rating.NotRated, "Company not registered");
        
        companies[msg.sender].environmentalRating = _environmentalRating;
        companies[msg.sender].socialRating = _socialRating;
        companies[msg.sender].governanceRating = _governanceRating;
    }
    
    function getCompanyRating(address _companyAddress) external view returns (
        Rating environmentalRating,
        Rating socialRating,
        Rating governanceRating
    ) {
        Company memory company = companies[_companyAddress];
        return (company.environmentalRating, company.socialRating, company.governanceRating);
    }
}
