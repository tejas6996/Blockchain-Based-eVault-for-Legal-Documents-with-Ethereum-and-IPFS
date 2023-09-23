// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

contract IPFSContract {
    address public owner;
    string[] public ipfsHashes; // Store IPFS hashes in an array
    mapping(address => bool) public allowedAddresses; // Mapping to store allowed wallet addresses

    constructor() {
        owner = msg.sender;
        // Add wallet addresses that are allowed to add hashes
        allowedAddresses[msg.sender] = true;
        allowedAddresses[0xYourAddressHere] = true; // Add more addresses as needed
    }

    // Modifier to restrict access to allowed addresses
    modifier onlyAllowed() {
        require(allowedAddresses[msg.sender], "Not an allowed address");
        _;
    }

    function addHash(string memory newHash) public onlyAllowed {
        ipfsHashes.push(newHash); // Add a new hash to the array
    }

    function getHashesCount() public view returns (uint256) {
        return ipfsHashes.length; // Return the number of stored hashes
    }

    function getHash(uint256 index) public view returns (string memory) {
        require(index < ipfsHashes.length, "Index out of bounds");
        return ipfsHashes[index]; // Retrieve a hash by its index
    }

    // Function to add or remove allowed addresses (only callable by the owner)
    function toggleAddress(address walletAddress, bool allowed) public {
        require(msg.sender == owner, "Not Owner of Contract");
        allowedAddresses[walletAddress] = allowed;
    }
}
