// Get DOM elements
const fileInput = document.getElementById('fileInput');
const retrieveButton = document.getElementById('retrieveButton');
const shareButton = document.getElementById('shareButton');
const shareLink = document.getElementById('shareLink');

// Event listener for the file input
fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
        retrieveButton.disabled = false;
alert('Document fetched successfully!  Kindly click on upload to upload to the database.');
    } else {
        retrieveButton.disabled = true;
    }
});

// Event listener for the Retrieve button
retrieveButton.addEventListener('click', () => {
    // Simulate retrieving a document (replace with your actual retrieval logic)
    alert('Document retrieved successfully!');
    shareButton.disabled = false;
});

// Event listener for the Share button
shareButton.addEventListener('click', () => {
    // Simulate generating a shareable link (replace with your actual logic)
    const documentId = Math.random().toString(36).substring(7);
    const sharedLink = `https://example.com/e-vault/${documentId}`;
    shareLink.value = sharedLink;
    shareLink.select();
    document.execCommand('copy');
    alert(`Document shared successfully!\nShareable Link: ${sharedLink} (copied to clipboard)`);
});