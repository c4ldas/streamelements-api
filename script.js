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


//////////////////////////////////////////////////
//////// Search implementation ///////////////////
//////////////////////////////////////////////////

let apiDoc = null;
const yamlFile = "api.yaml";

loadYamlFile();

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
