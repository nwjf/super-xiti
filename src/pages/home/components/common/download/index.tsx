/**
 * 导出 组件
 * 导出为png， 导出为pdf
 */
import './index.less';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useGetPagerConfigState } from '../../../atoms/pagerConfig';
import { Button } from 'antd';

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

export const getImageInfo = (url: string): Promise<any> => {
  return new Promise((res, rej) => {
    const image = new Image();
    image.src = url;
    image.onload = () => {
      res(image);
    }
  });
}

export default function Download() {

  const { width, height, unit } = useGetPagerConfigState();

  const download = async () => {
    const element: HTMLElement = document.querySelector('.page-view-p') as HTMLElement;
    htmlToImage(element).then(async (url: string) => {
      const image = await getImageInfo(url);
      console.log('u', image, image.width, image.height);
      const pdf = new jsPDF({ format: 'a4', unit });
      pdf.addImage(url, 'PNG', 0, 0, width, height);
      pdf.save('download.pdf');
    })
  };


  return (
    <Button onClick={download} style={{marginTop: '20px'}}>导出(测试)</Button>
  );
}