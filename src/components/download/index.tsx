/**
 * 导出 组件
 * 导出为png， 导出为pdf
 */
import './index.less';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useGetPagerConfigState, useSetPagerConfigState } from '../../atoms/pagerConfigState';
import { Button } from 'antd';
import { useState } from 'react';

/**
 * html to image
 * @parma element {HTMLElement}
 * @return Promise
 */

export const htmlToImage = (element: HTMLElement) : Promise<string> => {
  return new Promise((res, rej) => {
    html2canvas(element)
      .then(canvas => {
        const imgUrl = canvas.toDataURL('image/png');
        res(imgUrl);
      })
      .catch(() => rej('html to image error!'));
  });
}


export default function Download() {

  const { setPagerConfit } = useSetPagerConfigState();

  const { width, height, unit } = useGetPagerConfigState();
  const [loading, setLoading] = useState<boolean>(false);

  const download = async () => {
    setPagerConfit({ scale: 1 });
    setLoading(true);
    const element: NodeListOf<HTMLElement> = document.querySelectorAll('.export-pdf-page') as NodeListOf<HTMLElement>;
    const children = Array.from(element);
    const pdf = new jsPDF({ format: 'a4', unit });
    try {
      for (let i = 0; i < children.length; i++) {
        const page = children[i] as HTMLElement;
        const img = await htmlToImage(page);
        if (i > 0) pdf.addPage();
        pdf.addImage(img, 'PNG', 0, 0, width, height);
      }
    } catch (error) {}
    setLoading(false);
    pdf.save('download.pdf');
  };


  return (
    <Button
      onClick={download}
      style={{marginTop: '20px', width: '100%'}}
      loading={loading}>
      导出PDF
    </Button>
  );
}