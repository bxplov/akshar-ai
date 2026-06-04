export const copyToClipboard = async (text, label = 'Content') => {
  try {
    const renderedDiv = document.getElementById('rendered-markdown-content');
    
    // Use modern Clipboard API to copy both plain text and rich text HTML
    if (renderedDiv && window.ClipboardItem) {
      // Get the HTML, we can wrap it slightly to ensure styles apply if pasted in rich text editors
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          ${renderedDiv.innerHTML}
        </div>
      `;
      
      const textBlob = new Blob([text], { type: 'text/plain' });
      const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
      
      const clipboardItem = new window.ClipboardItem({
        'text/plain': textBlob,
        'text/html': htmlBlob,
      });
      
      await navigator.clipboard.write([clipboardItem]);
    } else {
      // Fallback for older browsers
      await navigator.clipboard.writeText(text);
    }
    
    return { success: true, message: `${label} copied to clipboard!` };
  } catch (error) {
    console.error('Copy error:', error);
    // Ultimate fallback if ClipboardItem fails due to permissions/browser quirks
    try {
      await navigator.clipboard.writeText(text);
      return { success: true, message: `${label} copied to clipboard!` };
    } catch (fallbackError) {
      return { success: false, message: `Failed to copy ${label}` };
    }
  }
};
