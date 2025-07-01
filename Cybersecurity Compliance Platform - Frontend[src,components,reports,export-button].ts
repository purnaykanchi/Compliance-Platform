'use client';
import { Button } from '@/components/ui/button';
import { Download, Copy } from 'lucide-react';
import { useRef } from 'react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { useCopyToClipboard } from 'react-use';
interface ExportButtonProps {
  elementId: string;
  fileName?: string;
}
export function ExportButton({ elementId, fileName = 'report' }: ExportButtonProps) {
  const [state, copyToClipboard] = useCopyToClipboard();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const exportToPng = async () => {
    if (!buttonRef.current) return;
    buttonRef.current.disabled = true;
    try {
      const element = document.getElementById(elementId);
      if (!element) throw new Error('Element not found');
      const dataUrl = await toPng(element);
      const link = document.createElement('a');
      link.download = `${fileName}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error exporting to PNG:', error);
    } finally {
      if (buttonRef.current) buttonRef.current.disabled = false;
    }
  };
  const exportToPdf = async () => {
    if (!buttonRef.current) return;
    buttonRef.current.disabled = true;
    try {
      const element = document.getElementById(elementId);
      if (!element) throw new Error('Element not found');
      const dataUrl = await toPng(element);
      const pdf = new jsPDF('landscape');
      const imgProps = pdf.getImageProperties(dataUrl);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${fileName}.pdf`);
    } catch (error) {
      console.error('Error exporting to PDF:', error);
    } finally {
      if (buttonRef.current) buttonRef.current.disabled = false;
    }
  };
  const copyToClipboardHandler = async () => {
    try {
      const element = document.getElementById(elementId);
      if (!element) throw new Error('Element not found');
      const dataUrl = await toPng(element);
      copyToClipboard(dataUrl);
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };
  return (
    <div className="flex gap-2">
      <Button
        ref={buttonRef}
        variant="outline"
        size="sm"
        onClick={exportToPng}
        className="gap-1"
      >
        <Download className="h-4 w-4" />
        PNG
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={exportToPdf}
        className="gap-1"
      >
        <Download className="h-4 w-4" />
        PDF
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={copyToClipboardHandler}
        className="gap-1"
      >
        <Copy className="h-4 w-4" />
        {state.error ? 'Error' : state.value ? 'Copied!' : 'Copy'}
      </Button>
    </div>
  );
}