// js/app.js

// Function to initialize Cytoscape.js
function initializeMindMap() {
  const cy = cytoscape({
    container: document.getElementById('mindmap-container'), // Container ID
    style: [
      {
        selector: 'node',
        style: {
          'background-color': '#6fa3ef',
          'label': 'data(label)',
          'text-valign': 'center',
          'color': '#fff',
          'text-outline-width': 2,
          'text-outline-color': '#6fa3ef',
          'width': '50px',
          'height': '50px',
          'font-size': '12px'
        }
      },
      {
        selector: 'edge',
        style: {
          'width': 2,
          'line-color': '#ccc',
          'target-arrow-color': '#ccc',
          'target-arrow-shape': 'triangle'
        }
      }
    ],
    elements: {
      nodes: [
        { data: { id: 'a', label: 'Thought 1', instinct: 'survival' } },
        { data: { id: 'b', label: 'Goal 1', instinct: 'growth' } },
        { data: { id: 'c', label: 'Challenge 1', instinct: 'reproduction' } }
      ],
      edges: [
        { data: { id: 'ab', source: 'a', target: 'b' } },
        { data: { id: 'bc', source: 'b', target: 'c' } }
      ]
    },
    layout: {
      name: 'grid',
      rows: 1
    }
  });

  // Handle node interactions
  handleNodeInteractions(cy);

  return cy;
}

// Function to handle node interactions
function handleNodeInteractions(cy) {
  const contextMenu = document.getElementById('context-menu');
  let selectedNode;

  // Show context menu on right-click
  cy.on('cxttap', 'node', function (event) {
    event.preventDefault();
    selectedNode = event.target;
    showContextMenu(event.originalEvent);
  });

  // Hide context menu on clicking elsewhere
  cy.on('tap', function (event) {
    if (event.target === cy) {
      hideContextMenu();
      const newNodeLabel = prompt('Enter node label:');
      if (newNodeLabel) {
        const newNodeId = `node${cy.nodes().length + 1}`;
        cy.add({
          group: 'nodes',
          data: { id: newNodeId, label: newNodeLabel },
          position: {
            x: event.position.x,
            y: event.position.y
          }
        });
      }
    }
  });

  // Edit node when "Edit" is clicked in the context menu
  document.getElementById('edit-node').addEventListener('click', function () {
    if (selectedNode) {
      const newLabel = prompt('Enter new label:', selectedNode.data('label'));
      if (newLabel) {
        selectedNode.data('label', newLabel);
      }
      hideContextMenu();
    }
  });

  // Delete node when "Delete" is clicked in the context menu
  document.getElementById('delete-node').addEventListener('click', function () {
    if (selectedNode) {
      cy.remove(selectedNode);
      hideContextMenu();
    }
  });

  // Function to show context menu
  function showContextMenu(event) {
    contextMenu.style.display = 'block';
    contextMenu.style.left = event.pageX + 'px';
    contextMenu.style.top = event.pageY + 'px';
  }

  // Function to hide context menu
  function hideContextMenu() {
    contextMenu.style.display = 'none';
  }

  // Hide context menu on click outside
  window.addEventListener('click', function (event) {
    if (!contextMenu.contains(event.target)) {
      hideContextMenu();
    }
  });
}

// Function to toggle Dark Mode
function toggleDarkMode() {
  const checkbox = document.getElementById('dark-mode-checkbox');
  checkbox.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', checkbox.checked);
  });
}

// Initialize Mind Map on DOM Content Loaded
document.addEventListener('DOMContentLoaded', function () {
  const cy = initializeMindMap();
  toggleDarkMode();
});
