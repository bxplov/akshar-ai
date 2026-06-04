import html2pdf from 'html2pdf.js';

export const exportNoteToPdf = (noteContent, videoTitle) => {
  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `${videoTitle}_${timestamp}.pdf`;

  const sourceElement = document.getElementById('rendered-markdown-content');
  if (!sourceElement) {
    return { success: false, message: 'Failed to find content to export' };
  }

  const wrapper = document.createElement('div');
  wrapper.style.padding = '30px';
  wrapper.style.background = '#ffffff';
  wrapper.style.color = '#333';
  wrapper.style.fontFamily = 'Arial, sans-serif';

  const title = document.createElement('h1');
  title.innerText = videoTitle;
  title.style.marginBottom = '20px';
  title.style.fontSize = '24px';
  
  const element = sourceElement.cloneNode(true);
  
  wrapper.appendChild(title);
  wrapper.appendChild(element);

  const opt = {
    margin: 10,
    filename,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' },
  };

  html2pdf().set(opt).from(wrapper).save();

  return { success: true, message: `PDF exported as ${filename}` };
};

export const exportNoteAsImage = async (noteContent, videoTitle) => {
  const { default: html2canvas } = await import('html2canvas');

  const timestamp = new Date().toISOString().split('T')[0];
  const filename = `${videoTitle}_${timestamp}.png`;

  const sourceElement = document.getElementById('rendered-markdown-content');
  if (!sourceElement) {
    return { success: false, message: 'Failed to find content to export' };
  }

  const wrapper = document.createElement('div');
  // Position it off-screen but visible to the browser renderer
  wrapper.style.position = 'absolute';
  wrapper.style.left = '-9999px';
  wrapper.style.top = '0';
  wrapper.style.width = '800px';
  wrapper.style.padding = '40px';
  wrapper.style.background = '#ffffff';
  wrapper.style.color = '#333';
  wrapper.style.fontFamily = 'Arial, sans-serif';

  const title = document.createElement('h1');
  title.innerText = videoTitle;
  title.style.marginBottom = '20px';
  title.style.fontSize = '28px';

  const element = sourceElement.cloneNode(true);
  
  wrapper.appendChild(title);
  wrapper.appendChild(element);
  document.body.appendChild(wrapper);

  try {
    const canvas = await html2canvas(wrapper, {
      backgroundColor: '#ffffff',
      scale: 2,
      useCORS: true,
    });

    document.body.removeChild(wrapper);

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = filename;
    link.click();

    return { success: true, message: `Image exported as ${filename}` };
  } catch (error) {
    console.error('Image export error:', error);
    if (document.body.contains(wrapper)) {
      document.body.removeChild(wrapper);
    }
    return { success: false, message: 'Failed to export image' };
  }
};
