export function setupContentProtection() {
  if (typeof window !== "undefined") {
    // Disable right-click
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault()
      return false
    })

    // Disable keyboard shortcuts
    document.addEventListener("keydown", (e) => {
      // Disable Ctrl+C, Ctrl+P, Ctrl+S, Ctrl+U, Ctrl+A
      if (
        (e.ctrlKey && (e.key === "c" || e.key === "p" || e.key === "s" || e.key === "u" || e.key === "a")) ||
        // Disable F12
        e.key === "F12" ||
        // Disable PrintScreen
        e.key === "PrintScreen"
      ) {
        e.preventDefault()
        return false
      }
    })

    // Disable text selection
    document.body.style.userSelect = "none"
    document.body.style.webkitUserSelect = "none"
    document.body.style.msUserSelect = "none"
    document.body.style.mozUserSelect = "none"

    // Disable drag and drop for images and videos
    const mediaElements = document.querySelectorAll("img, video")
    mediaElements.forEach((element) => {
      element.setAttribute("draggable", "false")
      element.addEventListener("dragstart", (e) => {
        e.preventDefault()
        return false
      })
    })

    // Disable save image as
    document.addEventListener("mousedown", (e) => {
      if (e.detail > 1) {
        e.preventDefault()
        return false
      }
    })

    // Add CSS to prevent printing
    const style = document.createElement("style")
    style.innerHTML = `
      @media print {
        body {
          display: none !important;
        }
      }
    `
    document.head.appendChild(style)
  }
}

