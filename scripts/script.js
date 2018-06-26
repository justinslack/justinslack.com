var dropdownButtons = (function() {
  // dom elements
  var dropdownWrappers = document.getElementsByClassName('js-button-dropdown-container');
  var activeDropdowns = [];

  // Add click listeners to all the dropdown buttons
  for (i = 0; i < dropdownWrappers.length; i++) {
    if (dropdownWrappers[i].classList.contains('active')) {
      activeDropdowns.push(dropdownWrappers[i]);
    }
    for (c = 0; c < dropdownWrappers[i].getElementsByClassName('js-button-dropdown').length; c++) {
      dropdownWrappers[i].getElementsByClassName('js-button-dropdown')[c].addEventListener('click', toggleDropdown);
    }
  }

  // Hide all other dropdowns
  function hideDropdowns(activeDropdowns) {
    for (i = 0; i < activeDropdowns.length; i++) {
      activeDropdowns[i].classList.remove('active');
    }
  }

  // Toggle the dropdown
  function toggleDropdown() {
    this.parentNode.classList.toggle('active');
    for (i = 0; i < activeDropdowns.length; i++) {
      if (activeDropdowns[i] !== this.parentNode) {
        activeDropdowns[i].classList.remove('active');
      }
    }
  }

  return {
    // Returning hideDropdowns in case another module needs to access this
    activeDropdowns: activeDropdowns,
    hideDropdowns: hideDropdowns
  }

  // dropdownButtons.hideDropdowns(dropdownButtons.activeDropdowns)
})();
