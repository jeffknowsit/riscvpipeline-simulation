import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export async function exportToPDF(exportConfig, totalSlides, setCurrentSlide, setPdfMode) {
    const pdf = new jsPDF({
        orientation: 'landscape',
        unit: 'px',
        format: [960, 540], // 16:9 aspect
    });

    setPdfMode(true);

    // Wait for PDF mode styles to apply
    await new Promise((r) => setTimeout(r, 300));

    for (let i = 0; i < totalSlides; i++) {
        setCurrentSlide(i);
        await new Promise((r) => setTimeout(r, 500)); // let render settle

        const slideEl = document.querySelector('.slide');
        if (!slideEl) continue;

        const canvas = await html2canvas(slideEl, {
            scale: 2,
            useCORS: true,
            backgroundColor: '#FFFFFF',
            logging: false,
        });

        const imgData = canvas.toDataURL('image/png');
        const pageW = 960;
        const pageH = 540;

        if (i > 0) pdf.addPage([pageW, pageH], 'landscape');

        pdf.addImage(imgData, 'PNG', 0, 0, pageW, pageH);
    }

    setPdfMode(false);
    pdf.save(exportConfig.fileName || 'presentation.pdf');
}
