// Change some colors from dark mode
// Select the target element
const targetElement = document.getElementById('elements-content');

// Create a MutationObserver instance
const observer = new MutationObserver(function (mutationsList) {
  mutationsList.forEach(function () {
    // Process all <span> elements
    document.querySelectorAll('span').forEach(function (span) {
      const color = window.getComputedStyle(span).color;
      if (color === "rgb(24, 54, 145)" || color === "rgb(111, 66, 193)") {
        span.style.color = "rgba(155, 101, 255,1)";
      }
      if (color === "rgb(3, 47, 98)") {
        span.style.color = "rgba(0, 173, 196, 1)";
      }
      if (color === "rgb(51, 51, 51)") {
        span.style.color = "rgb(91, 91, 91)";
      }
      if (color === "rgb(0, 92, 197)") {
        span.style.color = "rgb(0, 119, 255)";
      }
    });
  });
});

// Configure the observer
const config = {
  childList: true,       // Observe direct child modifications
  subtree: true,         // Observe changes in all descendants
  characterData: true    // Observe text changes
};

// Start observing the target element
observer.observe(targetElement, config);


///////////////////////////////////////
//////// Search implementation ////////
///////////////////////////////////////

let apiDoc = null;
const yamlFile = "api.yaml";

loadYamlFile();

// Load YAML file
async function loadYamlFile() {
  try {
    const response = await fetch(yamlFile);
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const yamlText = await response.text();
    apiDoc = jsyaml.load(yamlText); // Store the parsed YAML in the global variable
    console.log('YAML file loaded successfully:', apiDoc);
  } catch (error) {
    console.error('Error loading YAML file:', error);
  }
}


// Function to show the search popup
function showSearchPopup() {
  const searchPopup = document.getElementById('searchPopup');
  searchPopup.style.display = 'flex';  
  document.getElementById('popupSearchTerm').focus(); // Focus on the input inside the popup
}


// Function to close the search popup
function closeSearchPopup() {
  const searchPopup = document.getElementById('searchPopup');
  searchPopup.style.display = 'none';
}


// When clicking outside the search popup, call the function to close popup
document.getElementById('searchPopup').addEventListener('click', function (event) {
  if (event.target === this) {
    closeSearchPopup();
  }
});


// Clear the search term and the results when clicking on X button
// If clicked when there is no text, close the search bar
document.getElementById('closeButton').addEventListener("click", function () {
  if (document.getElementById("popupSearchTerm").value == "") {
    closeSearchPopup();
    return;
  }
  document.getElementById("popupSearchTerm").value = "";
  document.getElementById("popupResults").innerHTML = "";
  document.getElementById('popupSearchTerm').focus();
});


// Debounce function to delay search execution
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), delay);
  };
}


// Main search function
const performSearch = debounce(function () {
  const searchTerm = document.getElementById('popupSearchTerm').value.toLowerCase();
  const resultsDiv = document.getElementById('popupResults');
  resultsDiv.innerHTML = ''; // Clear previous results

  if (!apiDoc) {
    resultsDiv.innerHTML = '<p>Please load a YAML file first.</p>';
    return;
  }

  // If the search term is empty, do not show any results
  if (searchTerm.trim() === '') {
    return; // Exit the function if searchTerm is empty
  }

  const results = searchApiDoc(apiDoc, searchTerm);

  if (results.length === 0) {
    const resultDiv = document.createElement('div');
    resultDiv.classList.add("result");
    resultDiv.innerHTML = "<p>No matches found.</p>";
    resultsDiv.appendChild(resultDiv);
  } else {
    results.forEach(result => {
      const link = `/#/operations/${result.operationId}`;
      const resultDiv = document.createElement('div');
      resultDiv.classList.add('result');

      const bodyDescription = `${result.requestBodyDescription.length > 255 ? shrinkText(result.requestBodyDescription, searchTerm) : result.requestBodyDescription}`;

      const method = filterText(result.method.toUpperCase(), searchTerm);
      const path = filterText(result.path, searchTerm);
      const summary = filterText(result.summary, searchTerm);
      const description = filterText(result.description, searchTerm);
      const bodyData = bodyDescription.length > 0 ? filterText(bodyDescription, searchTerm) : "";

      resultDiv.innerHTML = `
        <a href=${link} class="link" onClick="closeSearchPopup()">
          <p class="method"><strong><span class=${result.method.toUpperCase()}>${method}</span> ${path}</strong></p>
          <p class="summary"><em>${summary}</em></p>
          <p class="description"><strong>Description:</strong> ${description}</p>
          ${bodyData.length > 0 ? "<p class='bodyDescription'><strong>Body description: </strong>" + bodyData + "</p>" : ''}
      `
      
      function filterText(text, searchTerm) {
        const regex = new RegExp(searchTerm, "gi");
        return text.replace(regex, (match) => `<span class="highlight">${match}</span>`);
      }

      resultsDiv.appendChild(resultDiv);
    });
  }
}, 300); // 300ms delay


// Shrink the text to make it smaller (some body descriptions are too long)
function shrinkText(result, searchTerm) {
  const regex = new RegExp(`(?:\\S+\\s){0,10}\\b${searchTerm}\\b(?:\\s\\S+){0,10}`, 'gi');
  const matches = [...result.matchAll(regex)];

  return matches
    .map((match, index) => {
      const snippet = match[0].trim();
      const separator = index < matches.length - 1 ? ' [...] ' : '';
      return snippet + separator;
    })
    .join('');
}


// Search the term and discard ignored tag
function searchApiDoc(apiDoc, searchTerm) {
  const results = [];
  const ignoredTag = "wonky - not working";

  for (const [path, operations] of Object.entries(apiDoc.paths)) {
    for (const [method, details] of Object.entries(operations)) {
      const { summary, description, requestBody, operationId, tags } = details;

      // Removing operations with ignored tag.
      if (!tags[0].includes(ignoredTag)) {
        let requestBodyDescription = '';

        if (requestBody) {
          // Include requestBody.description in the search
          if (requestBody.description) {
            requestBodyDescription = requestBody.description;
          }
        }

        // Check if the search term matches any field
        if (
          (summary && summary.toLowerCase().includes(searchTerm)) ||
          (description && description.toLowerCase().includes(searchTerm)) ||
          (requestBodyDescription && requestBodyDescription.toLowerCase().includes(searchTerm)) ||
          (path.includes(searchTerm)) &&
          (!tags[0].includes(ignoredTag))
        ) {
          results.push({
            path,
            method,
            summary: summary || '',
            description: description || '',
            requestBodyDescription: requestBodyDescription || '',
            operationId: operationId
          });
        }
      }
    }
  }

  return results;
}

